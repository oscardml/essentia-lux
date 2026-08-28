"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCheck, FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import type { Product } from "@/types/product";
import { formatPrice, formatProductName, formatCategory } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { user, loaded } = useAuth();
  const [added, setAdded] = useState(false);
  const agotado = product.stock <= 0;
  const title = formatProductName(product.name);

  const handleComprar = () => {
    if (agotado) return;

    // Comprar exige cuenta: así se aplica el descuento de socio y el pedido
    // queda asociado a alguien a quien poder avisar del envío.
    if (!user) {
      router.push(`/login?redirectTo=/tienda/${product.slug}`);
      return;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price_cents: product.price_cents,
      currency: product.currency,
      image_url: product.image_url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-base card-hover group relative overflow-hidden"
    >
      <div className="p-4 sm:p-6 h-full flex flex-col relative">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-50">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={title}
                fill
                className="object-contain p-3"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                Sin imagen
              </div>
            )}
          </motion.div>

          {/* Badge de categoría */}
          {product.category && (
            <motion.div
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
            >
              <span className="text-[10px] sm:text-xs font-medium text-primary">
                {formatCategory(product.category)}
              </span>
            </motion.div>
          )}

          {/* Aviso de agotado */}
          {agotado && (
            <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-[10px] sm:text-xs font-semibold text-white">
                Agotado
              </span>
            </div>
          )}

          {/* Efecto de brillo en hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            style={{ width: "200%" }}
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col flex-1 space-y-3">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary group-hover:text-secondary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {product.description && (
            <p className="text-sm md:text-base text-textsecundario text-justify line-clamp-3">
              {product.description}
            </p>
          )}

          {/* Línea decorativa */}
          <motion.div
            className="w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full group-hover:w-20 transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          {/* Empuja el bloque de compra al fondo para que todas las tarjetas
              tengan los botones alineados aunque el texto varíe de largo. */}
          <div className="flex-1" />

          {/* Precio, stock y acciones */}
          <div className="pt-3 border-t border-gray-200 space-y-3 mt-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <motion.span
                  className="text-xl sm:text-2xl font-bold text-primary whitespace-nowrap"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  {formatPrice(product.price_cents, product.currency)}
                </motion.span>
                {!agotado && product.stock <= 5 && (
                  <span className="text-[11px] font-medium text-amber-600">
                    ¡Solo quedan {product.stock}!
                  </span>
                )}
              </div>

              <Link
                href={`/tienda/${product.slug}`}
                className="btn-primary text-sm px-4 py-2 hover:shadow-lg whitespace-nowrap"
              >
                Ver detalles
              </Link>
            </div>

            {/* Botón de compra */}
            <motion.button
              onClick={handleComprar}
              disabled={agotado}
              className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                agotado
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "text-white hover:shadow-lg"
              }`}
              style={agotado ? undefined : { backgroundColor: added ? "#4B7F52" : "#6A806C" }}
              whileHover={agotado ? undefined : { scale: 1.02 }}
              whileTap={agotado ? undefined : { scale: 0.98 }}
            >
              {agotado ? (
                "Sin stock"
              ) : added ? (
                <>
                  <FaCheck className="text-base" />
                  Añadido al carrito
                </>
              ) : loaded && !user ? (
                <>
                  <FaSignInAlt className="text-base" />
                  Inicia sesión para comprar
                </>
              ) : (
                <>
                  <FaShoppingCart className="text-base" />
                  Comprar
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Barra inferior decorativa */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}
