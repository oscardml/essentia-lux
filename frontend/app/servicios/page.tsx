'use client';

import Link from "next/link";
import ServicioBox from "@/components/ServicioBox";
import AvatarServices from "@/components/avatar-services";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaGift, FaFlask, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { STORE_ENABLED } from "@/config/features";

const servicios = [
  {
    file: "/Valoración diagnostica.jpg",
    title: "Valoración diagnóstica",
    description: "Se realiza un análisis integral de la piel y las condiciones médicas, evaluamos las expectativas de los resultados y ofrecemos diferentes opciones de tratamiento.(Gratuito si se realiza algún procedimiento)",
    price: "40"
  },
  {
    file: "/Valoración estetica y asesoramiento dermocosmeticos.JPG",
    title: "Valoración estética y asesoramiento dermocosméticos",
    description: "Se realiza un análisis integral de la piel y de las condiciones médicas, evaluamos las expectativas de los resultados y ofrecemos diferentes opciones de tratamiento. Incluye una valoración diagnóstica enfocada en las necesidades específicas de tu piel, tanto faciales como corporales, y el asesoramiento de un tratamiento dermocosmético para el cuidado en casa, que el paciente se aplicará de forma personalizada para mejorar la calidad y el estado de la piel.",
    price: "70"
  },
  {
    file: "/Peeling químico facial.PNG",
    title: "Peeling químico facial",
    description: "El tratamiento se adapta a las características y tipo de tu piel, utilizando un producto cuidadosamente seleccionado que provoca una suave y controlada renovación. Este proceso estimula la regeneración celular y activa la producción natural de colágeno, revelando una piel visiblemente más suave, luminosa y uniforme.",
    price: ""
  },
  {
    file: "/Mesoterapia facial, cuello, escote y manos.jpeg",
    title: "Mesoterapia facial, cuello, escote y manos",
    description: "Microinyecciones de vitaminas, minerales y ácido hialurónico para revitalizar la piel, mejorar su luminosidad y firmeza.",
    price: ""
  },
  {
    file: "/Mesoterapia capilar.png",
    title: "Mesoterapia capilar",
    description: "Su objetivo principal es nutrir y revitalizar los folículos pilosos, mejorar la microcirculación sanguínea local, estimular el crecimiento del cabello y reducir su caída.",
    price: ""
  },
  {
    file: "/Mesoterapia lipolítica.png",
    title: "Mesoterapia lipolítica",
    description: "Aplicación de microinyecciones en la piel con sustancias específicas (como vitaminas, aminoácidos, enzimas o compuestos lipolíticos) que favorecen la disolución de la grasa localizada y mejoran la microcirculación.",
    price: ""
  },
  {
    file: "/Carboxiterapia facial.jpg",
    title: "Carboxiterapia facial",
    description: "Estimula la microcirculación sanguínea, favorece la oxigenación de los tejidos, activa la producción de colágeno y elastina, y mejora la textura, luminosidad y firmeza cutánea.",
    price: ""
  },
  {
    file: "/Carboxiterapia corporal.jpg",
    title: "Carboxiterapia corporal",
    description: "Este procedimiento mejora la microcirculación sanguínea, estimula la oxigenación de los tejidos y favorece la eliminación de la grasa localizada. Además, contribuye a reducir la celulitis, mejorar la flacidez y la textura de la piel, logrando una silueta más firme y uniforme sin necesidad de cirugía.",
    price: ""
  },
  {
    file: "/Plasma rico en plaquetas facial y capilar.jpg",
    title: "Bioestimulación cutánea autóloga facial y capilar",
    description: "Es un procedimiento seguro, natural y mínimamente invasivo, que aprovecha los propios recursos del cuerpo para rejuvenecer y revitalizar la piel y el cabello.",
    price: ""
  },
  {
    file: "/Relleno de labios.PNG",
    title: "Relleno de labios",
    description: "Procedimiento con ácido hialurónico con el fin de aumentar su volumen, mejorar su hidratación, definir su contorno y corregir asimetrías.",
    price: ""
  },
  {
    file: "/Rellenos dérmicos.jpg",
    title: "Relleno facial",
    description: "Tratamiento con ácido hialurónico o hidroxiapatita cálcica para restaurar volumen facial, suavizar arrugas y mejorar el contorno, logrando un rejuvenecimiento natural y duradero.",
    price: ""
  },
  {
    file: "/Hilos tensores.jpg",
    title: "Hilos tensores",
    description: "Procedimiento no quirúrgico que estimula la producción de colágeno y tensa la piel, logrando un efecto lifting natural, inmediato y progresivo.",
    price: ""
  },
  {
    file: "/Rejuvenecimiento tercio superior y escote con neuromodulador.jpg",
    title: "Rejuvenecimiento tercio superior y escote con neuromodulador",
    description: "Relaja de forma precisa los músculos responsables de las líneas de expresión, logrando un rostro más fresco y natural. Resultados visibles en pocos días, previniendo la formación de arrugas permanentes.",
    price: ""
  },
  {
    file: "/Infiltración de toxina botulínica para bruxismo.jpg",
    title: "Infiltración de toxina botulínica para bruxismo",
    description: "El neuromodulador se infiltra en los músculos maseteros para disminuir la tensión y el desgaste dental, aliviar el dolor y estilizar el tercio inferior del rostro.",
    price: ""
  },
  {
    file: "/Infiltración de toxina botulínica para hiperhidrosis.jpg",
    title: "Infiltración de toxina botulínica para hiperhidrosis",
    description: "El neuromodulador se aplica en axilas, manos, pies u otras zonas con sudoración excesiva para bloquear de forma temporal la actividad de las glándulas sudoríparas, logrando una reducción significativa de la sudoración.",
    price: ""
  },
  {
    file: "/Rinomodelación.png",
    title: "Rinomodelación",
    description: "Este tratamiento se utiliza para armonizar el perfil nasal, disimular irregularidades, levantar ligeramente la punta o suavizar el dorso, logrando un aspecto más equilibrado y natural del rostro.",
    price: ""
  },
  {
    file: "/Crioterapia.jpg",
    title: "Crioterapia",
    description: "Es un procedimiento seguro, no invasivo, que permite mejorar la silueta corporal, textura cutánea y firmeza sin cirugía.",
    price: ""
  },
  {
    file: "/Radiofrecuencia facial.jpeg",
    title: "Radiofrecuencia Facial",
    description: "Su objetivo principal es estimular la producción de colágeno y elastina, mejorar la elasticidad y firmeza de la piel, y reducir arrugas, flacidez y signos de envejecimiento.",
    price: ""
  },
  {
    file: "/Radiofrecuencia Corporal.jpg",
    title: "Radiofrecuencia Corporal",
    description: "Es un procedimiento seguro, indoloro y no requiere tiempo de recuperación, ideal para modelar y rejuvenecer el cuerpo sin cirugía.",
    price: ""
  },
  {
    file: "/Cavitación.jpg",
    title: "Cavitación",
    description: "La cavitación es un tratamiento no invasivo que ayuda a eliminar la grasa localizada mediante ondas ultrasónicas. Estas ondas actúan sobre las células de grasa, facilitando que el cuerpo las elimine de forma natural. Es un procedimiento seguro, indoloro y sin cirugía, ideal para mejorar la silueta y el contorno corporal de manera rápida y eficaz.",
    price: ""
  },
  {
    file: "/Lipoláser.jpg",
    title: "Lipoláser",
    description: "El LipoLaser es un tratamiento no invasivo que ayuda a eliminar la grasa localizada y remodelar la silueta corporal.",
    price: ""
  },
];

