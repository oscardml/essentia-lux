import { CodeSquare, HomeIcon, Star, ShoppingBag } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import { STORE_ENABLED } from "@/config/features";

export const itemsNavbar = [
  {
    id: 1,
    title: "Home",
    icon: <HomeIcon size={25} color="#4A4A4A" strokeWidth={1} />,
    link: "/",
  },
  // "Sobre Nosotros" ya no está en el menú: su texto de presentación abre
  // ahora la página de inicio. La página sigue existiendo (equipo, mapa,
  // horarios) y se enlaza desde ahí.
  {
    id: 3,
    title: "Servicios",
    icon: <CodeSquare size={25} color="#4A4A4A" strokeWidth={1} />,
    link: "/servicios",
  },
  {
    id: 4,
    title: "Reseñas",
    icon: <Star size={25} color="#4A4A4A" strokeWidth={1} />,
    link: "/resenas",
  },
  // "Reservar Cita" ya no vive en el menú: se llega a ella desde el botón
  // "Reservar Cita" de cada servicio, que es donde el usuario decide de verdad.
  // La entrada "Tienda" solo aparece cuando STORE_ENABLED está activo.
  ...(STORE_ENABLED
    ? [
        {
          id: 6,
          title: "Tienda",
          icon: <ShoppingBag size={25} color="#4A4A4A" strokeWidth={1} />,
          link: "/tienda",
        },
      ]
    : []),
];

// data/data.ts
// Promociones del panel animado de la página de inicio.
// Para cambiar la promoción basta con editar esta lista: el panel las va
// rotando solo y se adapta a cuántas haya.
//
// Campos opcionales:
//   cabecera → título del panel ("Promociones" si no se indica).
//   ofertas  → lista de tratamientos con precio, en bloque destacado.
//   aviso    → línea de urgencia bajo las ofertas.
export interface Promocion {
  id: string;
  etiqueta: string;
  titulo: string;
  descripcion: string;
  cta: string;
  link: string;
  cabecera?: string;
  ofertas?: { nombre: string; precio: string }[];
  aviso?: string;
}

export const promociones: Promocion[] = [
  {
    id: "octubre",
    cabecera: "Especial del mes",
    etiqueta: "Octubre",
    titulo: "Después del verano, tu piel necesita un extra de cuidado",
    descripcion:
      "Es el momento perfecto para oxigenar, renovar y devolver luminosidad a tu piel, eliminando las células muertas acumuladas durante el verano.",
    ofertas: [
      { nombre: "Hydrafacial + Peeling químico", precio: "100 €" },
      { nombre: "Hydrafacial + Dermapen", precio: "100 €" },
    ],
    aviso: "Plazas limitadas",
    cta: "Agenda tu cita de octubre",
    link: "/separar-cita",
  },

  {
    id: "packs",
    etiqueta: "Paquetes especiales",
    titulo: "Combina tratamientos y ahorra",
    descripcion:
      "Programas completos como Sculpt Lux o Regenera Lux, diseñados para lograr resultados óptimos con precios especiales.",
    cta: "Ver paquetes",
    link: "/servicios",
  },
];
// data.ts o data.tsx



export const socialNetworks = [
  {
    id: 1,
    name: "WhatsApp",
    logo: <FaWhatsapp size={36} />,
    src: "https://wa.me/34691589789",
  },
  {
    id: 2,
    name: "Instagram",
    logo: <FaInstagram size={36} />,
    src: "https://www.instagram.com/essentialux_am",
  },
  {
    id: 3,
    name: "LinkedIn",
    logo: <FaLinkedin size={36} />,
    src: "https://linkedin.com/in/dracatalinatenjo",
  },
];

