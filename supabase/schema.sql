-- ============================================================
--  Essentia Lux — Esquema de la tienda y usuarios (Supabase)
-- ============================================================
--
--  Ejecutar en:  Supabase → SQL Editor → New query → Run
--
--  Es IDEMPOTENTE: se puede ejecutar varias veces sin romper nada
--  ni borrar datos existentes. Si alguna vez se vuelven a recrear
--  las tablas a mano, basta con volver a lanzar este fichero para
--  dejar el esquema como lo espera la web.
-- ============================================================


-- ------------------------------------------------------------
-- 1. PRODUCTS
--    La web filtra por `active` y muestra `description`, así que
--    ambas columnas deben existir. `category` es del catálogo
--    nuevo y se conserva tal cual.
-- ------------------------------------------------------------
alter table public.products
  add column if not exists active      boolean not null default true,
  add column if not exists description text;

-- El código trata el stock como número (0 = agotado), no como null.
update public.products set stock = 0 where stock is null;
alter table public.products alter column stock set default 0;
alter table public.products alter column stock set not null;

-- Stripe espera el código de moneda en minúsculas ('eur', no 'EUR').
update public.products set currency = lower(currency) where currency <> lower(currency);
alter table public.products alter column currency set default 'eur';

-- Lectura pública del catálogo (solo productos activos).
alter table public.products enable row level security;
drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products for select
  using (active = true);


-- ------------------------------------------------------------
-- 2. PROFILES  (perfil de usuario + ventaja de socio)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id                      uuid primary key references auth.users(id) on delete cascade,
  full_name               text,
  is_member               boolean not null default true,
  member_discount_percent int     not null default 10,
  created_at              timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Crea automáticamente el perfil al registrarse un usuario nuevo.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ------------------------------------------------------------
-- 3. ORDERS + ORDER_ITEMS  (pedidos)
--    Sin estas tablas el pago con Stripe falla por completo.
-- ------------------------------------------------------------
create table if not exists public.orders (
  id                         uuid primary key default gen_random_uuid(),
  user_id                    uuid references auth.users(id),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id   text,
  status                     text not null default 'pending',
  subtotal_cents             int  not null,
  discount_cents             int  not null default 0,
  total_cents                int  not null,
  currency                   text not null default 'eur',
  shipping_address           jsonb,
  customer_email             text,
  created_at                 timestamptz not null default now()
);

create table if not exists public.order_items (
  id               uuid primary key default gen_random_uuid(),
  order_id         uuid not null references public.orders(id) on delete cascade,
  product_id       uuid references public.products(id),
  product_name     text not null,
  unit_price_cents int  not null,
  quantity         int  not null
);

alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

-- Cada usuario solo ve sus propios pedidos. Las escrituras las hace
-- el servidor con la service-role key (que ignora RLS), por eso aquí
-- no hay políticas de insert/update a propósito.
drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Users can view their own order items" on public.order_items;
create policy "Users can view their own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );


-- ------------------------------------------------------------
-- 4. Descuento de stock al confirmar el pago (webhook de Stripe)
-- ------------------------------------------------------------
create or replace function public.decrement_product_stock(
  p_product_id uuid,
  p_quantity   int
)
returns void
language sql
security definer set search_path = public
as $$
  update public.products
  set stock = greatest(stock - p_quantity, 0)
  where id = p_product_id;
$$;
