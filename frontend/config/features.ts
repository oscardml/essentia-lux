// Interruptor global de la tienda + login de usuarios.
//
// Mientras esté en `false`:
//   - No se muestra el botón "Tienda" en el menú.
//   - No se muestra el bloque de login / "Mi cuenta" en la cabecera.
//   - El acceso directo por URL a /tienda, /carrito, /login, /registro y
//     /mi-cuenta redirige a la home (middleware.ts).
//
// Cuando la tienda esté lista para el público, cambia esto a `true` y haz
// deploy. No hay que tocar nada más: los botones y las páginas vuelven solos.
export const STORE_ENABLED = false;
