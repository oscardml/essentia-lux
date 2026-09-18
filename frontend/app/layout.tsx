import { Urbanist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import type { Metadata } from "next";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.essluxam.com"),
  
  title: {
    default: "Essentia Lux - Medicina Estética en Santander | Tratamientos Faciales y Corporales",
    template: "%s | Essentia Lux"
  },
  description: "Centro de medicina estética en Santander. Tratamientos faciales, corporales y capilares con tecnología avanzada. Rellenos, botox, mesoterapia, peeling y más. ¡Agenda tu cita!",
  keywords: [
    "medicina estética Santander",
    "tratamientos faciales",
    "botox Santander",
    "rellenos faciales",
    "mesoterapia",
    "peeling químico",
    "rejuvenecimiento facial",
    "carboxiterapia",
    "hilos tensores",
    "tratamientos corporales",
    "eliminación de grasa",
    "cavitación",
    "radiofrecuencia",
    "crioterapia",
    "mesoterapia capilar",
    "clínica estética Santander"
  ],
  authors: [{ name: "Essentia Lux" }],
  creator: "Essentia Lux",
  publisher: "Essentia Lux",
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: [
      { url: "/icono.png" },
      { url: "/icono.png", sizes: "32x32", type: "image/png" },
      { url: "/icono.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icono.png",
    apple: [
      { url: "/icono.png" },
      { url: "/icono.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  manifest: "/manifest.json",
  
  openGraph: {
    title: "Essentia Lux - Medicina Estética en Santander",
    description: "Centro de medicina estética con tratamientos faciales, corporales y capilares. Tecnología avanzada y resultados profesionales. ¡Agenda tu valoración!",
    url: "https://www.essluxam.com",
    siteName: "Essentia Lux",
    images: [
      {
        url: "/Logo-essentia-lux.jpeg",
        width: 1200,
        height: 630,
        alt: "Essentia Lux - Centro de Medicina Estética",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Essentia Lux - Medicina Estética en Santander",
    description: "Centro de medicina estética con tratamientos faciales, corporales y capilares. Tecnología avanzada y resultados profesionales.",
    images: ["/Logo-essentia-lux.jpeg"],
  },
  
  verification: {
    google: "_CXIy8zuF_026lUoLOSQLHqeYsmH0pw47Ox2IiQZ1LI",
  },
  
  alternates: {
    canonical: "https://www.essluxam.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className="transition-colors duration-300"
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#DCAB71" />
        
        <meta name="geo.region" content="ES-M" />
        <meta name="geo.placename" content="Santander" />
        <meta name="geo.position" content="40.4168;-3.7038" />
        <meta name="ICBM" content="40.4168, -3.7038" />
        
        <meta name="contact" content="info@essluxam.com" />
        <meta name="author" content="Essentia Lux" />
        
        <meta name="google-site-verification" content="_CXIy8zuF_026lUoLOSQLHqeY6Lnfx29oUE5P8s4LZ8" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "@id": "https://www.essluxam.com",
              "name": "Essentia Lux",
              "description": "Centro de medicina estética especializado en tratamientos faciales, corporales y capilares con tecnología avanzada.",
              "url": "https://www.essluxam.com",
              "telephone": "+34691589789",
              "priceRange": "€€",
              "image": "https://www.essluxam.com/Logo-essentia-lux.jpeg",
              "logo": "https://www.essluxam.com/icono.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Centro Medico Lealtad. C. Lealtad, 12, Esc A 1º Izda, 39002 Santander, Cantabria, España",
                "addressLocality": "Santander",
                "addressRegion": "Cantabria",
                "postalCode": "39006",
                "addressCountry": "ES"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "40.4168",
                "longitude": "-3.7038"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "10:00",
                  "closes": "19:30"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/essentia.lux",
                "https://www.facebook.com/essentialux"
              ],
              "medicalSpecialty": "Aesthetic Medicine",
              "availableService": [
                {
                  "@type": "MedicalProcedure",
                  "name": "Tratamientos Faciales",
                  "description": "Rellenos, botox, mesoterapia, peeling químico"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Tratamientos Corporales",
                  "description": "Cavitación, radiofrecuencia, crioterapia, mesoterapia lipolítica"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Tratamientos Capilares",
                  "description": "Mesoterapia capilar, bioestimulación con PRP"
                }
              ]
            })
          }}
        />
      </head>

      <body
        className={`
          ${urbanist.variable}
          font-urbanist
          antialiased
          transition-colors
          overflow-x-hidden
          text-gray-900
          bg-white
          min-h-screen
        `}
      >
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-NQ2FFYDLSW"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NQ2FFYDLSW');
            `,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="essentia-theme"
        >
          <AuthProvider>
          <CartProvider>
            <Header />
            <Navbar />
            <main
              className="
                min-h-screen
                pt-[140px] sm:pt-[150px] md:pt-40 lg:pt-44 xl:pt-48
                px-3 sm:px-4 md:px-6 lg:px-8
                pb-24
              "
            >
              <div className="w-full max-w-7xl mx-auto">{children}</div>
            </main>
            <Footer />
          </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
