import { createClient } from "@/lib/supabase/server";
import TiendaGrid from "@/components/TiendaGrid";
import type { Product } from "@/types/product";

export const metadata = {
  title: "Tienda",
  description:
    "Cosmética profesional seleccionada por el equipo médico de Essentia Lux. Compra online con envío a domicilio.",
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
    <div className="pt-4">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-secondary">
          Nuestra Tienda
        </h1>
        <p className="text-primary font-medium text-base sm:text-lg md:text-xl">
          ✨ Productos de alta calidad para el cuidado diario ✨
        </p>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Nuestra línea exclusiva de cosmética profesional, con envío a domicilio
        </p>
      </div>

      <TiendaGrid products={products ?? []} />

      <div className="h-12 sm:h-16" />
    </div>
  );
}
