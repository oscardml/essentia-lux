import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEventRegistrationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, fullName, phone, instagramHandle } = body;

    // Validación básica de campos requeridos
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Por favor, introduce tu nombre completo." },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").toString().trim().replace(/\s+/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      return NextResponse.json(
        { error: "Por favor, introduce un número de teléfono móvil válido." },
        { status: 400 }
      );
    }

    const cleanInstagram = (instagramHandle || "").toString().trim().replace(/^@/, "");
    if (!cleanInstagram) {
      return NextResponse.json(
        { error: "Por favor, introduce tu nombre de usuario en Instagram." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Consultamos el evento activo
    let eventTitle = "Esculpe tu Mejor Versión: Open Day Essentia x Corpore";
    let eventDateFormatted = "28 de noviembre de 2026 a las 10:00 h";
    let capacity = 30;
    let actualEventId = eventId;
    let spotsRemaining = 30;

    // Buscamos el evento real en Supabase
    const { data: dbEvent } = await supabase
      .from("events")
      .select("*")
      .eq("active", true)
      .limit(1)
      .maybeSingle();

    if (dbEvent) {
      actualEventId = dbEvent.id;
      eventTitle = dbEvent.title;
      capacity = dbEvent.capacity || 30;
      eventDateFormatted = new Date(dbEvent.event_date).toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Comprobamos registros existentes
      const { count: currentRegistrations } = await supabase
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", actualEventId);

      const count = currentRegistrations || 0;
      if (count >= capacity) {
        return NextResponse.json(
          { error: "Lo sentimos, el aforo para este evento ya está completo (30 plazas agotadas)." },
          { status: 400 }
        );
      }

      // Comprobamos duplicados por teléfono
      const { data: existingReg } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("event_id", actualEventId)
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (existingReg) {
        return NextResponse.json(
          { error: "Este número de teléfono ya tiene una plaza reservada para el evento." },
          { status: 400 }
        );
      }

      // Insertamos el nuevo registro
      const { error: insertError } = await supabase
        .from("event_registrations")
        .insert({
          event_id: actualEventId,
          full_name: fullName.trim(),
          phone: cleanPhone,
          instagram_handle: cleanInstagram,
        });

      if (insertError) {
        console.error("[EVENT REGISTRATION DB ERROR]", insertError);
        return NextResponse.json(
          { error: "Hubo un problema al guardar la reserva. Por favor, inténtalo de nuevo." },
          { status: 500 }
        );
      }

      spotsRemaining = Math.max(capacity - (count + 1), 0);
    } else {
      // Modo fallback (mientras el usuario ejecuta el SQL en Supabase)
      console.log(
        `[EVENT REGISTRATION (FALLBACK)] Registro local de: ${fullName} (${cleanPhone}, @${cleanInstagram})`
      );
      spotsRemaining = 29;
    }

    // Enviamos notificación por correo electrónico a info@essluxam.com
    const emailResult = await sendEventRegistrationEmail({
      fullName: fullName.trim(),
      phone: cleanPhone,
      instagramHandle: cleanInstagram,
      eventTitle,
      eventDate: eventDateFormatted,
      spotsRemaining,
    });

    return NextResponse.json({
      success: true,
      message: "¡Tu plaza ha sido reservada con éxito! Te esperamos el 28 de noviembre.",
      emailSent: emailResult.sent,
      emailMessage: emailResult.message,
      spotsRemaining,
    });
  } catch (err) {
    console.error("[API /api/events/register] Error general:", err);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar el registro." },
      { status: 500 }
    );
  }
}
