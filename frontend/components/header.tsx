"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthNavItem from "@/components/AuthNavItem";
import CartNavItem from "@/components/CartNavItem";
import { STORE_ENABLED } from "@/config/features";

const fadeIn = (position: "right" | "bottom") => {
  return {
    hidden: {
      y: position === "bottom" ? 80 : 0,
      x: position === "right" ? 80 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: 0.3,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

const Header = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  // Para móvil/tablet: Header fijo SIN AnimatePresence - SIEMPRE VISIBLE
  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 9999,
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
        }}
      >
        <header 
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: 'rgba(249, 250, 251, 0.98)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            boxShadow: '0 4px 20px -4px rgba(31, 41, 55, 0.1)',
          }}
        >
        <div 
          style={{
            width: '100%',
            padding: '12px 16px',
          }}
        >
          <div 
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            
            {/* Logo responsivo */}
            <Link href="/" 
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Image
                  src="/icono.png"
                  alt="Icono Essentia Lux"
                  width={50}
                  height={50}
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'contain',
                    transition: 'transform 0.3s',
                  }}
                  priority={true}
                  quality={90}
                  sizes="50px"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span 
                  style={{
                    color: '#AF7E44',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Essentia Lux
                </span>
                <span 
                  style={{
                    color: '#6A806C',
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '1.2',
                  }}
                >
                  Aesthetic Medicine
                </span>
              </div>
            </Link>

            {/* Cuenta y carrito. Las redes sociales viven ahora en el footer:
                la cabecera se reserva para lo accionable del propio sitio. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              {STORE_ENABLED && <CartNavItem />}
              {STORE_ENABLED && <AuthNavItem />}
            </div>
          </div>
        </div>
      </header>
    </div>
    );
  }

  // Para desktop: Header con animación
  return (
    <AnimatePresence mode="wait">
      <motion.header
        key={pathname}
        variants={fadeIn("bottom")}
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(249, 250, 251, 0.98)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
          boxShadow: '0 4px 20px -4px rgba(31, 41, 55, 0.1)',
        }}
      >
        <div className="w-full py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Logo responsivo mejorado con tamaños más grandes */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 sm:gap-4 group">
              <div className="relative">
                <Image
                  src="/icono.png"
                  alt="Icono Essentia Lux"
                  width={70}
                  height={70}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                  priority={true}
                  quality={90}
                  sizes="70px"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-primary font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary/80">
                  Essentia Lux
                </span>
                <span className="text-secondary font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-tight transition-colors duration-300 group-hover:text-secondary/80">
                  Aesthetic Medicine
                </span>
              </div>
            </Link>

            {/* Cuenta y carrito. Las redes sociales viven ahora en el footer:
                la cabecera se reserva para lo accionable del propio sitio. */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {STORE_ENABLED && <CartNavItem />}
              {STORE_ENABLED && <AuthNavItem />}
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
