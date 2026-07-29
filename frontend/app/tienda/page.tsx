import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export const metadata = {
  title: "Tienda",
};

export const revalidate = 60;

export default async function TiendaPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .returns<Product[]>();

  // Sin esto, un fallo de esquema o de RLS se ve igual que "no hay
  // productos" y es muy difícil de diagnosticar desde fuera.
  if (error) {
    console.error("[tienda] error al leer productos de Supabase:", error);
  }

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Tienda
        </h1>
        <p className="text-gray-600 mt-2">
          Cosmética seleccionada por nuestro equipo médico
        </p>
      </div>

      {!products || products.length === 0 ? (
        <p className="text-center text-gray-500">
          Todavía no hay productos disponibles. Vuelve pronto.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
