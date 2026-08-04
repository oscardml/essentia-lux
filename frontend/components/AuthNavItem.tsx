"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "@/lib/auth-context";

export default function AuthNavItem() {
  const router = useRouter();
  const { user, loaded, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  // Mientras no sepamos si hay sesión reservamos el hueco, así la cabecera
  // no "salta" al cargar.
  if (!loaded) return <div className="w-10 h-10" aria-hidden />;

  if (user) {
    return (
      <div className="flex items-center gap-1">
        <Link
          href="/mi-cuenta"
          title="Mi cuenta"
          aria-label="Mi cuenta"
          className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-50 transition-all duration-300"
        >
          <FaUser className="text-xl sm:text-2xl" />
        </Link>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
          className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
        >
          <FaSignOutAlt className="text-xl sm:text-2xl" />
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      title="Iniciar sesión"
      aria-label="Iniciar sesión"
      className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-50 transition-all duration-300"
    >
      <FaSignInAlt className="text-xl sm:text-2xl" />
    </Link>
  );
}