const combos = [
  {
    file: "/Sculpt Lux.png",
    title: "Sculpt Lux",
    description: "1 Sesión de crioterapia, 2 sesiones radiofrecuencia corporal, 1 cavitación, protocolo lipolítico, 10 sesiones de mesoterapia, asesoramiento personalizado y seguimientos.",
    price: ""
  },
  {
    file: "/Renova Lux capilar.jpg",
    title: "Renova Lux capilar",
    description: "6 Sesiones de Mesoterapia capilar, 2 sesiones PRP capilar, asesoramiento para tratamiento oral y tópico.",
    price: ""
  },
  {
    file: "/Carboxiterapia corporal.jpg",
    title: "pack carboxi glow",
    description: "5 Sesiones de Carboxiterapia facial, asesoramiento personalizado y fórmula magistral.",
    price: ""
  },
  {
    file: "/Regenera Lux.jpg",
    title: "Regenera Lux",
    description: "PRP facial, Peeling facial, asesoramiento personalizado de fórmula magistral.",
    price: ""
  },
  {
    file: "/Essentia Smile.png",
    title: "Essentia Smile",
    description: "Relleno labial 1 vial, neuromodulador 1 vial.",
    price: ""
  },
  {
    file: "/Essentia Fresh.jpg",
    title: "Essentia Fresh",
    description: "1 Sesión de Mesoterapia facial (Skin firm ang lift), 1 sesión con Neuromodulador, asesoramiento personalizado de fórmula magistral.",
    price: ""
  },
  {
    file: "/Radiofrecuencia facial.jpeg",
    title: "Ritual Lux Lift",
    description: "5 Sesiones de Radiofrecuencia facial.",
    price: ""
  },
  {
    file: "/Cavitación.jpg",
    title: "Método Reductor Essentia",
    description: "10 Sesiones de Cavitación.",
    price: ""
  },
  {
    file: "/Lipoláser.jpg",
    title: "Tratamiento Lux Shape",
    description: "10 Sesiones de Lipolaser.",
    price: ""
  },
  {
    file: "/Carboxiterapia facial.jpg",
    title: "Carboxi Eyes",
    description: "5 Sesiones de Carboxiterapia palpebral.",
    price: ""
  }
];
  

