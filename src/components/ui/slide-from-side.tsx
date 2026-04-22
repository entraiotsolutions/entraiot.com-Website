"use client";

import * as React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface SlideFromSideProps {
  children: React.ReactNode;
  side: "left" | "right";
  delay?: number;
  className?: string;
}

export function SlideFromSide({
  children,
  side,
  delay = 0,
  className = "",
}: SlideFromSideProps) {
  const ref = useRef<HTMLDivElement>(null);
  // More lenient viewport detection - trigger earlier and with less visibility needed
  const isInView = useInView(ref, { once: false, amount: 0, margin: "400px" });
  const controls = useAnimation();
  
  // Use a fixed large distance
  const distance = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (isInView) {
      controls.start("visible");
    } else {
      // Reset to hidden when out of view, but with a delay to prevent flickering
      timer = setTimeout(() => {
        controls.start("hidden");
      }, 200);
    }
    
    // Always return a cleanup function
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isInView, controls]);

  // Continuous scroll check for better detection
  useEffect(() => {
    const checkVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isInViewport = rect.top < viewportHeight + 400 && rect.bottom > -400;
        
        if (isInViewport && !isInView) {
          controls.start("visible");
        }
      }
    };
    
    // Check on mount and on scroll
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: side === "left" ? -distance : distance,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            delay: delay,
            ease: [0.16, 1, 0.3, 1] as const, // Smooth ease-out curve
          },
        },
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

