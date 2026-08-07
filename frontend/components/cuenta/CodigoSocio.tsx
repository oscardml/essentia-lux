"use client";

import { useState } from "react";
import { FaTag, FaCopy, FaCheck } from "react-icons/fa";

export default function CodigoSocio({
  code,
  percent,
}: {
  code: string;
  percent: number;
}) {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin permisos de portapapeles: el código se ve igual y puede copiarse a mano.
    }
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-2">
        <FaTag className="text-primary" />
        <p className="font-semibold text-primary">
          Tu código de socio: {percent}% de descuento
        </p>
      </div>

      <p className="text-sm text-gray-600 mb-3">
        Introdúcelo en el carrito antes de pagar para aplicar el descuento.
      </p>

      <button
        onClick={handleCopy}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-white border-2 border-primary/30 px-5 py-2.5 font-mono font-bold tracking-widest text-primary hover:border-primary transition-all duration-200"
      >
        {code}
        {copiado ? (
          <FaCheck className="text-green-600" />
        ) : (
          <FaCopy className="text-gray-400" />
        )}
      </button>

      {copiado && (
        <p className="text-xs text-green-600 font-medium mt-2">
          Código copiado al portapapeles
        </p>
      )}
    </div>
  );
}