export const introductionData = {
  tituloPrincipal: "Sobre Nosotros",
  frases: [
    "Bienvenido a Essentia Lux",
    "Tu belleza natural, nuestro compromiso",
    "Tratamientos médico estéticos personalizados",
  ],
  descripcion: `En Essentia Lux, nuestro propósito es resaltar tu belleza natural a través de tratamientos estéticos avanzados y personalizados. Nos enorgullece ofrecer un espacio donde la ciencia médica, la tecnología de vanguardia y el bienestar se encuentran para brindar resultados visibles y armoniosos.`,
  mision: `Brindar servicios de medicina estética de alta calidad que promuevan la salud, la autoestima y el bienestar integral de nuestros pacientes, mediante una atención personalizada y el uso de tecnología de última generación.`,
  vision: `Ser el centro de referencia en estética médica de la región, reconocido por la excelencia en los resultados, la ética profesional y la innovación constante.`,
  fraseInspiradora: "✨ Cuidamos tu belleza con alma y precisión",
  mapaImagen: "/maps.PNG",
  direccion: "📍 Estamos ubicados en: Centro Medico Lealtad. C. Lealtad, 12, Esc A 1º Izda, 39002 Santander, Cantabria, España",
  mapasUrl: "https://maps.app.goo.gl/7TUJGhKyb4K1Fwfj9",
  equipoTitulo: "⚕️ CEO & Fundadora",
  equipoDescripcion: `Dra. Diana Catalina Tenjo`,
  equipoNombre: "Dra. Catalina Tenjo Marroquín",
  equipoDetalles: `Médico especialista en medicina estética, experta en armonización facial y corporal con más de 14 años de experiencia en el sector salud.

  Se ha desempeñado con éxito en entornos de trabajos multidisciplinarios y equipos de alto rendimiento, destacando por su compromiso, liderazgo y orientación a resultados.

  Actualmente, se enfoca en fortalecer su carrera en medicina estética, aplicando sus conocimientos y experiencia para contribuir al bienestar integral de los pacientes y mantenerse a la vanguardia de los avances en este campo en constante evolución.`,
  horariosTitulo: "🕒 Horarios de apertura",
  horarios: ["Lunes a Viernes: 10:00 - 19:30", "Sábado y Domingo: Cerrado"],
  contactoTitulo: "📞 Contáctanos",
  whatsapp: {
    numero: "+34 691 58 97 89",
    url: "https://wa.me/34691589789",
    icono: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  },
  instagram: {
    url: "https://www.instagram.com/essentialux_am",
    icono: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  },
  disponibilidad: "Atención personalizada y horarios flexibles para ti.",
};

