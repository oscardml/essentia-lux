'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowRight, FaWhatsapp, FaEuroSign } from "react-icons/fa";
import { useState } from "react";

interface ServicioBoxProps {
  data: {
    file: string;
    title: string;
    description: string;
    price?: string; // Precio opcional
    originalPrice?: string; // Precio original para descuentos (opcional)
  };
}

const ServicioBox = ({ data }: ServicioBoxProps) => {
  const { file, title, description, price, originalPrice } = data;
  const [isHovered, setIsHovered] = useState(false);

  // Mensaje de WhatsApp personalizado para el servicio
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Me interesa obtener más información sobre el servicio de ${title}. ¿Podrían ayudarme?`
  );
  const whatsappLink = `https://wa.me/34691589789?text=${whatsappMessage}`;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Elemento decorativo de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Badge de descuento - Esquina superior izquierda (si hay precio original) */}
      {originalPrice && price && (
        <motion.div 
          className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
        >
          ¡Oferta!
        </motion.div>
      )}

      <div className="relative p-4 sm:p-6 h-full flex flex-col">
        {/* Imagen con efectos */}
        <motion.div 
          className="relative w-full h-[240px] sm:h-[280px] overflow-hidden rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-500"
          layoutId={`image-${title}`}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Imagen */}
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={file}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Badge de precio - Parte inferior izquierda de la imagen */}
          {price && (
            <motion.div 
              className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-90"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              {price.toLowerCase().includes('desde') ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-[9px] sm:text-[10px] font-medium opacity-80 uppercase tracking-wide">
                    Desde
                  </span>
                  <div className="flex items-center gap-0.5">
                    <FaEuroSign className="text-xs sm:text-sm" />
                    <span className="text-base sm:text-lg font-extrabold">
                      {price.toLowerCase().replace('desde', '').trim()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaEuroSign className="text-xs sm:text-sm" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-sm sm:text-base font-extrabold">{price}</span>
                    {originalPrice && (
                      <span className="line-through text-[10px] sm:text-xs opacity-80 -mt-0.5">
                        {originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            style={{ width: '200%' }}
          />
        </motion.div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col">
          {/* Título - más grande en móvil */}
          <motion.h3 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 group-hover:text-secondary transition-colors duration-300 leading-tight"
            layoutId={`title-${title}`}
          >
            {title}
          </motion.h3>

          {/* Descripción - más grande y mejor espaciado */}
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 flex-1 text-justify font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {description}
          </motion.p>

          {/* Línea decorativa */}
          <motion.div 
            className="w-10 sm:w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full mb-4 sm:mb-6 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />

          {/* Botones de acción - mejorados para móvil */}
          <div className="flex flex-col gap-3">
            {/* Botón principal - Reservar Cita */}
            <Link href="/separar-cita" className="w-full">
              <motion.div
                className="w-full bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn text-base sm:text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCalendarAlt className="text-sm sm:text-base group-hover/btn:animate-bounce" />
                <span>Reservar Cita</span>
                <motion.div
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight className="text-sm sm:text-base" />
                </motion.div>
              </motion.div>
            </Link>

            {/* Botón secundario - WhatsApp */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/wa text-base sm:text-lg"
              style={{ backgroundColor: '#6A806C' }}
              whileHover={{ scale: 1.02, backgroundColor: '#5a6f5c' }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="text-lg sm:text-xl group-hover/wa:animate-pulse" />
              <span>Consultar por WhatsApp</span>
            </motion.a>
          </div>
        </div>

        {/* Efectos adicionales */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        />

        {/* Partículas flotantes (opcional) - reducidas en móvil */}
        {isHovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-secondary/40 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  y: [-20, -60],
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ServicioBox;
