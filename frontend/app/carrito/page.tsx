"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatProductName } from "@/types/product";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, totalCents } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || "No se pudo iniciar el pago. Inténtalo de nuevo.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("No se pudo conectar con el servidor de pago.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito</h1>
        <p className="text-gray-500 mb-6">Todavía no has añadido productos.</p>
        <Link
          href="/tienda"
          className="inline-block bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-3 px-8 rounded-xl font-semibold"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tu carrito</h1>

      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-5">
            <div className="relative w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              {item.image_url && (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {formatProductName(item.name)}
              </p>
              <p className="text-secondary text-sm font-medium">
                {formatPrice(item.price_cents, item.currency)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                aria-label="Restar unidad"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                aria-label="Sumar unidad"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.productId)}
              className="text-gray-400 hover:text-red-500 text-sm font-medium ml-2"
            >
              Quitar
            </button>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(totalCents, "eur")}</span>
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-4 px-8 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? "Redirigiendo al pago..." : "Pagar con tarjeta"}
        </button>
      </section>
    </div>
  );
}
