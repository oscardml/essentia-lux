import nodemailer from "nodemailer";

interface EventRegistrationEmailParams {
  fullName: string;
  phone: string;
  instagramHandle: string;
  eventTitle: string;
  eventDate: string;
  spotsRemaining: number;
}

function getTransporter() {
  const username = (process.env.SMTP_USERNAME || process.env.SMTP_USER || "").trim();
  const rawPassword = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS || "");
  // Las contraseñas de aplicación de Google vienen con espacios (ej. "abcd efgh ijkl mnop").
  // Se eliminan para asegurar la autenticación correcta vía SASL.
  const password = rawPassword.replace(/\s+/g, "");
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;

  if (!username || !password) {
    return null;
  }

  return host
    ? nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user: username, pass: password },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000,
      })
    : nodemailer.createTransport({
        service: "gmail",
        auth: { user: username, pass: password },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000,
      });
}

/**
 * Verifica si la configuración SMTP está activa y valida la conexión con el servidor de correo.
 */
export async function verifyEmailConfiguration(): Promise<{
  configured: boolean;
  connected: boolean;
  message: string;
}> {
  const username = (process.env.SMTP_USERNAME || process.env.SMTP_USER || "").trim();
  const password = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS || "").replace(/\s+/g, "");

  if (!username || !password) {
    return {
      configured: false,
      connected: false,
      message: "Variables SMTP_USERNAME y/o SMTP_PASSWORD no detectadas en el entorno.",
    };
  }

  const transporter = getTransporter();
  if (!transporter) {
    return {
      configured: false,
      connected: false,
      message: "No se pudo instanciar el transporte de correo.",
    };
  }

  try {
    await transporter.verify();
    return {
      configured: true,
      connected: true,
      message: `Conexión SMTP verificada exitosamente con el remitente: ${username}`,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Error desconocido al conectar con el servidor SMTP";
    return {
      configured: true,
      connected: false,
      message: `Error de autenticación SMTP: ${errorMsg}`,
    };
  }
}

export async function sendEventRegistrationEmail(params: EventRegistrationEmailParams): Promise<{ sent: boolean; message: string }> {
  const username = (process.env.SMTP_USERNAME || process.env.SMTP_USER || "").trim();
  const transporter = getTransporter();

  if (!transporter || !username) {
    console.warn(
      `[EVENT NOTIFICATION] Aviso: SMTP_USERNAME o SMTP_PASSWORD no configurados. Registro para ${params.fullName} (${params.phone}, @${params.instagramHandle}) procesado sin envío de email.`
    );
    return {
      sent: false,
      message: "Credenciales SMTP no configuradas. Se guardó el registro en base de datos correctamente.",
    };
  }

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #AF7E44 0%, #6A806C 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 32px 24px; }
          .badge { display: inline-block; background-color: #f1f5f9; color: #475569; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; margin-bottom: 20px; }
          .info-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
          .info-row { display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding: 10px 0; font-size: 14px; }
          .info-row:last-child { border-bottom: none; }
          .label { font-weight: 600; color: #64748b; }
          .value { font-weight: 700; color: #0f172a; text-align: right; }
          .highlight { color: #AF7E44; }
          .footer { background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nueva Inscripción a Evento</h1>
            <p>Essentia Lux Aesthetic Medicine</p>
          </div>
          <div class="content">
            <span class="badge">Evento: ${params.eventTitle}</span>
            <p style="font-size: 15px; line-height: 1.5; margin-top: 0;">
              Se ha recibido una nueva solicitud de plaza para el evento del <strong>${params.eventDate}</strong>.
            </p>
            <div class="info-card">
              <div class="info-row">
                <span class="label">Nombre completo:</span>
                <span class="value">${params.fullName}</span>
              </div>
              <div class="info-row">
                <span class="label">Teléfono móvil:</span>
                <span class="value"><a href="tel:${params.phone}" style="color: #0f172a; text-decoration: none;">${params.phone}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Instagram:</span>
                <span class="value"><a href="https://instagram.com/${params.instagramHandle.replace('@', '')}" target="_blank" style="color: #AF7E44; text-decoration: none;">@${params.instagramHandle.replace('@', '')}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Plazas restantes estimadas:</span>
                <span class="value highlight">${params.spotsRemaining} plazas</span>
              </div>
            </div>
            <p style="font-size: 13px; color: #64748b; line-height: 1.4;">
              * Recuerda verificar que el usuario siga las cuentas oficiales de <strong>@essentialux_am</strong> y <strong>@corpore10cantabria</strong>.
            </p>
          </div>
          <div class="footer">
            Mensaje automático generado por Essentia Lux Web · info@essluxam.com
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Essentia Lux Eventos" <${username}>`,
      to: "info@essluxam.com",
      subject: `Nueva inscripción: ${params.fullName} (${params.eventTitle})`,
      text: `Nueva inscripción al evento ${params.eventTitle}:\n\n- Nombre: ${params.fullName}\n- Teléfono: ${params.phone}\n- Instagram: @${params.instagramHandle.replace('@', '')}\n- Plazas restantes: ${params.spotsRemaining}`,
      html: htmlContent,
    });

    return { sent: true, message: "Correo enviado correctamente a info@essluxam.com" };
  } catch (error) {
    console.error("[EVENT NOTIFICATION ERROR]", error);
    return {
      sent: false,
      message: error instanceof Error ? error.message : "Error enviando correo",
    };
  }
}
