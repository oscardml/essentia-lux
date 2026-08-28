"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaGift } from "react-icons/fa";
import { promociones } from "@/data";

const INTERVALO_MS = 6000;

export default function PanelPromociones() {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || promociones.length <= 1) return;

    const id = setInterval(
      () => setIndice((i) => (i + 1) % promociones.length),
      INTERVALO_MS
    );
    return () => clearInterval(id);
  }, [pausado]);

  if (promociones.length === 0) return null;

  const promo = promociones[indice];

  return (
    <div
      className="relative w-full max-w-3xl mx-auto"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {/* Halo dorado de fondo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />

      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/20 bg-white shadow-elegant-lg">
        {/* Franja superior de marca */}
        <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-primary to-secondary" />

        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaGift className="text-primary" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
              Promociones
            </span>
          </div>

          {/* El contenido entra y sale; la altura mínima evita que el bloque
              "salte" al cambiar entre promociones de distinta longitud. */}
          <div className="relative min-h-[190px] sm:min-h-[170px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-center w-full"
              >
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
                  {promo.etiqueta}
                </span>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-tight">
                  {promo.titulo}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto mb-5">
                  {promo.descripcion}
                </p>

                <Link
                  href={promo.link}
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
                >
                  {promo.cta}
                  <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          {promociones.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {promociones.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndice(i)}
                  aria-label={`Ver promoción: ${p.titulo}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === indice
                      ? "w-8 bg-primary"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
