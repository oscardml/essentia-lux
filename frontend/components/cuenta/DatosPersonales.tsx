"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaCheck } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

export default function DatosPersonales({
  userId,
  email,
  initialName,
}: {
  userId: string;
  email: string;
  initialName: string | null;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sinCambios = name.trim() === (initialName ?? "").trim();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name.trim() || null })
      .eq("id", userId);

    setSaving(false);

    if (error) {
      setError("No se pudo guardar. Inténtalo de nuevo.");
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    router.refresh();
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        <FaUser className="text-primary text-base" />
        Datos personales
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Usamos tu nombre para personalizar los pedidos y las comunicaciones.
      </p>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-gray-700"
          >
            Nombre completo
          </label>
          <input
            id="fullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
            className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 border-2 border-gray-100 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-gray-400">
            El correo es tu identificador de acceso y no se puede cambiar aquí.
          </p>
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={saving || sinCambios}
          className="w-full sm:w-auto px-6 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <FaCheck /> Guardado
            </>
          ) : saving ? (
            "Guardando..."
          ) : (
            "Guardar cambios"
          )}
        </button>
      </form>
    </section>
  );
}
