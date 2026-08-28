"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaSort } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import { formatCategory } from "@/types/product";

type OrdenId =
  | "destacados"
  | "nombre-asc"
  | "nombre-desc"
  | "precio-asc"
  | "precio-desc";

const ORDENES: { id: OrdenId; nombre: string }[] = [
  { id: "destacados", nombre: "Novedades" },
  { id: "nombre-asc", nombre: "Nombre: A - Z" },
  { id: "nombre-desc", nombre: "Nombre: Z - A" },
  { id: "precio-asc", nombre: "Precio: de menor a mayor" },
  { id: "precio-desc", nombre: "Precio: de mayor a menor" },
];

export default function TiendaGrid({ products }: { products: Product[] }) {
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [orden, setOrden] = useState<OrdenId>("destacados");

  // Las categorías salen de los propios productos, así que si el catálogo
  // crece con categorías nuevas los filtros aparecen solos.
  const categorias = useMemo(() => {
    const vistas = new Map<string, string>();
    products.forEach((p) => {
      if (!p.category) return;
      const id = p.category.toLowerCase();
      if (!vistas.has(id)) vistas.set(id, formatCategory(p.category));
    });
    return [
      { id: "todas", nombre: "Todas" },
      ...Array.from(vistas, ([id, nombre]) => ({ id, nombre })).sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es")
      ),
    ];
  }, [products]);

  const productosFiltrados = useMemo(() => {
    const filtrados =
      categoriaActiva === "todas"
        ? [...products]
        : products.filter((p) => p.category?.toLowerCase() === categoriaActiva);

    switch (orden) {
      case "nombre-asc":
        return filtrados.sort((a, b) => a.name.localeCompare(b.name, "es"));
      case "nombre-desc":
        return filtrados.sort((a, b) => b.name.localeCompare(a.name, "es"));
      case "precio-asc":
        return filtrados.sort((a, b) => a.price_cents - b.price_cents);
      case "precio-desc":
        return filtrados.sort((a, b) => b.price_cents - a.price_cents);
      default:
        // "destacados" respeta el orden con el que llegan (los más recientes
        // primero, según la consulta del servidor).
        return filtrados;
    }
  }, [products, categoriaActiva, orden]);

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
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaActiva(categoria.id)}
              className={`
                px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm
                transition-all duration-300
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

      {/* Ordenación y recuento */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <p className="text-sm text-gray-500">
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "producto" : "productos"}
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="orden"
            className="flex items-center gap-2 text-sm font-medium text-gray-600"
          >
            <FaSort className="text-primary" />
            Ordenar por
          </label>
          <select
            id="orden"
            value={orden}
            onChange={(e) => setOrden(e.target.value as OrdenId)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-textprimario outline-none transition-colors duration-200 hover:border-primary/40 focus:border-primary cursor-pointer"
          >
            {ORDENES.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div
        key={`${categoriaActiva}-${orden}`}
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
