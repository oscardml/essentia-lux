"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function CartNavItem() {
  const { totalItems } = useCart();
  const { user, loaded } = useAuth();

  // El carrito solo tiene sentido para quien puede comprar, y comprar exige
  // cuenta (para el descuento de socio y el historial de pedidos).
  if (!loaded || !user) return null;

  return (
    <Link
      href="/carrito"
      aria-label={
        totalItems > 0
          ? `Carrito con ${totalItems} artículo${totalItems > 1 ? "s" : ""}`
          : "Carrito de la compra"
      }
      className="relative flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-50 transition-all duration-300"
    >
      <FaShoppingCart className="text-xl sm:text-2xl" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold leading-none">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
