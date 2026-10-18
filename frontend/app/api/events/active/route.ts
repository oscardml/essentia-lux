import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { EventItem } from "@/types/event";

const DEFAULT_EVENT: EventItem = {
  id: "corpore-event-fallback-id",
  slug: "esculpe-tu-mejor-version-corpore10",
  title: "Esculpe tu Mejor Versión: Open Day Essentia x Corpore",
  description:
    "Un evento exclusivo donde el entrenamiento de alto rendimiento y la medicina estética avanzada se unen para transformar tu bienestar.",
  target_audience:
    "Invitación exclusiva para personas interesadas en entrenar en Corpore10 y tratamientos de medicina estética y dermocosmética ofertados por Essentia Lux Aesthetic Medicine.",
  event_date: "2026-11-28T10:00:00+01:00",
  location_name: "Gimnasio Corpore10 Cross Training",
  location_address:
    "Polígono Cros, 38D (junto a Makro), 39600 Maliaño (Camargo), Cantabria",
  instagram_handles: ["essentialux_am", "corpore10cantabria"],
  features_included: [
    "Presentación de la alianza exclusiva",
    "Catering para invitados y colaboradores",
    "Evento y degustación de vinos",
    "Procedimientos y demostraciones en vivo",
    "Charla sobre la importancia del deporte y cuidados médico-estéticos",
    "Presentación de portafolios Essentia Lux y Corpore10",
    "Plan de beneficios para clientes de ambas marcas",
    "Detalles y sorpresas exclusivas para invitados",
  ],
  capacity: 30,
  active: true,
  spots_remaining: 30,
  registered_count: 0,
};

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Consultamos el evento activo más próximo en Supabase
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("active", true)
      .order("event_date", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (eventError || !event) {
      // Si la tabla no ha sido creada todavía en Supabase, devolvemos el evento por defecto
      return NextResponse.json({
        event: DEFAULT_EVENT,
        isFallback: true,
      });
    }

    // Consultamos el número de registrados para calcular plazas restantes
    const { count, error: countError } = await supabase
      .from("event_registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_id", event.id);

    const registeredCount = countError || count === null ? 0 : count;
    const capacity = event.capacity || 30;
    const spotsRemaining = Math.max(capacity - registeredCount, 0);

    const fullEvent: EventItem = {
      ...event,
      registered_count: registeredCount,
      spots_remaining: spotsRemaining,
    };

    return NextResponse.json({
      event: fullEvent,
      isFallback: false,
    });
  } catch (err) {
    console.error("[API /api/events/active] Error:", err);
    return NextResponse.json({
      event: DEFAULT_EVENT,
      isFallback: true,
    });
  }
}
