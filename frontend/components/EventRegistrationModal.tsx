"use client";

import React, { useState, useEffect } from "react";
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

  // Bloqueo de scroll en el body mientras el modal está abierto
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
    <div
      className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* CAJA DEL MODAL: bottom-sheet en móvil, centrado en desktop */}
      <div 
        className="relative w-full sm:max-w-[420px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#AF7E44]/30 max-h-[90dvh] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA COMPACTA */}
        <div className="relative bg-gradient-to-r from-[#AF7E44] via-[#8B6536] to-[#6A806C] text-white px-3 py-2.5 shrink-0 z-20">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-2 right-2 min-w-[36px] min-h-[36px] w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer z-30"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-semibold tracking-wider uppercase mb-1 text-white">
            <Sparkles className="w-2.5 h-2.5" />
            Evento Exclusivo · Aforo Limitado
          </div>

          <div className="text-center my-0.5 pr-6 sm:pr-0">
            <h2 className="text-xs sm:text-sm font-black tracking-tight text-amber-200 uppercase leading-tight">
              ESCULPE TU MEJOR VERSIÓN
            </h2>
            <h3 className="text-[10px] sm:text-[11px] font-extrabold text-[#e2ede4] uppercase tracking-wider mt-0.5">
              OPEN DAY ESSENTIA X CORPORE
            </h3>
          </div>

          {/* Barra de progreso de aforo compacta */}
          <div className="mt-1.5 bg-black/25 rounded-lg px-2 py-1 backdrop-blur-xs">
            <div className="flex justify-between items-center text-[10px] font-semibold mb-0.5">
              <span className="flex items-center gap-1 text-white">
                <Users className="w-3 h-3 text-amber-200" />
                Cupo: <span className="underline underline-offset-1">{capacity} personas</span>
              </span>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${remaining <= 5 ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500/95 text-white'}`}>
                {remaining === 0 ? "Agotado" : `Quedan ${remaining} plazas`}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-300 to-emerald-300 h-1 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(percentageTaken, 8)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* CUERPO CON SCROLL INDEPENDIENTE */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 space-y-2.5 text-gray-700">
          {isSuccess ? (
            <div className="text-center py-4 space-y-2.5">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                ¡Plaza Confirmada con Éxito!
              </h3>
              <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                Gracias <strong>{fullName}</strong>. Tu inscripción ha sido registrada para el <strong>28 de noviembre a las 10:00 h</strong> en Corpore10.
              </p>
              <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-2.5 text-[11px] text-amber-900 text-left max-w-xs mx-auto space-y-1">
                <p className="font-bold flex items-center gap-1 text-[#AF7E44]">
                  <Sparkles className="w-3 h-3" /> Recordatorios importantes:
                </p>
                <p>• Dirección: Polígono Cros, 38D (junto a Makro), 39600 Maliaño.</p>
                <p>• Asegúrate de tener activas tus notificaciones en Instagram.</p>
                <p>• Notificado a nuestro equipo (<strong>info@essluxam.com</strong>).</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-[#AF7E44] hover:bg-[#966b37] text-white text-xs font-semibold rounded-lg transition-all shadow-md cursor-pointer"
              >
                Cerrar y volver
              </button>
            </div>
          ) : (
            <>
              {/* FORMULARIO DE REGISTRO PRIMERO — visible de inmediato sin scroll */}
              <form onSubmit={handleSubmit} className="space-y-2 border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-gray-900">
                    Reserva tu plaza de invitado
                  </h4>
                  <span className="text-[9px] font-normal text-gray-500">Gratuito · 30 cupos</span>
                </div>

                {errorMsg && (
                  <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Carmen Rodríguez"
                      className="w-full px-2.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF7E44] text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                      Teléfono Móvil (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 612 34 56 78"
                      className="w-full px-2.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF7E44] text-sm text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                      Usuario de Instagram *
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-gray-400 font-semibold text-sm">@</span>
                      <input
                        type="text"
                        required
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        placeholder="tu_usuario"
                        className="w-full pl-6 pr-2.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF7E44] text-sm text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Requisito de Instagram */}
                  <div className="bg-gray-50 border border-gray-200/80 rounded-lg p-2 text-[10px] text-gray-600 space-y-1">
                    <div className="flex items-center gap-1 text-gray-700 font-semibold text-[10px]">
                      <Instagram className="w-3 h-3 text-pink-600" />
                      Requisito: Seguir ambas cuentas
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      <a
                        href="https://www.instagram.com/essentialux_am"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white hover:bg-gray-100 border border-gray-200 rounded text-[10px] font-bold text-gray-800 transition-colors"
                      >
                        @essentialux_am ↗
                      </a>
                      <a
                        href="https://www.instagram.com/corpore10cantabria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white hover:bg-gray-100 border border-gray-200 rounded text-[10px] font-bold text-gray-800 transition-colors"
                      >
                        @corpore10cantabria ↗
                      </a>
                    </div>
                    <label className="flex items-start gap-1 pt-0.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={followsInstagram}
                        onChange={(e) => setFollowsInstagram(e.target.checked)}
                        className="mt-0.5 h-3 w-3 rounded border-gray-300 text-[#AF7E44] focus:ring-[#AF7E44]"
                      />
                      <span className="text-[10px] text-gray-700 font-medium">
                        Confirmo que sigo a ambas cuentas en Instagram.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading || remaining === 0}
                    className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#AF7E44] to-[#6A806C] hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-1 shadow-md shadow-[#AF7E44]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Registrando...</span>
                      </>
                    ) : remaining === 0 ? (
                      <span>Plazas agotadas</span>
                    ) : (
                      <>
                        <span>Confirmar mi Plaza ({remaining} disponibles)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* DETALLES DEL EVENTO (debajo del formulario, accesibles con scroll) */}
              <div className="space-y-2">
                {/* Información clave (2 columnas) */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="p-1.5 rounded bg-[#AF7E44]/10 text-[#AF7E44] shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-gray-500 uppercase">Fecha y Hora</p>
                      <p className="text-[11px] font-bold text-gray-900 mt-0.5">Sáb, 28 Nov 2026</p>
                      <p className="text-[10px] text-gray-600">Desde las 10:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="p-1.5 rounded bg-[#6A806C]/10 text-[#6A806C] shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-gray-500 uppercase">Ubicación</p>
                      <p className="text-[11px] font-bold text-gray-900 mt-0.5">Corpore10 Training</p>
                      <p className="text-[10px] text-gray-600 leading-tight">Polígono Cros, Maliaño</p>
                    </div>
                  </div>
                </div>

                {/* Perfil */}
                <div className="bg-gradient-to-r from-amber-50/70 to-emerald-50/70 border border-amber-200/50 rounded-lg p-2">
                  <p className="text-[9px] font-bold text-[#AF7E44] uppercase tracking-wide flex items-center gap-1 mb-0.5">
                    <Award className="w-3 h-3" /> Invitación Exclusiva
                  </p>
                  <p className="text-[11px] text-gray-700 leading-snug font-medium">
                    {event.target_audience || "Personas interesadas en entrenar en Corpore10 y medicina estética de Essentia Lux."}
                  </p>
                </div>

                {/* Qué incluye */}
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">El evento incluye:</p>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-700">
                    <div className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#AF7E44] shrink-0" /><span>Presentación alianza</span></div>
                    <div className="flex items-center gap-1"><Wine className="w-3 h-3 text-rose-500 shrink-0" /><span>Catering &amp; vinos</span></div>
                    <div className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#6A806C] shrink-0" /><span>Procedimientos en vivo</span></div>
                    <div className="flex items-center gap-1"><Dumbbell className="w-3 h-3 text-gray-700 shrink-0" /><span>Charla salud &amp; deporte</span></div>
                    <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" /><span>Portafolio exclusivo</span></div>
                    <div className="flex items-center gap-1"><Award className="w-3 h-3 text-amber-500 shrink-0" /><span>Beneficios &amp; obsequios</span></div>
                  </div>
                </div>

                {/* Logos */}
                <div className="p-2 bg-amber-50/40 rounded-lg border border-amber-200/50">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-[#FDF7EB] rounded-lg border border-[#AF7E44]/60 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                      <img src="/logo-essentia-event.jpg" alt="Essentia Lux" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[#AF7E44] font-black text-[10px] select-none">✕</span>
                    <div className="w-8 h-8 bg-black rounded-lg border border-gray-800 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                      <img src="/logo-corpore10-event.jpg" alt="Corpore10" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 ml-1">Alianza Oficial</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
