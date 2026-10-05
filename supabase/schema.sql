-- ============================================================
--  Essentia Lux -- Esquema de la tienda y usuarios (Supabase)
-- ============================================================
--
--  Ejecutar en:  Supabase -> SQL Editor -> New query -> Run
--
--  Es IDEMPOTENTE: se puede ejecutar varias veces sin romper nada
--  ni borrar datos existentes. Si alguna vez se vuelven a recrear
--  las tablas a mano, basta con volver a lanzar este fichero para
--  dejar el esquema como lo espera la web.
-- ============================================================


-- ------------------------------------------------------------
-- 1. PRODUCTS
--    La web filtra por ctive y muestra description, asi que
--    ambas columnas deben existir. category es del catalogo
--    nuevo y se conserva tal cual.
-- ------------------------------------------------------------
alter table public.products
  add column if not exists active      boolean not null default true,
  add column if not exists description text;

-- El codigo trata el stock como numero (0 = agotado), no como null.
update public.products set stock = 0 where stock is null;
alter table public.products alter column stock set default 0;
alter table public.products alter column stock set not null;

-- Stripe espera el codigo de moneda en minusculas ('eur', no 'EUR').
update public.products set currency = lower(currency) where currency <> lower(currency);
alter table public.products alter column currency set default 'eur';

-- Lectura publica del catalogo (solo productos activos).
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

-- Crea automaticamente el perfil al registrarse un usuario nuevo.
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

-- Codigo de descuento usado en el pedido (null si no se aplico ninguno).
alter table public.orders
  add column if not exists discount_code text;

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
-- el servidor con la service-role key (que ignora RLS), por eso aqui
-- no hay politicas de insert/update a proposito.
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


-- ------------------------------------------------------------
-- 5. DISCOUNT_CODES (Codigos fisicos de tarjeta)
--    Cada codigo se puede usar solo una vez. is_used se pone
--    a true en el webhook de Stripe al confirmar el pago.
--    Sin politicas de SELECT publicas: solo el servidor
--    con service_role puede leerlos (ignora RLS).
-- ------------------------------------------------------------
create table if not exists public.discount_codes (
  code        text primary key,
  percent     int  not null default 10,
  is_used     boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.discount_codes enable row level security;

insert into public.discount_codes (code, percent) values
  ('LUX-A2B4', 10),
  ('LUX-C7D3', 10),
  ('LUX-E5F8', 10),
  ('LUX-G9H2', 10),
  ('LUX-J4K6', 10),
  ('LUX-L3M7', 10),
  ('LUX-N8P2', 10),
  ('LUX-Q5R9', 10),
  ('LUX-S6T1', 10),
  ('LUX-U4V7', 10),
  ('LUX-W3X8', 10),
  ('LUX-Y2Z5', 10),
  ('LUX-B6C9', 10),
  ('LUX-D4E3', 10),
  ('LUX-F7G1', 10),
  ('LUX-H5J8', 10),
  ('LUX-K2L6', 10),
  ('LUX-M9N4', 10),
  ('LUX-P3Q7', 10),
  ('LUX-R8S2', 10),
  ('LUX-T5U9', 10),
  ('LUX-V1W6', 10),
  ('LUX-X4Y3', 10),
  ('LUX-Z7A9', 10),
  ('LUX-B2D8', 10),
  ('LUX-E6G4', 10),
  ('LUX-H3K7', 10),
  ('LUX-J9L2', 10),
  ('LUX-M5N8', 10),
  ('LUX-P4Q3', 10),
  ('LUX-R6S9', 10),
  ('LUX-T2U5', 10),
  ('LUX-V8W1', 10),
  ('LUX-X7Y4', 10),
  ('LUX-Z3A6', 10),
  ('LUX-B9C2', 10),
  ('LUX-D5E7', 10),
  ('LUX-F4G8', 10),
  ('LUX-H6J3', 10),
  ('LUX-K8L5', 10),
  ('LUX-M2N9', 10),
  ('LUX-P7Q4', 10),
  ('LUX-R3S6', 10),
  ('LUX-T9U2', 10),
  ('LUX-V5W8', 10),
  ('LUX-X1Y6', 10),
  ('LUX-Z4A7', 10),
  ('LUX-B8C5', 10),
  ('LUX-D3E9', 10),
  ('LUX-F6G2', 10)
on conflict (code) do nothing;