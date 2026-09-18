# AGENTS.md — Essentia Lux

Contexto para agentes de IA que trabajen en este repositorio.
**Léelo entero antes de tocar código.** Este proyecto es una tienda online en
producción que cobra dinero real: hay decisiones aquí que parecen mejorables
pero que son deliberadas, y romperlas tiene consecuencias económicas.

---

## Qué es esto

Web del centro de medicina estética **Essentia Lux** (essluxam.com), con
tienda de cosmética profesional y cuentas de usuario.

- `frontend/` — Next.js 15 (App Router). **Es lo único que se despliega en Vercel.**
- `backend/` — API Express de reservas de cita (Google Calendar/Sheets, email,
  SMS). Se despliega aparte en Render y **no forma parte del despliegue de
  Vercel**. Normalmente no hay que tocarlo.

**Stack:** Next.js 15.5 · React 18.3 · TypeScript · Tailwind 3 ·
Supabase (base de datos, autenticación y almacenamiento) · Stripe (pagos).

---

## ⚠️ Cinco trampas que rompen producción

Estas no se deducen leyendo el código. Se descubrieron rompiendo la web.

### 1. El middleware NO puede importar `@supabase/ssr`

`frontend/middleware.ts` se ejecuta en el **Edge Runtime** de Vercel. Importar
`@supabase/ssr` arrastra `@supabase/supabase-js`, que usa APIs de Node
(`process.version`, `__dirname`). Resultado: **todas las peticiones devuelven
500** con `ReferenceError: __dirname is not defined`.

Esto es especialmente traicionero porque **la documentación oficial de Supabase
recomienda justo lo contrario**, y porque **no se reproduce en local**: `next
start` ejecuta el middleware en un sandbox de Node donde `__dirname` sí existe.
Solo falla una vez desplegado.

Por eso el middleware solo comprueba si existe la cookie de sesión, sin validar
nada. La validación real se hace en la página `/mi-cuenta` con
`supabase.auth.getUser()`, que sí corre en Node. **No lo "arregles".**

### 2. El checkout revalida en el servidor a propósito

`frontend/app/api/checkout/route.ts` vuelve a leer de la base de datos los
precios, el stock y el porcentaje del código de descuento, ignorando lo que
manda el navegador.

No es código redundante: **es lo único que impide que alguien se aplique un 90%
de descuento** editando la petición desde la consola del navegador.

Este es el fallo más peligroso que puedes introducir, porque **compila sin
errores y el despliegue sale en verde**. La red de seguridad de Vercel detecta
que algo no compila, no que la tienda se ha vuelto vulnerable.

Regla: cualquier importe que acabe en Stripe se calcula en el servidor a partir
de datos de la base de datos. Nunca a partir del cuerpo de la petición.

### 3. Los cambios de esquema van ANTES que el despliegue

Si añades una columna al código y despliegas sin haberla creado en Supabase, el
checkout devuelve 500 y **nadie puede comprar**.

Orden correcto:
1. Ejecutar el SQL en Supabase (SQL Editor).
2. Verificar que la columna existe.
3. Desplegar el código.

`supabase/schema.sql` contiene el esquema completo y es **idempotente**: se
puede ejecutar las veces que haga falta sin perder datos. Manténlo actualizado
cuando cambies el esquema.

### 4. El Root Directory de Vercel es `frontend`

No la raíz del repositorio. Si alguien lo cambia, el build "funciona" en
4 segundos y la web devuelve 404 en todas las rutas.

### 5. Nunca subas secretos

`.env.local` está en `.gitignore` y debe seguir estándolo. Las claves
`SUPABASE_SERVICE_ROLE_KEY` y `STRIPE_SECRET_KEY` dan control total sobre la
base de datos y sobre los cobros.

El historial de este repositorio ya se limpió una vez por este motivo. GitHub
bloquea el push si detecta un secreto, pero no detecta todos los formatos.

---

## Qué se cambia dónde

**La mayoría de peticiones del cliente NO requieren tocar código.**

| Qué se quiere cambiar | Dónde | ¿Despliegue? |
|---|---|---|
| Productos, precios, **stock**, fotos, categorías | Supabase (tabla `products`) | No, inmediato |
| Promociones del inicio | `frontend/data.tsx` → `promociones` | Sí |
| Códigos de descuento | `frontend/config/discounts.ts` | Sí |
| Menú de navegación | `frontend/data.tsx` → `itemsNavbar` | Sí |
| Servicios y paquetes | `frontend/app/servicios/page.tsx` | Sí |
| Mostrar/ocultar toda la tienda | `frontend/config/features.ts` → `STORE_ENABLED` | Sí |

