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

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}
