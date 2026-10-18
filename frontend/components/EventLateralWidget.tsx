"use client";

import React, { useEffect, useState } from "react";
import { EVENTS_ENABLED } from "@/config/features";
import { EventItem } from "@/types/event";
import EventRegistrationModal from "./EventRegistrationModal";
import { Calendar, MapPin, Users, Sparkles, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
  }, []);

  if (!EVENTS_ENABLED || (!loading && !event)) {
    return null;
  }

  const spotsRemaining = event?.spots_remaining ?? 30;
  const capacity = event?.capacity ?? 30;

  return (
    <>
      {/* WIDGET LATERAL IZQUIERDO FLOTANTE PARA DESKTOP / TABLET (visible desde sm/md) */}
      <aside 
        aria-label="Información y registro de eventos"
        className={`fixed left-2 sm:left-4 lg:left-6 top-[168px] lg:top-[184px] z-40 transition-transform duration-300 ${
          isCollapsed ? "-translate-x-[calc(100%-12px)] sm:-translate-x-[calc(100%-16px)]" : "translate-x-0"
        }`}
      >
        <div className="relative group">
          {/* Tarjeta lateral principal: alargada ~2cm con tipografía más visible y proporciones premium */}
          <div className="w-[290px] sm:w-[340px] bg-[#FCFAF6] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#AF7E44]/35 p-5 sm:p-6 relative transition-all duration-300 hover:shadow-amber-900/15 hover:border-[#AF7E44]/60">
            
            {/* Botón para colapsar / expandir en la pestaña derecha del widget */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expandir widget de evento" : "Plegar widget de evento"}
              className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-12 bg-[#AF7E44] hover:bg-[#966b37] text-white rounded-r-xl shadow-md flex items-center justify-center transition-colors cursor-pointer z-20"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 ml-0.5" />
              ) : (
                <ChevronLeft className="w-4 h-4 mr-0.5" />
              )}
            </button>

            {/* Encabezado y etiqueta de plazas */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-[#AF7E44] text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Evento Exclusivo
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold ${
                spotsRemaining <= 5 
                  ? "bg-red-100 text-red-700 animate-pulse border border-red-200" 
                  : "bg-emerald-100/80 text-emerald-800 border border-emerald-200/60"
              }`}>
                <Users className="w-3.5 h-3.5" />
                {spotsRemaining === 0 ? "Agotado" : `Quedan ${spotsRemaining} de ${capacity}`}
              </span>
            </div>

            {/* Título del evento: Centrado y en mayúsculas con mayor tamaño y colores de marca */}
            <div className="text-center my-3.5 space-y-1">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-[#AF7E44] uppercase leading-tight">
                ESCULPE TU MEJOR VERSIÓN
              </h3>
              <h4 className="text-[13px] sm:text-sm font-extrabold tracking-wide text-[#6A806C] uppercase leading-tight">
                OPEN DAY ESSENTIA X CORPORE
              </h4>
            </div>

            {/* Datos rápidos: Fecha y Ubicación con tipografía más grande */}
            <div className="mt-3 space-y-2 text-xs sm:text-[13px] text-gray-700 bg-white/90 rounded-2xl p-3 border border-amber-100/80 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#AF7E44] shrink-0" />
                <span className="font-bold text-gray-900">Sábado 28 Nov 2026 · 10:00 h</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#6A806C] shrink-0" />
                <span className="font-medium text-gray-800 leading-snug">Corpore10 Cross Training (Maliaño)</span>
              </div>
            </div>

            {/* Destacados del evento actualizados */}
            <div className="mt-3 py-2 px-3 bg-amber-50/70 rounded-xl border border-amber-100/80 text-xs sm:text-[12px] text-gray-700 leading-relaxed text-center">
              <p className="font-medium">
                Evento de presentación de alianza para clientes · Catering & Vinos · Procedimiento en vivo · Beneficios · muchos más.
              </p>
            </div>

            {/* Botón de acción principal para inscribirse */}
            <div className="mt-3.5 space-y-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#AF7E44] to-[#6A806C] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#AF7E44]/25 transition-all transform hover:scale-[1.02]"
              >
                <span>Inscribirme al Evento</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full text-center text-xs font-semibold text-[#AF7E44] hover:text-[#966b37] underline underline-offset-2 transition-colors py-0.5"
              >
                Ver todos los detalles y requisitos
              </button>
            </div>

            {/* Logos cuadrados de iguales proporciones en la parte inferior */}
            <div className="mt-4 pt-3.5 border-t border-amber-200/60">
              <div className="flex items-center justify-center gap-3">
                {/* Logo Essentia Lux: Ajustado perfectamente al recuadro dorado sin fondo blanco */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 aspect-square bg-[#FDF7EB] rounded-2xl border border-[#AF7E44]/60 overflow-hidden shadow-xs shrink-0 flex items-center justify-center">
                  <img
                    src="/logo-essentia-event.jpg"
                    alt="Essentia Lux Aesthetic Medicine"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Símbolo de alianza */}
                <span className="text-[#AF7E44] font-black text-sm select-none">✕</span>

                {/* Logo Corpore10: Cuadrado proporcional */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 aspect-square bg-black rounded-2xl border border-gray-800 flex items-center justify-center p-2 shadow-xs shrink-0">
                  <img
                    src="/logo-corpore10-event.jpg"
                    alt="Corpore10 Cross Training"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </aside>

      {/* PÍLDORA FLOTANTE PARA MÓVILES (visible en pantallas pequeñas cuando el widget principal esté en borde) */}
      <div className="sm:hidden fixed bottom-24 left-3 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-[#AF7E44] to-[#6A806C] text-white rounded-full shadow-2xl border border-amber-200/50 text-xs font-bold animate-pulse"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>ESCULPE TU MEJOR VERSIÓN</span>
          <span className="px-1.5 py-0.5 bg-black/25 rounded-full text-[10px]">
            {spotsRemaining} plazas
          </span>
        </button>
      </div>

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
