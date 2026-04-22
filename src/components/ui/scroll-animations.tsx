"use client";

import * as React from "react";
import { motion, useInView, useAnimation, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Performance optimization: Only run heavy animations on desktop
const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    
    setShouldReduceMotion(mediaQuery.matches || isMobile);
    
    const handleChange = () => setShouldReduceMotion(mediaQuery.matches || isMobile);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return shouldReduceMotion;
};

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
  once?: boolean;
}

export function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  duration = 0.3,
  direction = "up",
  distance = 50,
  once = true,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : (direction === "up" ? distance : direction === "down" ? -distance : 0),
      x: shouldReduceMotion ? 0 : (direction === "left" ? distance : direction === "right" ? -distance : 0),
      scale: shouldReduceMotion ? 1 : (direction === "scale" ? 0.8 : 1),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.25,
        delay: shouldReduceMotion ? 0 : delay * 0.3, // Strongly cap explicit delays
        ease: "easeOut", // Snappy ease out
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={{ willChange: shouldReduceMotion ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
  once?: boolean;
}

export function ScrollStagger({
  children,
  className = "",
  staggerDelay = 0.05,
  childDelay = 0,
  once = true,
}: ScrollStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: childDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  width?: "fit" | "100%";
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  width = "fit",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  return (
    <div ref={ref} className={className} style={{ width: width === "fit" ? "fit-content" : "100%" }}>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ScrollCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function ScrollCounter({
  from,
  to,
  duration = 2.5,
  className = "",
  suffix = "",
  prefix = "",
}: ScrollCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [current, setCurrent] = useState(from);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isInView) {
      // Stop any existing animation
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      // Ensure we start from 'from' value
      setCurrent(from);
      
      // Start animation on next frame to ensure state update is applied
      frameIdRef.current = requestAnimationFrame(() => {
        controlsRef.current = animate(from, to, {
          duration,
          ease: [0.25, 0.1, 0.25, 1] as const, // Smooth ease-in-out curve for smoother, more natural animation
          onUpdate: (latest) => setCurrent(Math.floor(latest)),
        });
      });
      
      return () => {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        if (controlsRef.current) {
          controlsRef.current.stop();
        }
      };
    } else {
      // Reset to 'from' when not in view
      setCurrent(from);
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span>{current.toLocaleString()}</span>
      {suffix}
    </span>
  );
} 