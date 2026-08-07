"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTag } from "react-icons/fa";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { findDiscountCode } from "@/config/discounts";
import { formatPrice, formatProductName } from "@/types/product";

export default function CarritoPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, totalCents } = useCart();
  const { user, loaded } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [appliedCode, setAppliedCode] = useState<{
    code: string;
    percent: number;
  } | null>(null);

  // El importe final lo vuelve a calcular el servidor; esto es solo la
  // previsualización para que el cliente vea lo que va a pagar.
  const discountCents = appliedCode
    ? Math.round((totalCents * appliedCode.percent) / 100)
    : 0;
  const finalCents = totalCents - discountCents;

  const handleApplyCode = () => {
    setCodeError(null);
    const discount = findDiscountCode(codeInput);

    if (!discount) {
      setCodeError("Ese código no es válido.");
      return;
    }
    if (discount.requiereCuenta && !user) {
      setCodeError("Necesitas iniciar sesión para usar este código.");
      return;
    }

    setAppliedCode({ code: discount.code, percent: discount.percent });
    setCodeInput("");
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login?redirectTo=/carrito");
      return;
    }

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
          discountCode: appliedCode?.code,
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
        {/* Código de descuento */}
        <div className="space-y-2">
          <label
            htmlFor="codigo"
            className="block text-sm font-semibold text-gray-700"
          >
            ¿Tienes un código de descuento?
          </label>

          {appliedCode ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-primary/30 bg-primary/5 px-4 py-3">
              <div className="flex items-center gap-2 min-w-0">
                <FaTag className="text-primary flex-shrink-0" />
                <span className="font-semibold text-primary truncate">
                  {appliedCode.code}
                </span>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  −{appliedCode.percent}%
                </span>
              </div>
              <button
                onClick={() => setAppliedCode(null)}
                className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors"
              >
                Quitar
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                id="codigo"
                type="text"
                value={codeInput}
                onChange={(e) => {
                  setCodeInput(e.target.value);
                  setCodeError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCode()}
                placeholder="Introduce tu código"
                className="flex-1 min-w-0 p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-black uppercase placeholder:normal-case focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
              />
              <button
                onClick={handleApplyCode}
                disabled={!codeInput.trim()}
                className="px-5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                Aplicar
              </button>
            </div>
          )}

          {codeError && (
            <p className="text-red-600 text-sm font-medium">{codeError}</p>
          )}
        </div>

        {/* Desglose */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatPrice(totalCents, "eur")}</span>
          </div>

          {appliedCode && (
            <div className="flex items-center justify-between text-sm font-medium text-primary">
              <span>Descuento ({appliedCode.code})</span>
              <span>−{formatPrice(discountCents, "eur")}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>{formatPrice(finalCents, "eur")}</span>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-4 px-8 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading
            ? "Redirigiendo al pago..."
            : loaded && !user
            ? "Inicia sesión para pagar"
            : "Pagar con tarjeta"}
        </button>

        {loaded && !user && (
          <p className="text-center text-sm text-gray-500">
            Necesitas una cuenta para finalizar la compra.
          </p>
        )}
      </section>
    </div>
  );
}
