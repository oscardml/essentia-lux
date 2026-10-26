"use client";

import React, { useEffect, useState } from "react";
import { EVENTS_ENABLED } from "@/config/features";
import { EventItem } from "@/types/event";
import EventRegistrationModal from "./EventRegistrationModal";
import { Calendar, MapPin, Users, Sparkles, X, ArrowRight } from "lucide-react";

export default function EventLateralWidget() {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!EVENTS_ENABLED) return;

    const fetchActiveEvent = async () => {
      try {
        const res = await fetch("/api/events/active");
        if (res.ok) {
          const data = await res.json();
          if (data?.event) {
            setEvent(data.event);
          }
        }
      } catch (e) {
        console.error("Error al cargar evento:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveEvent();

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("openEventModal") === "true") {
        setIsModalOpen(true);
      }
    }
  }, []);

  // Cierre con la tecla Escape
  useEffect(() => {
    if (isCollapsed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCollapsed(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCollapsed]);

  if (!EVENTS_ENABLED || (!loading && !event)) {
    return null;
  }

  const spotsRemaining = event?.spots_remaining ?? 30;
  const capacity = event?.capacity ?? 30;

  return (
    <>
      {/* ESTADO COLAPSADO: Píldora discreta para reabrir el panel */}
      {isCollapsed && (
        <>
          {/* Versión desktop / tablet */}
          <div className="hidden sm:block fixed left-0 top-1/2 -translate-y-1/2 z-40">
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label="Abrir panel de evento"
              className="group flex items-center gap-2 pl-3 pr-4 py-3 bg-[#FCFAF6] hover:bg-white text-gray-800 rounded-r-2xl shadow-xl border-y border-r border-[#AF7E44]/40 transition-all hover:pl-4 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#AF7E44] to-[#6A806C] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-[11px] font-black uppercase text-[#AF7E44] tracking-wider">
                  Open Day Corpore x Essentia
                </p>
                <p className="text-[10px] font-extrabold text-emerald-700">
                  {spotsRemaining === 0 ? "Aforo completo" : `¡Quedan ${spotsRemaining} plazas!`}
                </p>
              </div>
            </button>
          </div>

          {/* Versión móvil */}
          <div className="sm:hidden fixed bottom-6 left-3 z-40">
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label="Abrir panel de evento"
              className="flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-[#AF7E44] to-[#6A806C] text-white rounded-full shadow-2xl border border-amber-200/50 text-xs font-bold animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>ESCULPE TU MEJOR VERSIÓN</span>
              <span className="px-1.5 py-0.5 bg-black/25 rounded-full text-[10px]">
                {spotsRemaining} plazas
              </span>
            </button>
          </div>
        </>
      )}

      {/* ESTADO VISIBLE: Panel lateral que SIEMPRE cabe en el viewport */}
      {!isCollapsed && (
        <aside
          aria-label="Información y registro de eventos"
          className="fixed z-40 inset-x-2 bottom-2 sm:inset-x-auto sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2 w-[min(380px,calc(100vw-1rem))] sm:w-[min(380px,calc(100vw-2rem))] max-h-[calc(100dvh-9.5rem)] max-h-[calc(100vh-9.5rem)] sm:max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100vh-2rem)] flex flex-col bg-[#FCFAF6] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#AF7E44]/35 transition-all duration-300"
        >
          {/* CABECERA FIJA CON BOTÓN DE CIERRE (✕) TÁCTIL 44x44px */}
          <div className="shrink-0 px-4 pt-3.5 pb-2.5 border-b border-amber-100/70 flex items-center justify-between gap-2 bg-[#FCFAF6] rounded-t-2xl sm:rounded-t-3xl z-20">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/70 text-[#AF7E44] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3 h-3" />
                Evento Exclusivo
              </span>

              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold ${
                  spotsRemaining <= 5
                    ? "bg-red-100 text-red-700 animate-pulse border border-red-200"
                    : "bg-emerald-100/80 text-emerald-800 border border-emerald-200/60"
                }`}
              >
                <Users className="w-3 h-3" />
                {spotsRemaining === 0 ? "Agotado" : `Quedan ${spotsRemaining} de ${capacity}`}
              </span>
            </div>

            {/* Botón Cerrar ✕ con tamaño mínimo táctil de 44x44px */}
            <button
              onClick={() => setIsCollapsed(true)}
              aria-label="Cerrar"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-amber-100/80 hover:bg-amber-200/80 text-[#AF7E44] flex items-center justify-center transition-colors cursor-pointer shrink-0 z-30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CUERPO CON SCROLL INDEPENDIENTE (Solo el cuerpo hace scroll) */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-5 py-3 space-y-3">
            {/* Título del evento: Centrado y en mayúsculas con colores de marca */}
            <div className="text-center space-y-0.5">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-[#AF7E44] uppercase leading-tight">
                ESCULPE TU MEJOR VERSIÓN
              </h3>
              <h4 className="text-[13px] sm:text-sm font-extrabold tracking-wide text-[#6A806C] uppercase leading-tight">
                OPEN DAY ESSENTIA X CORPORE
              </h4>
            </div>

            {/* Datos rápidos: Fecha y Ubicación */}
            <div className="space-y-1.5 text-xs sm:text-[13px] text-gray-700 bg-white/90 rounded-2xl p-2.5 sm:p-3 border border-amber-100/80 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#AF7E44] shrink-0" />
                <span className="font-bold text-gray-900">Sábado 28 Nov 2026 · 10:00 h</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#6A806C] shrink-0" />
                <span className="font-medium text-gray-800 leading-snug">
                  Corpore10 Cross Training (Maliaño)
                </span>
              </div>
            </div>

            {/* Destacados del evento */}
            <div className="py-2 px-3 bg-amber-50/70 rounded-xl border border-amber-100/80 text-xs sm:text-[12px] text-gray-700 leading-relaxed text-center">
              <p className="font-medium">
                Evento de presentación de alianza para clientes · Catering & Vinos · Procedimiento en vivo · Beneficios · muchos más.
              </p>
            </div>

            {/* Enlace secundario hacia el modal con los detalles */}
            <div className="text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-[#AF7E44] hover:text-[#966b37] underline underline-offset-2 transition-colors py-1 cursor-pointer"
              >
                Ver todos los detalles y requisitos
              </button>
            </div>

            {/* Logos cuadrados de iguales proporciones en la parte inferior */}
            <div className="pt-2 border-t border-amber-200/60">
              <div className="flex items-center justify-center gap-3">
                {/* Logo Essentia Lux */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 aspect-square max-h-16 bg-[#FDF7EB] rounded-2xl border border-[#AF7E44]/60 overflow-hidden shadow-xs shrink-0 flex items-center justify-center p-1">
                  <img
                    src="/logo-essentia-event.jpg"
                    alt="Essentia Lux Aesthetic Medicine"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Símbolo de alianza */}
                <span className="text-[#AF7E44] font-black text-sm select-none">✕</span>

                {/* Logo Corpore10 */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 aspect-square max-h-16 bg-black rounded-2xl border border-gray-800 flex items-center justify-center p-1.5 shadow-xs shrink-0 overflow-hidden">
                  <img
                    src="/logo-corpore10-event.jpg"
                    alt="Corpore10 Cross Training"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PIE FIJO CON EL BOTÓN INSCRIBIRME */}
          <div className="shrink-0 p-4 pt-2.5 bg-[#FCFAF6] border-t border-amber-100/70 rounded-b-2xl sm:rounded-b-3xl z-20">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#AF7E44] to-[#6A806C] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#AF7E44]/25 transition-all transform hover:scale-[1.01] cursor-pointer"
            >
              <span>Inscribirme al Evento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* MODAL CON FORMULARIO COMPLETO */}
      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
        onRegistrationSuccess={(remaining) => {
          if (event) {
            setEvent({
              ...event,
              spots_remaining: remaining,
              registered_count: (event.capacity ?? 30) - remaining,
            });
          }
        }}
      />
    </>
  );
}
