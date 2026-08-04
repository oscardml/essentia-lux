import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { createClient } from "@/lib/supabase/server";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice, formatProductName } from "@/types/product";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", slug)
    .eq("active", true)
    .single<Pick<Product, "name" | "description">>();

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: formatProductName(product.name),
    description: product.description?.slice(0, 155) ?? undefined,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single<Product>();

  if (!product) {
    notFound();
  }

  const title = formatProductName(product.name);
  const agotado = product.stock <= 0;

  return (
    <div className="max-w-5xl mx-auto pt-4">
      <Link
        href="/tienda"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors duration-300 mb-6"
      >
        <FaArrowLeft className="text-xs" />
        Volver a la tienda
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Imagen */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-lg">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={title}
              fill
              priority
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
              Sin imagen
            </div>
          )}

          {agotado && (
            <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-4 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-white">Agotado</span>
            </div>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col">
          {product.category && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full self-start mb-3 lowercase first-letter:uppercase">
              {product.category.toLowerCase()}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary leading-tight">
            {title}
          </h1>

          <p className="text-2xl sm:text-3xl font-bold text-primary mt-4">
            {formatPrice(product.price_cents, product.currency)}
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-secondary to-primary rounded-full my-6" />

          {product.description && (
            // whitespace-pre-line: las descripciones traen saltos de línea
            // desde la base de datos y deben respetarse.
            <p className="text-textsecundario leading-relaxed whitespace-pre-line text-justify">
              {product.description}
            </p>
          )}

          <div className="mt-8">
            {!agotado ? (
              <>
                <AddToCartButton product={product} />
                {product.stock <= 5 && (
                  <p className="text-sm font-medium text-amber-600 mt-3 text-center">
                    ¡Date prisa! Solo quedan {product.stock} unidades
                  </p>
                )}
              </>
            ) : (
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 text-center">
                <p className="font-semibold text-gray-700">
                  Producto temporalmente agotado
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Escríbenos por WhatsApp y te avisamos en cuanto vuelva a estar
                  disponible.
                </p>
                <a
                  href={`https://wa.me/34691589789?text=${encodeURIComponent(
                    `¡Hola! Me interesa el producto "${title}". ¿Cuándo volverá a estar disponible?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: "#6A806C" }}
                >
                  Consultar por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-12 sm:h-16" />
    </div>
  );
}
