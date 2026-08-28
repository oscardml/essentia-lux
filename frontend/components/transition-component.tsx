"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion-transitions";

export type MotionTransitionProps = {
  children: React.ReactNode;
  className?: string;
  position: "right" | "bottom";
};

// Antes este componente devolvía null en el servidor, así que todo lo que
// envolvía (incluida la portada entera) llegaba vacío a Google y a cualquier
// cliente sin JavaScript. framer-motion renderiza bien en servidor, así que
// se deja que pinte el contenido y solo la animación ocurra en el navegador.
export function MotionTransition(props: MotionTransitionProps) {
  const { children, className, position } = props;

  return (
    <motion.div
      variants={fadeIn(position)}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={className}
    >
      {children}
    </motion.div>
  );
}