// src/data/index.ts
export const avisoLegal = `
<div class="legal-document">
  <div class="document-header">
    <h1 class="document-title">📋 Aviso Legal</h1>
    <div class="last-updated">
      <span class="update-badge">Última actualización: 14/08/2025</span>
    </div>
  </div>

  <div class="content-wrapper">
    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">1.</span>
        <span class="section-text">Información general (LSSICE)</span>
      </h2>
      <div class="section-content">
        <p class="intro-text">De conformidad con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, se facilitan los datos de identificación del prestador del servicio:</p>
        
        <p><strong>🏥 Titular:</strong> Essentia Lux Aesthetic Medicine</p>
        <p><strong>📍 Domicilio profesional:</strong> Centro Médico Lealtad, C. Lealtad, 12, Esc. A, 1º Izda, 39002 – Santander (Cantabria), España</p>
        <p><strong>📧 Correo electrónico:</strong> <span class="contact-email">info@essluxam.com</span></p>
        <p><strong>🌐 Sitio web:</strong> <a href="https://www.essluxam.com/" target="_blank" class="website-link">https://www.essluxam.com/</a></p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">2.</span>
        <span class="section-text">Objeto del sitio</span>
      </h2>
      <div class="section-content">
        <div class="highlight-box">
          <p>El sitio web proporciona información corporativa y divulgativa sobre medicina estética, tratamientos y servicios de Essentia Lux Aesthetic Medicine. La información publicada tiene carácter orientativo y no constituye asesoramiento médico ni oferta vinculante; cualquier tratamiento requiere valoración clínica personalizada en consulta por personal cualificado.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">3.</span>
        <span class="section-text">Condiciones de uso</span>
      </h2>
      <div class="section-content">
        <p>El acceso y la navegación implican la aceptación de este Aviso Legal y, en su caso, de la Política de Privacidad y la Política de Cookies. El usuario se compromete a realizar un uso diligente y lícito del sitio, a no introducir contenidos ofensivos o ilícitos, y a no intentar vulnerar medidas de seguridad.</p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">4.</span>
        <span class="section-text">Propiedad intelectual e industrial</span>
      </h2>
      <div class="section-content">
        <p>Salvo indicación en contrario, los contenidos (textos, imágenes, logotipos, diseño, combinaciones de colores, código, etc.) son titularidad de Essentia Lux Aesthetic Medicine o se utilizan con autorización/licencia. Queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier uso no autorizado. Las marcas y signos distintivos de terceros que puedan aparecer pertenecen a sus respectivos titulares y su exhibición no confiere licencia alguna.</p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">5.</span>
        <span class="section-text">Enlaces externos</span>
      </h2>
      <div class="section-content">
        <p>Este sitio puede incluir enlaces a páginas de terceros. Essentia Lux Aesthetic Medicine no controla dichos contenidos y no asume responsabilidad por la información, materiales o cualquier resultado derivado del acceso a esos sitios.</p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">6.</span>
        <span class="section-text">Responsabilidad</span>
      </h2>
      <div class="section-content">
        <div class="warning-box">
          <p>Aunque se procura mantener la información actualizada y exacta, no se garantiza la ausencia de errores u omisiones. Essentia Lux Aesthetic Medicine no será responsable por interrupciones de servicio, fallos técnicos, o por el uso que los usuarios hagan de la información publicada. Las decisiones clínicas deben tomarse tras consulta presencial y evaluación profesional.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">7.</span>
        <span class="section-text">Datos personales</span>
      </h2>
      <div class="section-content">
        <p>Si para acceder a determinados apartados o para solicitar información fueran necesarios datos personales, éstos se tratarán conforme a lo previsto en la Política de Privacidad. El usuario podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando una solicitud a <span class="contact-email">info@essluxam.com</span>, en los términos previstos por la normativa aplicable.</p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">8.</span>
        <span class="section-text">Cookies</span>
      </h2>
      <div class="section-content">
        <p>El sitio puede utilizar cookies propias y/o de terceros con fines técnicos, de personalización, analítica o publicitarios. La información detallada sobre tipos de cookies y su gestión está disponible en la Política de Cookies.</p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">9.</span>
        <span class="section-text">Comunicaciones comerciales</span>
      </h2>
      <div class="section-content">
        <p>Sólo se enviarán comunicaciones por medios electrónicos cuando exista base jurídica (p. ej., consentimiento o relación contractual previa) y con mecanismos sencillos para darse de baja.</p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">10.</span>
        <span class="section-text">Menores</span>
      </h2>
      <div class="section-content">
        <div class="info-box">
          <span class="info-icon">👶</span>
          <p>Los contenidos no están dirigidos a menores de 14 años. En caso de que se detecte el registro o envío de datos por menores sin autorización, se procederá a su eliminación.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">11.</span>
        <span class="section-text">Ámbito sanitario</span>
      </h2>
      <div class="section-content">
        <div class="medical-notice">
          <span class="info-icon">⚕️</span>
          <p>Los procedimientos de medicina estética deben ser indicados y realizados por profesionales habilitados, conforme a la normativa sanitaria vigente. Las imágenes de resultados son orientativas y pueden variar según la valoración clínica individual.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">12.</span>
        <span class="section-text">Legislación aplicable y jurisdicción</span>
      </h2>
      <div class="section-content">
        <p>Este Aviso Legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Santander (Cantabria), salvo que la normativa de consumidores y usuarios disponga otro fuero imperativo.</p>
      </div>
    </section>
  </div>

  <style>
    .legal-document {
      max-width: 800px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      color: #2c3e50;
      background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .document-header {
      background: linear-gradient(135deg, #AF7E44 0%, #6A806C 100%);
      color: white;
      padding: 30px 25px;
      text-align: center;
      position: relative;
    }

    .document-title {
      font-size: 2.2rem;
      margin: 0 0 12px 0;
      font-weight: 700;
    }

    .update-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .content-wrapper {
      padding: 20px;
    }

    .legal-section {
      margin-bottom: 12px;
      background: white;
      border-radius: 10px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.02);
      transition: all 0.2s ease;
    }

    .legal-section:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transform: translateY(-1px);
    }

    .section-title {
      display: flex;
      align-items: center;
      margin: 0 0 10px 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .section-number {
      background: linear-gradient(135deg, #AF7E44, #6A806C);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-right: 10px;
      flex-shrink: 0;
      font-size: 0.8rem;
    }

    .section-content {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.4;
    }

    .section-content p {
      margin-bottom: 8px;
    }

    .section-content p:last-child {
      margin-bottom: 0;
    }

    .intro-text {
      margin-bottom: 12px;
      font-style: italic;
      color: #666;
      font-size: 0.85rem;
    }

    .website-link {
      color: #6A806C;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid transparent;
      transition: border-bottom 0.2s ease;
    }

    .website-link:hover {
      border-bottom: 1px solid #6A806C;
    }

    .highlight-box {
      background: linear-gradient(135deg, rgba(175, 126, 68, 0.08), rgba(175, 126, 68, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #AF7E44;
    }

    .warning-box {
      background: linear-gradient(135deg, rgba(255, 193, 7, 0.08), rgba(255, 193, 7, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #ffc107;
      color: #856404;
    }

    .info-box {
      background: linear-gradient(135deg, rgba(106, 128, 108, 0.08), rgba(106, 128, 108, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #6A806C;
      color: #495057;
      display: flex;
      align-items: flex-start;
    }

    .medical-notice {
      background: linear-gradient(135deg, rgba(40, 167, 69, 0.08), rgba(40, 167, 69, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #28a745;
      color: #155724;
      display: flex;
      align-items: flex-start;
    }

    .info-icon {
      font-size: 1.2rem;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .contact-email {
      background: linear-gradient(135deg, #AF7E44, #6A806C);
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .contact-footer {
      text-align: center;
      margin-top: 20px;
      padding: 16px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .contact-info {
      font-size: 0.95rem;
      font-weight: 500;
    }

    .contact-label {
      margin-right: 6px;
      color: #666;
    }

    @media (max-width: 768px) {
      .legal-document {
        margin: 8px;
        border-radius: 12px;
      }
      
      .document-header {
        padding: 25px 20px;
      }
      
      .document-title {
        font-size: 1.8rem;
      }
      
      .content-wrapper {
        padding: 15px;
      }
      
      .legal-section {
        padding: 14px;
        margin-bottom: 10px;
      }
      
      .section-title {
        font-size: 1.1rem;
      }
      
      .section-number {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
    }
  </style>
</div>
`;

