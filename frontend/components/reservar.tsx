"use client";

export default function Reservar() {
  const handleReservarClick = () => {
    window.open('https://www.doctoralia.es/clinicas/essentia-lux-aesthetic-medicine', '_blank');
  };

  return (
    <div className="min-h-screen py-6 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-4">
        
        {/* Contenedor principal con glassmorphism */}
        <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-[#6A806C] via-[#AF7E44] to-[#6A806C] p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Sistema de Reservas Online
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Agenda tu tratamiento de belleza personalizado
            </p>
          </div>

          {/* Contenido principal */}
          <div className="p-6 sm:p-8">
            
            {/* Información de horarios */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 sm:p-5 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-blue-800">Horario de atención</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  Lunes a Viernes de <span className="font-bold text-blue-700">10:00 a 19:00</span>
                </p>
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Sábados y Domingos cerrado
                </p>
              </div>
            </div>

            {/* Botón principal de reservar */}
            <div className="text-center mb-6">
              <div className="mb-3"></div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Haz clic en el botón para acceder a nuestro calendario de citas disponibles
              </p>
              
              <button 
                onClick={handleReservarClick}
                className="w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 3a1 1 0 0 1 2 0v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3ZM5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9H5Zm2 3.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM8 15a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                </svg>
                Reservar cita
              </button>
            </div>

            {/* Información sobre Doctoralia */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-green-800">Reserva Segura con Doctoralia</span>
                </div>
                <p className="text-sm text-gray-700">
                  Te redirigiremos a nuestra página oficial en <strong>Doctoralia</strong> donde podrás:
                </p>
                <ul className="text-xs text-gray-600 mt-2 list-disc list-inside space-y-1">
                  <li>Ver todos nuestros servicios disponibles</li>
                  <li>Seleccionar horarios disponibles en tiempo real</li>
                  <li>Recibir confirmación inmediata por email y SMS</li>
                  <li>Gestionar tus citas de forma segura</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Espacio final */}
        <div className="h-12" />
      </div>
    </div>
  );
}