Antes de escribir código, comprueba si lo que piden se resuelve en Supabase.

---

## Mapa de ficheros

```
frontend/
  app/
    api/checkout/route.ts        Crea el pedido y la sesión de Stripe. CRÍTICO.
    api/webhooks/stripe/route.ts Marca el pedido pagado y descuenta stock. CRÍTICO.
    api/orders/by-session/       Consulta de pedido para la página de éxito.
    tienda/                      Listado y ficha de producto.
    carrito/                     Carrito y aplicación del código de descuento.
    mi-cuenta/                   Perfil, pedidos, código de socio, contraseña.
    login/ registro/             Autenticación.
  components/
    ProductCard.tsx              Tarjeta de producto de la tienda.
    TiendaGrid.tsx               Filtros por categoría y ordenación.
    PanelPromociones.tsx         Panel animado del inicio.
    cuenta/                      Bloques de "Mi cuenta".
  lib/
    supabase/client.ts           Cliente de navegador.
    supabase/server.ts           Cliente de servidor (cookies).
    supabase/admin.ts            service_role. SOLO en Route Handlers. Ignora RLS.
    cart-context.tsx             Carrito (React Context + localStorage).
    auth-context.tsx             Sesión compartida. Una sola suscripción.
  config/
    features.ts                  Interruptor STORE_ENABLED.
    discounts.ts                 Códigos de descuento.
  middleware.ts                  Edge Runtime. Ver trampa nº 1.
  types/product.ts               Tipo Product y formateadores.
supabase/schema.sql              Esquema completo, idempotente.
```

---

## Base de datos

- **`products`** — catálogo. `active` controla la visibilidad, `stock` 0 = agotado.
  Los nombres vienen en minúsculas del proveedor; se capitalizan al mostrarlos
  con `formatProductName()`, sin tocar la base de datos.
- **`profiles`** — 1:1 con `auth.users`. Se crea sola por un trigger al
  registrarse un usuario.
- **`orders`** / **`order_items`** — pedidos. Los importes se guardan en
  **céntimos** (`price_cents`), nunca en decimales.

**RLS activo.** El catálogo es de lectura pública; cada usuario solo ve sus
pedidos. Las escrituras de pedidos las hace el servidor con la service-role key,
que ignora RLS. Por eso no hay políticas de `insert`/`update`: es intencionado.

---

## Cómo verificar un cambio

```bash
cd frontend
npx tsc --noEmit -p tsconfig.json   # tipos (el lint está desactivado en build)
npm run build                        # build de producción
npm run start                        # probar en local
```

Nota: `eslint` está desactivado durante el build (`eslint.ignoreDuringBuilds`)
porque `eslint-config-next` fija ESLint 8, incompatible con el linter que espera
Next 15. **El `tsc` es la única red de seguridad automática**, úsalo siempre.

Si tocas el flujo de compra, pruébalo de verdad: crea un usuario, añade stock a
un producto, completa un pago con la tarjeta de prueba `4242 4242 4242 4242` y
comprueba que el pedido queda en `paid` y que el stock baja. **Borra después los
datos de prueba.**

---

## Despliegue

`git push` a `main` → Vercel construye y publica en 1-2 minutos.

Si el build falla, Vercel cancela y **la versión anterior sigue online**. Si un
cambio no aparece en la web, mira primero si el despliegue salió en rojo.

Variables de entorno en Vercel (solo estas siete hacen falta):

```
NEXT_PUBLIC_SUPABASE_URL              pública
NEXT_PUBLIC_SUPABASE_ANON_KEY         pública (protegida por RLS)
NEXT_PUBLIC_SITE_URL                  pública
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY    pública
SUPABASE_SERVICE_ROLE_KEY             SECRETA
STRIPE_SECRET_KEY                     SECRETA (modo live: cobros reales)
STRIPE_WEBHOOK_SECRET                 secreta
```

Stripe está en **modo live**: los pagos son reales. Para probar sin cobrar hay
que usar claves de test, nunca las de producción.

---

## Convenciones

- Comentarios y textos de interfaz **en español**.
- Colores de marca vía Tailwind: `primary` (#AF7E44, dorado del logo) y
  `secondary` (#6A806C, verde salvia). Los botones principales van en dorado
  sólido, no en degradado.
- Importes siempre en céntimos en el código y la base de datos; se formatean
  para mostrar con `formatPrice()`.
- Los comentarios explican **por qué**, no qué hace el código. Si quitas una
  comprobación que parece redundante, lee antes el comentario que tiene encima.