export const politicaPrivacidad = `
<div class="legal-document">
  <div class="document-header">
    <h1 class="document-title">🔒 Política de Privacidad</h1>
    <div class="last-updated">
      <span class="update-badge">Última actualización: 14/08/2025</span>
    </div>
  </div>

  <div class="content-wrapper">
    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">1.</span>
        <span class="section-text">Responsable del tratamiento</span>
      </h2>
      <div class="section-content">
        <p><strong>🏥 Titular:</strong> Essentia Lux Aesthetic Medicine</p>
        <p><strong>📍 Domicilio profesional:</strong> Centro Médico Lealtad, C. Lealtad, 12, Esc. A, 1º Izda, 39002 – Santander (Cantabria), España</p>
        <p><strong>📧 Correo electrónico:</strong> <span class="contact-email">info@essluxam.com</span></p>
        <p><strong>🌐 Sitio web:</strong> <a href="https://www.essluxam.com/" target="_blank" class="website-link">https://www.essluxam.com/</a></p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">2.</span>
        <span class="section-text">Finalidad del tratamiento de los datos personales</span>
      </h2>
      <div class="section-content">
        <p class="intro-text">En Essentia Lux Aesthetic Medicine tratamos los datos personales que se recaban a través de este sitio web con las siguientes finalidades:</p>
        
        <div class="purposes-list">
          <div class="purpose-item"><span class="purpose-icon">🤝</span>Mantener la relación comercial y prestar los servicios contratados.</div>
          <div class="purpose-item"><span class="purpose-icon">📅</span>Gestionar citas, consultas y tratamientos estéticos solicitados.</div>
          <div class="purpose-item"><span class="purpose-icon">💬</span>Atender solicitudes de información enviadas a través de los formularios de contacto.</div>
          <div class="purpose-item"><span class="purpose-icon">📧</span>Enviar información comercial y novedades del sector, siempre que exista consentimiento previo.</div>
          <div class="purpose-item"><span class="purpose-icon">📋</span>Cumplir con las obligaciones legales, administrativas y contables de la empresa.</div>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">3.</span>
        <span class="section-text">Conservación de los datos</span>
      </h2>
      <div class="section-content">
        <div class="highlight-box">
          <p>Los datos personales se conservarán mientras se mantenga la relación comercial o hasta que solicites su supresión, así como durante los plazos necesarios para cumplir con obligaciones legales.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">4.</span>
        <span class="section-text">Legitimación</span>
      </h2>
      <div class="section-content">
        <p class="intro-text">El tratamiento de tus datos se basa en:</p>
        
        <div class="legitimacy-list">
          <div class="legitimacy-item"><span class="legitimacy-icon">📄</span>La ejecución de un contrato o solicitud previa de servicios.</div>
          <div class="legitimacy-item"><span class="legitimacy-icon">✅</span>El consentimiento libre, específico e informado del usuario.</div>
          <div class="legitimacy-item"><span class="legitimacy-icon">⚖️</span>El cumplimiento de obligaciones legales aplicables a Essentia Lux Aesthetic Medicine.</div>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">5.</span>
        <span class="section-text">Destinatarios</span>
      </h2>
      <div class="section-content">
        <div class="info-box">
          <span class="info-icon">🔐</span>
          <p>Los datos no se cederán a terceros, salvo obligación legal o cuando sea necesario para la prestación del servicio (por ejemplo, laboratorios, plataformas de mensajería segura o proveedores técnicos).</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">6.</span>
        <span class="section-text">Derechos de los usuarios</span>
      </h2>
      <div class="section-content">
        <p>Podrás ejercer tus derechos enviando una solicitud a <span class="contact-email">info@essluxam.com</span> o por escrito a la dirección indicada en el punto 1:</p>
        
        <div class="rights-container">
          <div class="rights-list">
            <span class="right-item">🔍 Acceso</span>
            <span class="right-item">✏️ Rectificación</span>
            <span class="right-item">🗑️ Supresión</span>
            <span class="right-item">🚫 Oposición</span>
            <span class="right-item">⏸️ Limitación</span>
            <span class="right-item">📦 Portabilidad</span>
          </div>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">7.</span>
        <span class="section-text">Seguridad de la información</span>
      </h2>
      <div class="section-content">
        <div class="security-box">
          <span class="info-icon">🛡️</span>
          <p>Essentia Lux Aesthetic Medicine adopta medidas técnicas y organizativas para garantizar la confidencialidad, integridad y disponibilidad de los datos personales, conforme al Reglamento (UE) 2016/679.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">8.</span>
        <span class="section-text">Propiedad intelectual e industrial</span>
      </h2>
      <div class="section-content">
        <p>Los contenidos, imágenes, logotipos, textos y material presente en esta web son propiedad de Essentia Lux Aesthetic Medicine o se utilizan con autorización, quedando prohibida su reproducción sin permiso expreso.</p>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">9.</span>
        <span class="section-text">Comunicaciones comerciales</span>
      </h2>
      <div class="section-content">
        <div class="marketing-box">
          <span class="info-icon">📱</span>
          <p>Únicamente se enviarán comunicaciones comerciales cuando exista base legal para ello (consentimiento o relación contractual previa). Podrás darte de baja en cualquier momento siguiendo las indicaciones incluidas en cada mensaje.</p>
        </div>
      </div>
    </section>
  </div>

  <style>
    .legal-document {
      max-width: 800px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      color: #2c3e50;
      background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .document-header {
      background: linear-gradient(135deg, #AF7E44 0%, #6A806C 100%);
      color: white;
      padding: 30px 25px;
      text-align: center;
      position: relative;
    }

    .document-title {
      font-size: 2.2rem;
      margin: 0 0 12px 0;
      font-weight: 700;
    }

    .update-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .content-wrapper {
      padding: 20px;
    }

    .legal-section {
      margin-bottom: 12px;
      background: white;
      border-radius: 10px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.02);
      transition: all 0.2s ease;
    }

    .legal-section:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transform: translateY(-1px);
    }

    .section-title {
      display: flex;
      align-items: center;
      margin: 0 0 10px 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .section-number {
      background: linear-gradient(135deg, #AF7E44, #6A806C);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-right: 10px;
      flex-shrink: 0;
      font-size: 0.8rem;
    }

    .section-content {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.4;
    }

    .section-content p {
      margin-bottom: 8px;
    }

    .section-content p:last-child {
      margin-bottom: 0;
    }

    .intro-text {
      margin-bottom: 10px;
      font-style: italic;
      color: #666;
      font-size: 0.85rem;
    }

    .website-link {
      color: #6A806C;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid transparent;
      transition: border-bottom 0.2s ease;
    }

    .website-link:hover {
      border-bottom: 1px solid #6A806C;
    }

    .purposes-list, .legitimacy-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .purpose-item, .legitimacy-item {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: #2c3e50;
    }

    .purpose-icon, .legitimacy-icon {
      font-size: 1rem;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .rights-container {
      margin-top: 8px;
    }

    .rights-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }

    .right-item {
      padding: 4px 10px;
      background: linear-gradient(135deg, rgba(175, 126, 68, 0.08), rgba(175, 126, 68, 0.04));
      border-radius: 15px;
      font-weight: 600;
      color: #AF7E44;
      font-size: 0.8rem;
      transition: all 0.2s ease;
      cursor: default;
    }

    .right-item:hover {
      transform: scale(1.02);
      box-shadow: 0 2px 6px rgba(175, 126, 68, 0.12);
    }

    .highlight-box {
      background: linear-gradient(135deg, rgba(175, 126, 68, 0.08), rgba(175, 126, 68, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #AF7E44;
    }

    .info-box {
      background: linear-gradient(135deg, rgba(106, 128, 108, 0.08), rgba(106, 128, 108, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #6A806C;
      color: #495057;
      display: flex;
      align-items: flex-start;
    }

    .security-box {
      background: linear-gradient(135deg, rgba(40, 167, 69, 0.08), rgba(40, 167, 69, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #28a745;
      color: #155724;
      display: flex;
      align-items: flex-start;
    }

    .marketing-box {
      background: linear-gradient(135deg, rgba(255, 193, 7, 0.08), rgba(255, 193, 7, 0.04));
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #ffc107;
      color: #856404;
      display: flex;
      align-items: flex-start;
    }

    .info-icon {
      font-size: 1.2rem;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .contact-email {
      background: linear-gradient(135deg, #AF7E44, #6A806C);
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .legal-document {
        margin: 8px;
        border-radius: 12px;
      }
      
      .document-header {
        padding: 25px 20px;
      }
      
      .document-title {
        font-size: 1.8rem;
      }
      
      .content-wrapper {
        padding: 15px;
      }
      
      .legal-section {
        padding: 14px;
        margin-bottom: 10px;
      }
      
      .section-title {
        font-size: 1.1rem;
      }
      
      .section-number {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
      
      .rights-list {
        gap: 6px;
      }
      
      .right-item {
        font-size: 0.75rem;
        padding: 3px 8px;
      }
    }
  </style>
</div>
`;

