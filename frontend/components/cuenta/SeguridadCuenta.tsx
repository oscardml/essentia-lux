"use client";

import { useState } from "react";
import { FaLock, FaCheck } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

export default function SeguridadCuenta() {
  const [abierto, setAbierto] = useState(false);
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== repeat) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (error) {
      setError("No se pudo cambiar la contraseña. Vuelve a iniciar sesión e inténtalo de nuevo.");
      return;
    }

    setPassword("");
    setRepeat("");
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setAbierto(false);
    }, 2500);
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
        <FaLock className="text-primary text-base" />
        Seguridad
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Cambia tu contraseña de acceso cuando lo necesites.
      </p>

      {!abierto ? (
        <button
          onClick={() => setAbierto(true)}
          className="w-full sm:w-auto px-6 border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/5 transition-all duration-200"
        >
          Cambiar contraseña
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Nueva contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Repite la contraseña
            </label>
            <input
              id="repeatPassword"
              type="password"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              placeholder="Vuelve a escribirla"
              className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
            />
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold disabled:opacity-40 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <FaCheck /> Contraseña actualizada
                </>
              ) : saving ? (
                "Guardando..."
              ) : (
                "Guardar contraseña"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setAbierto(false);
                setError(null);
                setPassword("");
                setRepeat("");
              }}
              className="px-6 py-3 rounded-xl font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
