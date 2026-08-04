'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { socialNetworks } from '@/data';

const Footer = () => {
  // Número de teléfono y mensaje predeterminado para WhatsApp
  const whatsappNumber = "34691589789";
  const whatsappMessage = encodeURIComponent(
    "¡Hola! Me interesa conocer más sobre los tratamientos de medicina estética. ¿Podrían proporcionarme información?"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="relative bg-transparent py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Elementos decorativos de fondo más sutiles */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-primary/3 to-transparent rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-tr from-secondary/2 to-transparent rounded-full translate-y-16 sm:translate-y-24 -translate-x-16 sm:-translate-x-24"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Logos de marcas - con fondo más transparente */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h3 className="text-center text-sm sm:text-base font-medium text-gray-500 uppercase tracking-wider mb-6 sm:mb-8">
            Marcas de Confianza
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {[1, 3, 4].map((num) => (
              <div key={num} className="group">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 md:p-8 lg:p-10 group-hover:scale-105 border border-white/20">
                  <Image 
                    src={`/marca${num}.png`} 
                    alt={`Marca ${num}`} 
                    width={200} 
                    height={150} 
                    className="w-20 h-12 sm:w-24 sm:h-16 md:w-32 md:h-24 lg:w-40 lg:h-50 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información principal de la clínica */}
        <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              ESSENTIA LUX
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light tracking-wide">
              Aesthetic Medicine
            </p>
            <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-3 sm:mt-4"></div>
          </div>

          {/* Información de contacto en cards más transparentes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            
            {/* Ubicación */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-white/20">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-white text-base sm:text-lg" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Ubicación</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Centro Medico Lealtad<br />
                C. Lealtad, 12, Esc A 1º Izda<br />
                39002 Santander, Cantabria
              </p>
            </div>

            {/* Teléfono/WhatsApp */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-white/20">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaWhatsapp className="text-white text-base sm:text-lg" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">WhatsApp</h3>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-300 hover:scale-105 transform text-base sm:text-lg"
              >
                +34 691 58 9789
              </a>
            </div>

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-white/20">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-white text-base sm:text-lg" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Email</h3>
              <a 
                href="mailto:info@essluxam.com" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover:scale-105 transform inline-block text-base sm:text-lg"
              >
                info@essluxam.com
              </a>
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center gap-3 mb-8 sm:mb-10">
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Síguenos
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {socialNetworks.map(({ id, name, logo, src }) => (
              <a
                key={id}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visítanos en ${name}`}
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-white/30 text-gray-600 hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-xl sm:text-2xl flex items-center justify-center">
                  {logo}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Línea divisoria más sutil */}
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300/30"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-transparent px-4 sm:px-6">
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Enlaces legales */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <Link 
              href="/aviso-legal" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group text-base sm:text-lg"
            >
              Aviso Legal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/politica-privacidad" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group text-base sm:text-lg"
            >
              Política de Privacidad
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/politica-cookies" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group text-base sm:text-lg"
            >
              Política de Cookies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Créditos finales más transparentes */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-60"></div>
            <p className="text-sm sm:text-base text-gray-500">
              © {new Date().getFullYear()} Essentia Lux Aesthetic Medicine. Todos los derechos reservados.
            </p>
            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse opacity-60"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