export const politicaCookies = `
<div class="legal-document">
  <div class="document-header">
    <h1 class="document-title">🍪 Política de Cookies</h1>
    <div class="last-updated">
      <span class="update-badge">Última actualización: 14/08/2025</span>
    </div>
  </div>

  <div class="content-wrapper">
    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">1.</span>
        <span class="section-text">Introducción</span>
      </h2>
      <div class="section-content">
        <div class="intro-banner">
          <p>En <strong>Essentia Lux Aesthetic Medicine</strong> utilizamos cookies con el objetivo de garantizar el correcto funcionamiento de nuestro sitio web <a href="https://www.essluxam.com/" target="_blank" class="website-link">https://www.essluxam.com/</a> y mejorar la experiencia de nuestros usuarios.</p>
          <p>En esta política explicamos qué son las cookies, qué tipos utilizamos y cómo puedes gestionarlas.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">2.</span>
        <span class="section-text">¿Qué son las cookies?</span>
      </h2>
      <div class="section-content">
        <div class="definition-box">
          <div class="cookie-icon">🍪</div>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas ciertas páginas web. Sirven para reconocer tu navegador, recordar tus preferencias o recopilar información estadística sobre tu navegación.</p>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">3.</span>
        <span class="section-text">Tipos de cookies que utilizamos</span>
      </h2>
      <div class="section-content">
        <div class="cookies-grid">
          <div class="cookie-type">
            <div class="cookie-type-header">
              <span class="cookie-type-icon">⚙️</span>
              <h3>Cookies técnicas</h3>
            </div>
            <p>Necesarias para el funcionamiento básico del sitio, como la navegación, el control de sesión o el acceso a áreas seguras.</p>
          </div>
          
          <div class="cookie-type">
            <div class="cookie-type-header">
              <span class="cookie-type-icon">🎨</span>
              <h3>Cookies de personalización</h3>
            </div>
            <p>Permiten recordar tus preferencias, como el idioma o la configuración de la interfaz.</p>
          </div>
          
          <div class="cookie-type">
            <div class="cookie-type-header">
              <span class="cookie-type-icon">📊</span>
              <h3>Cookies de análisis</h3>
            </div>
            <p>Nos ayudan a entender cómo interactúan los usuarios con el sitio para mejorar su funcionamiento y contenidos.</p>
          </div>
          
          <div class="cookie-type">
            <div class="cookie-type-header">
              <span class="cookie-type-icon">📢</span>
              <h3>Cookies publicitarias</h3>
            </div>
            <p>Gestionan de forma eficiente los espacios publicitarios.</p>
          </div>
          
          <div class="cookie-type">
            <div class="cookie-type-header">
              <span class="cookie-type-icon">🎯</span>
              <h3>Cookies de publicidad comportamental</h3>
            </div>
            <p>Muestran anuncios adaptados a tus intereses según tus hábitos de navegación.</p>
          </div>
          
          <div class="cookie-type">
            <div class="cookie-type-header">
              <span class="cookie-type-icon">📱</span>
              <h3>Cookies de redes sociales</h3>
            </div>
            <p>Facilitan la interacción con contenido en plataformas como Facebook, Instagram o YouTube.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">4.</span>
        <span class="section-text">Duración de las cookies</span>
      </h2>
      <div class="section-content">
        <p class="intro-text">Según su permanencia, las cookies pueden ser:</p>
        <div class="duration-grid">
          <div class="duration-item">
            <div class="duration-icon">⏱️</div>
            <div class="duration-content">
              <h4>De sesión</h4>
              <p>Se eliminan automáticamente al cerrar el navegador.</p>
            </div>
          </div>
          <div class="duration-item">
            <div class="duration-icon">📅</div>
            <div class="duration-content">
              <h4>Persistentes</h4>
              <p>Permanecen en tu dispositivo durante un tiempo determinado o hasta que las elimines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">5.</span>
        <span class="section-text">Gestión y eliminación de cookies</span>
      </h2>
      <div class="section-content">
        <div class="management-info">
          <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu dispositivo mediante la configuración de tu navegador. Ten en cuenta que desactivar ciertas cookies podría afectar al funcionamiento del sitio.</p>
        </div>
        <div class="browsers-grid">
          <a href="http://windows.microsoft.com/es-es/windows-vista/Block-or-allow-cookies" target="_blank" class="browser-link">
            <div class="browser-icon">🌐</div>
            <span>Internet Explorer / Edge</span>
          </a>
          <a href="http://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-sus-preferencia" target="_blank" class="browser-link">
            <div class="browser-icon">🦊</div>
            <span>Mozilla Firefox</span>
          </a>
          <a href="https://support.google.com/accounts/answer/61416?hl=es" target="_blank" class="browser-link">
            <div class="browser-icon">🌈</div>
            <span>Google Chrome</span>
          </a>
          <a href="http://safari.helpmax.net/es/privacidad-y-seguridad/como-gestionar-las-cookies/" target="_blank" class="browser-link">
            <div class="browser-icon">🧭</div>
            <span>Safari</span>
          </a>
          <a href="http://help.opera.com/Linux/10.60/es-ES/cookies.html" target="_blank" class="browser-link">
            <div class="browser-icon">🎭</div>
            <span>Opera</span>
          </a>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">6.</span>
        <span class="section-text">Herramientas adicionales</span>
      </h2>
      <div class="section-content">
        <p>Existen herramientas externas que permiten gestionar el almacenamiento de cookies:</p>
        <div class="tools-grid">
          <a href="https://www.ghostery.com/" target="_blank" class="tool-link">
            <div class="tool-icon">👻</div>
            <div class="tool-content">
              <h4>Ghostery</h4>
              <p>Bloqueador de rastreadores</p>
            </div>
          </a>
          <a href="https://www.youronlinechoices.com/es/" target="_blank" class="tool-link">
            <div class="tool-icon">🎛️</div>
            <div class="tool-content">
              <h4>Your Online Choices</h4>
              <p>Control de publicidad comportamental</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="legal-section">
      <h2 class="section-title">
        <span class="section-number">7.</span>
        <span class="section-text">Aceptación de la Política de Cookies</span>
      </h2>
      <div class="section-content">
        <div class="acceptance-info">
          <p>Al acceder a nuestro sitio web, se mostrará un aviso que te permitirá:</p>
          <div class="acceptance-options">
            <div class="option-item">
              <div class="option-icon">✅</div>
              <div class="option-content">
                <h4>Aceptar las cookies</h4>
                <p>No volverás a ver el aviso durante la sesión.</p>
              </div>
            </div>
            <div class="option-item">
              <div class="option-icon">⚙️</div>
              <div class="option-content">
                <h4>Configurar las cookies</h4>
                <p>Podrás modificarlas o rechazarlas según tus preferencias.</p>
              </div>
            </div>
            <div class="option-item">
              <div class="option-icon">❌</div>
              <div class="option-content">
                <h4>Cerrar el aviso</h4>
                <p>Se ocultará el mensaje, pero mantendremos tu configuración previa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <style>
    .legal-document {
      max-width: 800px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      color: #2c3e50;
      background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .document-header {
      background: linear-gradient(135deg, #AF7E44 0%, #6A806C 100%);
      color: white;
      padding: 30px 25px;
      text-align: center;
      position: relative;
    }

    .document-title {
      font-size: 2.2rem;
      margin: 0 0 12px 0;
      font-weight: 700;
    }

    .update-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .content-wrapper {
      padding: 25px 20px;
    }

    .legal-section {
      margin-bottom: 20px;
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.03);
      transition: all 0.2s ease;
    }

    .legal-section:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
    }

    .section-title {
      display: flex;
      align-items: center;
      margin: 0 0 15px 0;
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .section-number {
      background: linear-gradient(135deg, #AF7E44, #6A806C);
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-right: 12px;
      flex-shrink: 0;
      font-size: 0.9rem;
    }

    .section-content {
      font-size: 0.95rem;
      color: #555;
      line-height: 1.5;
    }

    .intro-banner {
      background: linear-gradient(135deg, rgba(175, 126, 68, 0.1), rgba(175, 126, 68, 0.05));
      padding: 18px;
      border-radius: 10px;
      border-left: 4px solid #AF7E44;
    }

    .website-link {
      color: #6A806C;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid transparent;
      transition: border-bottom 0.2s ease;
    }

    .website-link:hover {
      border-bottom: 1px solid #6A806C;
    }

    .definition-box {
      display: flex;
      align-items: flex-start;
      background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05));
      padding: 18px;
      border-radius: 10px;
      border-left: 4px solid #ffc107;
    }

    .cookie-icon {
      font-size: 2.5rem;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .cookies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 15px;
    }

    .cookie-type {
      background: linear-gradient(135deg, #f8f9fa, #f1f3f4);
      padding: 16px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;
    }

    .cookie-type:hover {
      border-color: #AF7E44;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(175, 126, 68, 0.1);
    }

    .cookie-type-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    .cookie-type-icon {
      font-size: 1.2rem;
      margin-right: 8px;
    }

    .cookie-type h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .cookie-type p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .intro-text {
      margin-bottom: 15px;
      font-style: italic;
      color: #666;
      font-size: 0.9rem;
    }

    .duration-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .duration-item {
      display: flex;
      align-items: flex-start;
      background: linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(40, 167, 69, 0.05));
      padding: 16px;
      border-radius: 10px;
      border-left: 4px solid #28a745;
    }

    .duration-icon {
      font-size: 1.5rem;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .duration-content h4 {
      margin: 0 0 4px 0;
      font-weight: 600;
      color: #155724;
      font-size: 1rem;
    }

    .duration-content p {
      margin: 0;
      color: #2e7d32;
      font-size: 0.9rem;
    }

    .management-info {
      background: linear-gradient(135deg, rgba(106, 128, 108, 0.1), rgba(106, 128, 108, 0.05));
      padding: 18px;
      border-radius: 10px;
      border-left: 4px solid #6A806C;
      margin-bottom: 15px;
      color: #495057;
    }

    .browsers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    }

    .browser-link {
      display: flex;
      align-items: center;
      padding: 12px;
      background: white;
      border-radius: 8px;
      text-decoration: none;
      color: #2c3e50;
      font-weight: 500;
      border: 1px solid #e9ecef;
      transition: all 0.2s ease;
      font-size: 0.9rem;
    }

    .browser-link:hover {
      border-color: #AF7E44;
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(175, 126, 68, 0.15);
    }

    .browser-icon {
      font-size: 1.2rem;
      margin-right: 8px;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .tool-link {
      display: flex;
      align-items: center;
      padding: 16px;
      background: white;
      border-radius: 10px;
      text-decoration: none;
      color: #2c3e50;
      border: 1px solid #e9ecef;
      transition: all 0.2s ease;
    }

    .tool-link:hover {
      border-color: #6A806C;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(106, 128, 108, 0.12);
    }

    .tool-icon {
      font-size: 1.5rem;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .tool-content h4 {
      margin: 0 0 4px 0;
      font-weight: 600;
      color: #2c3e50;
      font-size: 1rem;
    }

    .tool-content p {
      margin: 0;
      color: #666;
      font-size: 0.85rem;
    }

    .acceptance-info {
      background: linear-gradient(135deg, rgba(175, 126, 68, 0.1), rgba(175, 126, 68, 0.05));
      padding: 18px;
      border-radius: 10px;
      border-left: 4px solid #AF7E44;
    }

    .acceptance-options {
      margin-top: 15px;
      display: grid;
      gap: 12px;
    }

    .option-item {
      display: flex;
      align-items: flex-start;
      background: white;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid rgba(175, 126, 68, 0.1);
    }

    .option-icon {
      font-size: 1.2rem;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .option-content h4 {
      margin: 0 0 4px 0;
      font-weight: 600;
      color: #AF7E44;
      font-size: 1rem;
    }

    .option-content p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .legal-document {
        margin: 8px;
        border-radius: 12px;
      }
      
      .document-header {
        padding: 25px 20px;
      }
      
      .document-title {
        font-size: 1.8rem;
      }
      
      .content-wrapper {
        padding: 15px;
      }
      
      .legal-section {
        padding: 16px;
        margin-bottom: 15px;
      }
      
      .section-title {
        font-size: 1.2rem;
      }
      
      .cookies-grid {
        grid-template-columns: 1fr;
      }
      
      .duration-grid, .browsers-grid, .tools-grid {
        grid-template-columns: 1fr;
      }
      
      .cookie-type, .duration-item, .browser-link, .tool-link, .option-item {
        padding: 12px;
      }
    }
  </style>
</div>
`;
