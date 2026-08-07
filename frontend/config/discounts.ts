// Códigos de descuento de la tienda.
//
// Para añadir o cambiar un código basta con editar esta lista y desplegar.
// `requiereCuenta` limita el código a usuarios registrados (que es el caso
// del descuento de socio).
export interface DiscountCode {
  code: string;
  percent: number;
  description: string;
  requiereCuenta: boolean;
}

export const DISCOUNT_CODES: DiscountCode[] = [
  {
    code: "ESSENTIA10",
    percent: 10,
    description: "10% de descuento para socios",
    requiereCuenta: true,
  },
];

/**
 * Busca un código de descuento. Devuelve null si no existe.
 * La comparación ignora mayúsculas y espacios sobrantes para que el cliente
 * pueda escribirlo como quiera ("essentia10", " ESSENTIA10 ").
 */
export function findDiscountCode(input: string): DiscountCode | null {
  const normalized = input.trim().toUpperCase();
  return DISCOUNT_CODES.find((d) => d.code === normalized) ?? null;
}
