"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function TiendaGrid({ products }: { products: Product[] }) {
  const [categoriaActiva, setCategoriaActiva] = useState("todas");

  // Las categorías salen de los propios productos, así que si el catálogo
  // crece con categorías nuevas los filtros aparecen solos.
  const categorias = useMemo(() => {
    const vistas = new Map<string, string>();
    products.forEach((p) => {
      if (!p.category) return;
      const id = p.category.toLowerCase();
      if (!vistas.has(id)) vistas.set(id, p.category.toLowerCase());
    });
    return [
      { id: "todas", nombre: "Todas" },
      ...Array.from(vistas, ([id, nombre]) => ({ id, nombre })).sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es")
      ),
    ];
  }, [products]);

  const productosFiltrados = useMemo(
    () =>
      categoriaActiva === "todas"
        ? products
        : products.filter((p) => p.category?.toLowerCase() === categoriaActiva),
    [products, categoriaActiva]
  );

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        Todavía no hay productos disponibles. Vuelve pronto.
      </p>
    );
  }

  return (
    <>
      {/* Filtros por categoría */}
      {categorias.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaActiva(categoria.id)}
              className={`
                px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm
                transition-all duration-300 capitalize
                ${
                  categoriaActiva === categoria.id
                    ? "bg-primary text-white shadow-primary"
                    : "bg-white text-textprimario hover:bg-gray-50 border border-gray-200"
                }
              `}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>
      )}

      <motion.div
        key={categoriaActiva}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
      >
        {productosFiltrados.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textsecundario text-base sm:text-lg">
            No hay productos disponibles en esta categoría
          </p>
        </div>
      )}
    </>
  );
}
