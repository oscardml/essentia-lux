export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  price_cents: number;
  currency: string;
  image_url: string | null;
  stock: number;
  active: boolean;
  created_at: string;
}

// Los nombres de producto vienen del proveedor en minúsculas ("melan recovery"),
// así que los presentamos capitalizados sin tener que tocar la base de datos.
export function formatProductName(name: string) {
  return name.replace(/(^|\s)\p{Ll}/gu, (c) => c.toUpperCase());
}

// Las categorías vienen en mayúsculas desde la base de datos ("CONTORNO OJOS").
// Para mostrarlas como etiqueta quedan mejor capitalizadas: "Contorno Ojos".
export function formatCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/(^|\s)\p{Ll}/gu, (c) => c.toUpperCase());
}

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}