export default function ServiciosPage() {
  const [seccionActiva, setSeccionActiva] = useState("servicios");

  return (
    <div className="relative w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      
      {/* Avatar solo visible en pantallas grandes */}
      <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-10">
        <AvatarServices />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Título responsivo */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-secondary">
            Nuestros Servicios
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4 mb-6 sm:mb-8">
            Tratamientos personalizados para realzar tu belleza natural y cuidar tu piel.
          </p>

          {/* Botones de navegación - 3 botones */}
          <div className="flex justify-center">
            <div className="bg-white/70 backdrop-blur-md p-1 rounded-2xl shadow-lg border border-white/20 flex flex-col sm:flex-row gap-1 sm:gap-0">
              <button
                onClick={() => setSeccionActiva('servicios')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base ${
                  seccionActiva === 'servicios'
                    ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <FaCalendarAlt className="text-xs sm:text-sm" />
                <span className="whitespace-nowrap">Servicios disponibles</span>
              </button>
              <button
                onClick={() => setSeccionActiva('combos')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base ${
                  seccionActiva === 'combos'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <FaGift className="text-xs sm:text-sm" />
                <span className="whitespace-nowrap">Paquetes Especiales</span>
              </button>
            </div>
          </div>

          {/* Los productos ya no viven aquí: tienen su propia tienda con
              carrito y pago. Dejamos un acceso claro para quien los busque. */}
          {STORE_ENABLED && (
            <div className="mt-6 flex justify-center">
              <Link
                href="/tienda"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-5 py-2.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary hover:shadow-md"
              >
                <FaFlask className="text-xs" />
                <span>¿Buscas nuestros productos? Visita la tienda</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* SECCIÓN: SERVICIOS */}
        {seccionActiva === 'servicios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {servicios.map((servicio, index) => (
                <ServicioBox key={index} data={servicio} />
              ))}
            </div>

            {/* Línea divisora decorativa */}
            <div className="my-8 sm:my-12 md:my-16 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-3xl mx-auto"></div>
            </div>
          </motion.div>
        )}

        {/* SECCIÓN: COMBOS */}
        {seccionActiva === 'combos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Descripción de combos */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-purple-600 font-medium text-base sm:text-lg md:text-xl">
                ✨ ¡Ahorra tiempo y dinero combinando tratamientos! ✨
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Programas diseñados para resultados óptimos con descuentos especiales
              </p>
            </div>

            {/* Grid de combos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {combos.map((combo, index) => (
                <ServicioBox key={index} data={combo} />
              ))}
            </div>

            {/* Línea divisora decorativa */}
            <div className="my-8 sm:my-12 md:my-16 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-3xl mx-auto"></div>
            </div>
          </motion.div>
        )}


        {/* Espacio final */}
        <div className="h-12 sm:h-16 md:h-24" />
      </div>

    </div>
  );
}
