"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/lib/cart-context";

export default function CartNavItem() {
  const { totalItems } = useCart();

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
