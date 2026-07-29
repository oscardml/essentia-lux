"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        // Sin esto, el enlace del email de confirmación usa el "Site URL"
        // configurado en Supabase (que apuntaba a localhost). Tomando el
        // origen real del navegador, el enlace siempre lleva al dominio
        // desde el que el usuario se ha registrado.
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      setError(
        error.message.includes("already registered")
          ? "Ya existe una cuenta con ese correo."
          : "No se pudo completar el registro. Inténtalo de nuevo."
      );
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">¡Ya casi está!</h1>
          <p className="text-gray-600">
            Te hemos enviado un correo para confirmar tu cuenta. Revisa tu
            bandeja de entrada (y la carpeta de spam) para activar tu acceso.
          </p>
          <Link
            href="/login"
            className="inline-block text-[#AF7E44] font-semibold hover:underline"
          >
            Ir a iniciar sesión
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#6A806C] to-[#AF7E44] px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
          <p className="text-white/80 mt-2">
            Regístrate y disfruta de ventajas exclusivas para socios
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
              Nombre completo
            </label>
            <input
              id="fullName"
              type="text"
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
              placeholder="Tu nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-[#AF7E44] font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
