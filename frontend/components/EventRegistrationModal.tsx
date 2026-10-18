"use client";

import React, { useState } from "react";
import { EventItem } from "@/types/event";
import { X, Calendar, MapPin, Instagram, Users, CheckCircle, Wine, Sparkles, Dumbbell, Award, ArrowRight } from "lucide-react";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onRegistrationSuccess: (remaining: number) => void;
}

export default function EventRegistrationModal({
  isOpen,
  onClose,
  event,
  onRegistrationSuccess,
}: EventRegistrationModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [followsInstagram, setFollowsInstagram] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg("Por favor, introduce tu nombre y apellidos.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 9) {
      setErrorMsg("Por favor, introduce un número de teléfono móvil válido (mínimo 9 dígitos).");
      return;
    }
    if (!instagramHandle.trim()) {
      setErrorMsg("Por favor, introduce tu usuario de Instagram.");
      return;
    }
    if (!followsInstagram) {
      setErrorMsg("Debes confirmar que sigues a @essentialux_am y @corpore10cantabria.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          fullName: fullName.trim(),
          phone: phone.trim(),
          instagramHandle: instagramHandle.trim().replace(/^@/, ""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al procesar la inscripción.");
      }

      setIsSuccess(true);
      if (typeof data.spotsRemaining === "number") {
        onRegistrationSuccess(data.spotsRemaining);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado al registrarte.");
    } finally {
      setLoading(false);
    }
  };

  const remaining = event.spots_remaining ?? 30;
  const capacity = event.capacity ?? 30;
  const percentageTaken = Math.min(100, Math.round(((capacity - remaining) / capacity) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera con degradado distintivo */}
        <div className="relative bg-gradient-to-r from-[#AF7E44] via-[#8B6536] to-[#6A806C] text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-black/20 hover:bg-black/35 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wider uppercase mb-3 text-white">
            <Sparkles className="w-3.5 h-3.5" />
            Evento Exclusivo · Aforo Limitado
          </div>

          <div className="text-center my-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-amber-200 uppercase leading-tight">
              ESCULPE TU MEJOR VERSIÓN
            </h2>
            <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-[#e2ede4] uppercase tracking-wider mt-1">
              OPEN DAY ESSENTIA X CORPORE
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/90 font-medium">
              Alianza oficial Essentia Lux Aesthetic Medicine & Corpore10 Cross Training
            </p>
          </div>

          {/* Barra de progreso de aforo */}
          <div className="mt-4 bg-black/20 rounded-xl p-3 backdrop-blur-xs">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-white">
                <Users className="w-4 h-4 text-amber-200" />
                Cupo de invitados: <span className="underline underline-offset-2">{capacity} personas</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${remaining <= 5 ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500/90 text-white'}`}>
                {remaining === 0 ? "Aforo Completo" : `¡Solo quedan ${remaining} plazas!`}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-300 to-emerald-300 h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(percentageTaken, 8)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                ¡Plaza Confirmada con Éxito!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                Gracias <strong>{fullName}</strong>. Tu inscripción ha sido registrada para el <strong>28 de noviembre a las 10:00 h</strong> en Corpore10.
              </p>
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 text-left max-w-md mx-auto space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-[#AF7E44]">
                  <Sparkles className="w-4 h-4" /> Recordatorios importantes:
                </p>
                <p>• Dirección: Polígono Cros, 38D (junto a Makro), 39600 Maliaño.</p>
                <p>• Asegúrate de tener activas tus notificaciones en Instagram.</p>
                <p>• Se ha notificado la reserva a nuestro equipo (<strong>info@essluxam.com</strong>).</p>
              </div>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-[#AF7E44] hover:bg-[#966b37] text-white font-semibold rounded-xl transition-all shadow-md"
              >
                Cerrar y volver
              </button>
            </div>
          ) : (
            <>
              {/* Información clave del evento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="p-2.5 rounded-xl bg-[#AF7E44]/10 text-[#AF7E44] shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha y Hora</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">Sábado, 28 Noviembre 2026</p>
                    <p className="text-xs text-gray-600">A partir de las 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="p-2.5 rounded-xl bg-[#6A806C]/10 text-[#6A806C] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ubicación</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">Corpore10 Cross Training</p>
                    <p className="text-xs text-gray-600 leading-snug">
                      Polígono Cros, 38D (junto a Makro), 39600 Maliaño
                    </p>
                  </div>
                </div>
              </div>

              {/* Perfil de invitados / Requisitos */}
              <div className="bg-gradient-to-r from-amber-50/60 to-emerald-50/60 border border-amber-200/50 rounded-2xl p-4">
                <p className="text-xs font-bold text-[#AF7E44] uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4" /> Invitación Exclusiva
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {event.target_audience || "Invitación exclusiva para personas interesadas en entrenar en Corpore10 y tratamientos de medicina estética y dermocosmética ofertados por Essentia Lux Aesthetic Medicine."}
                </p>
              </div>

              {/* Qué incluye */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  El evento incluye:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#AF7E44] shrink-0" />
                    <span>Presentación de la alianza</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wine className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Catering y degustación de vinos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#6A806C] shrink-0" />
                    <span>Procedimientos en vivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-gray-700 shrink-0" />
                    <span>Charla: Deporte y Medicina Estética</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Portafolio Essentia Lux & Corpore10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Plan de beneficios y obsequios</span>
                  </div>
                </div>
              </div>

              {/* Logos de las marcas colaboradoras */}
              <div className="p-3 bg-amber-50/40 rounded-2xl border border-amber-200/50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#AF7E44] text-center mb-2">
                  Alianza Oficial Essentia Lux & Corpore10
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 aspect-square bg-[#FDF7EB] rounded-2xl border border-[#AF7E44]/60 overflow-hidden shadow-xs shrink-0 flex items-center justify-center">
                    <img
                      src="/logo-essentia-event.jpg"
                      alt="Essentia Lux Aesthetic Medicine"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[#AF7E44] font-black text-sm select-none">✕</span>
                  <div className="w-16 h-16 sm:w-18 sm:h-18 aspect-square bg-black rounded-2xl border border-gray-800 flex items-center justify-center p-2 shadow-xs shrink-0">
                    <img
                      src="/logo-corpore10-event.jpg"
                      alt="Corpore10 Cross Training"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>


              {/* Formulario de registro */}

              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 flex items-center justify-between">
                  <span>Reserva tu plaza de invitado</span>
                  <span className="text-xs font-normal text-gray-500">Sin coste · 30 plazas máx.</span>
                </h4>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl animate-shake">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Carmen Rodríguez Gómez"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF7E44] text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Teléfono Móvil (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 612 34 56 78"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF7E44] text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tu usuario de Instagram *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-gray-400 font-semibold text-sm">@</span>
                      <input
                        type="text"
                        required
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        placeholder="tu_usuario"
                        className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF7E44] text-sm text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Requisito de Instagram */}
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 text-xs text-gray-600 space-y-2">
                    <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      Requisito del evento: Seguir las cuentas oficiales
                    </div>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      <a
                        href="https://www.instagram.com/essentialux_am"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 transition-colors"
                      >
                        @essentialux_am ↗
                      </a>
                      <a
                        href="https://www.instagram.com/corpore10cantabria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 transition-colors"
                      >
                        @corpore10cantabria ↗
                      </a>
                    </div>
                    <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={followsInstagram}
                        onChange={(e) => setFollowsInstagram(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#AF7E44] focus:ring-[#AF7E44]"
                      />
                      <span className="text-xs text-gray-700 font-medium">
                        Confirmo que sigo a ambas cuentas en Instagram para participar en el evento.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || remaining === 0}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#AF7E44] to-[#6A806C] hover:opacity-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#AF7E44]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Registrando plaza...</span>
                      </>
                    ) : remaining === 0 ? (
                      <span>Plazas agotadas</span>
                    ) : (
                      <>
                        <span>Confirmar mi Plaza ({remaining} disponibles)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-gray-500 mt-2">
                    Recibirás confirmación y el equipo organizador te esperará el 28 de noviembre.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
