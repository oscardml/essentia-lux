"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import type { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { user, loaded } = useAuth();
  const [added, setAdded] = useState(false);

  const irALogin = () =>
    router.push(`/login?redirectTo=/tienda/${product.slug}`);

  const handleClick = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price_cents: product.price_cents,
      currency: product.currency,
      image_url: product.image_url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Comprar exige cuenta: así se aplica el descuento de socio y el pedido
  // queda asociado a alguien a quien poder avisar del envío.
  if (loaded && !user) {
    return (
      <div className="flex flex-col gap-3">
        <button
          onClick={irALogin}
          className="w-full bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
        >
          <FaSignInAlt />
          Inicia sesión para comprar
        </button>
        <p className="text-center text-sm text-gray-500">
          Con tu cuenta puedes usar códigos de descuento y seguir el estado de
          tus pedidos.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
      >
        {added ? "Añadido ✓" : "Añadir al carrito"}
      </button>
      <button
        onClick={() => {
          handleClick();
          router.push("/carrito");
        }}
        className="w-full border-2 border-[#AF7E44] text-[#AF7E44] py-3 px-8 rounded-xl font-semibold hover:bg-[#AF7E44]/10 transition-all duration-200"
      >
        Comprar ahora
      </button>
    </div>
  );
}
