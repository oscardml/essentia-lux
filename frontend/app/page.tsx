'use client'
import Link from 'next/link'
import { introductionData } from '@/data'
import { MotionTransition } from '@/components/transition-component'
import PanelPromociones from '@/components/PanelPromociones'

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden pb-16 pt-24 lg:pt-24 bg-white">
      
      {/* Fondo blanco con gradientes sutiles */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-primary/5"></div>
      </div>

      {/* Elementos decorativos flotantes minimalistas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos flotantes animados con dorado y gris */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-gray-100/20 rounded-full blur-xl animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-gray-100/20 to-primary/10 rounded-full blur-xl animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-primary/8 to-gray-50/15 rounded-full blur-2xl animate-pulse opacity-30" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-gray-100/20 to-primary/10 rounded-full blur-xl animate-pulse opacity-40" style={{animationDelay: '0.5s'}}></div>
        
        
        {/* Formas geométricas sutiles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-primary/20 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-gray-400/30 rounded-full animate-ping opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-ping opacity-30" style={{animationDelay: '2s'}}></div>
      </div>

      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center space-y-8 sm:space-y-12 md:space-y-16 px-4 sm:px-6 md:px-8">
        
        {/* Header con logo personalizado */}
        <MotionTransition
          position="bottom"
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#AF7E44] to-[#6A806C] rounded-full shadow-lg shadow-[#AF7E44]/25 mb-4 p-2">
            <img 
              src="/icono.png" 
              alt="Essentia Lux Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain filter brightness-0 invert"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'block';
                }
              }}
            />
            {/* SVG de respaldo */}
            <svg 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 text-white hidden" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-[#6A806C] via-[#AF7E44] to-[#6A806C] bg-clip-text text-transparent leading-tight">
              Essentia Lux 10
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#AF7E44] via-[#6A806C] to-[#AF7E44] bg-clip-text text-transparent leading-tight mt-1">
              Aesthetic Medicine
            </h2>
          </div>

          <p className="text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl max-w-md mx-auto font-medium">
            Tu experiencia de belleza personalizada
          </p>
        </MotionTransition>

        {/* Presentación del centro */}
        <MotionTransition
          position="bottom"
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl"
        >
          <div className="relative group">
            {/* Glow effect sutil */}
            <div className="absolute -inset-6 bg-gradient-to-r from-primary via-gray-300 to-primary rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-1000"></div>

            <div className="relative bg-white shadow-elegant-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-gray-200 overflow-hidden">
              {/* Decoración interna minimalista */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

              <div className="relative z-10 space-y-6">
                <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed font-medium tracking-wide text-pretty">
                  {introductionData.descripcion}
                </p>

                <Link
                  href="/sobre-nosotros"
                  className="group/link inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  Conoce nuestro centro
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </MotionTransition>

        {/* Panel de promociones animado */}
        <MotionTransition position="bottom" className="w-full">
          <PanelPromociones />
        </MotionTransition>

        {/* Floating elements decorativos minimalistas */}
        <div className="hidden lg:block absolute top-1/4 left-8 opacity-30">
          <div className="flex flex-col space-y-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-[#6A806C] rounded-lg rotate-45 shadow-elegant"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-primary rounded-full shadow-md"></div>
            <div className="w-4 h-4 bg-gradient-to-br from-primary to-gray-300 rounded-lg shadow-sm"></div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-1/3 right-8 opacity-30">
          <div className="flex flex-col space-y-4">
            <div className="w-6 h-6 bg-gradient-to-bl from-gray-300 to-primary rounded-full shadow-md"></div>
            <div className="w-8 h-8 bg-gradient-to-bl from-primary to-[#6A806C] rounded-lg -rotate-12 shadow-elegant"></div>
            <div className="w-4 h-4 bg-gradient-to-bl from-gray-300 to-primary rounded-lg shadow-sm"></div>
          </div>
        </div>

      </section>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
