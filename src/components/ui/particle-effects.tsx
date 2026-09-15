"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

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


interface ParticleProps {
  count?: number;
  colors?: string[];
  size?: number;
  speed?: number;
  opacity?: number;
  className?: string;
}

export function ParticleField({
  count = 30,
  colors = ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4"],
  size = 4,
  speed = 20,
  opacity = 0.6,
  className = "",
}: ParticleProps) {
  const shouldReduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    duration: number;
    delay: number;
    dx: number; // deterministic horizontal drift per particle
  }>>([]);

  useEffect(() => {
    // Skip particle generation on mobile or when reduced motion is preferred
    if (shouldReduceMotion) {
      setParticles([]);
      return;
    }
    
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * size + 2,
      duration: Math.random() * speed + 10,
      delay: Math.random() * 2,
      dx: Math.random() * 100 - 50,
    }));
    setParticles(newParticles);
  }, [count, colors, size, speed, shouldReduceMotion]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity,
          }}
          animate={{
            y: [0, -100, 0],
          x: [0, particle.dx, 0],
            opacity: [0, opacity, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

interface FloatingElementProps {
  children?: React.ReactNode; // ✅ Make optional
  className?: string;
  intensity?: number;
  speed?: number;
}

export function FloatingElement({
  children,
  className = "",
  intensity = 10,
  speed = 3,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
        x: [0, intensity / 2, 0],
        rotate: [0, 2, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
}

export function GlowEffect({
  children,
  className = "",
  color = "#6366f1",
  intensity = 20,
}: GlowEffectProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: `0 0 ${intensity}px ${color}40, 0 0 ${intensity * 2}px ${color}20`,
        scale: 1.02,
      }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'transform, box-shadow' }}
    >
      {children}
    </motion.div>
  );
}

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function RippleEffect({
  children,
  className = "",
  color = "#6366f1",
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{
    id: number;
    x: number;
    y: number;
  }>>([]);

  const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseDown={addRipple}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: color,
          }}
          initial={{
            width: 0,
            height: 0,
            opacity: 0.5,
            x: 0,
            y: 0,
          }}
          animate={{
            width: 300,
            height: 300,
            opacity: 0,
            x: -150,
            y: -150,
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}
    </div>
  );
}

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className = "",
  strength = 0.3,
}: MagneticProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export function Parallax({
  children,
  className = "",
  offset = 50,
}: ParallaxProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={className}
      style={{
        y: scrollY * offset * 0.01,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
}

interface CursorConnectorProps {
  children?: React.ReactNode;
  className?: string;
  maxDistance?: number;
  lineColor?: string;
  lineOpacity?: number;
  lineWidth?: number;
}

export function CursorConnector({
  children,
  className = "",
  maxDistance = 200,
  lineColor = "#6366f1",
  lineOpacity = 0.4,
  lineWidth = 1.5,
}: CursorConnectorProps) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    // Find the parent section element to attach mouse events
    const container = containerRef.current;
    const parentSection = container?.closest('section');
    const targetElement = parentSection || document.body;

    if (targetElement) {
      targetElement.addEventListener("mousemove", handleMouseMove, { passive: true });
      targetElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener("mousemove", handleMouseMove);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const drawConnections = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      const rect = container.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw if mouse is within container
      if (mousePos.x < 0 || mousePos.y < 0 || mousePos.x > rect.width || mousePos.y > rect.height) {
        animationFrameRef.current = requestAnimationFrame(drawConnections);
        return;
      }

      // Find the parent section to search for particles
      const parentSection = container?.closest('section');
      const searchContainer = parentSection || container;

      if (!searchContainer) {
        animationFrameRef.current = requestAnimationFrame(drawConnections);
        return;
      }

      // Find all particles (small rounded elements from ParticleField)
      // These are the small dots that float around
      const particles = searchContainer.querySelectorAll('div[class*="absolute"][class*="rounded-full"]:not([class*="blur"])');
      
      // Find all floating bubble elements (large blurred circles)
      // These are the large background bubbles
      const allDivs = searchContainer.querySelectorAll('div');
      const floatingBubbles = Array.from(allDivs).filter(el => {
        const classes = el.className || '';
        const hasBlur = classes.includes('blur-3xl') || classes.includes('blur-');
        const hasRounded = classes.includes('rounded-full') || classes.includes('rounded-');
        const hasAbsolute = classes.includes('absolute');
        return hasBlur && hasRounded && hasAbsolute;
      });

      // Get positions of all connectable elements
      const elements: Array<{ x: number; y: number; size: number }> = [];
      const containerRect = container.getBoundingClientRect();

      particles.forEach((particle) => {
        const rect = particle.getBoundingClientRect();
        const width = rect.width || 4;
        const height = rect.height || 4;
        elements.push({
          x: rect.left + width / 2 - containerRect.left,
          y: rect.top + height / 2 - containerRect.top,
          size: Math.max(width, height),
        });
      });

      floatingBubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();
        const width = rect.width || 100;
        const height = rect.height || 100;
        elements.push({
          x: rect.left + width / 2 - containerRect.left,
          y: rect.top + height / 2 - containerRect.top,
          size: Math.max(width, height),
        });
      });

      // Draw lines to nearby elements
      elements.forEach((element) => {
        const dx = element.x - mousePos.x;
        const dy = element.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= maxDistance && distance > 0) {
          // Calculate opacity based on distance (closer = more opaque)
          const opacity = lineOpacity * (1 - distance / maxDistance);
          ctx.globalAlpha = Math.max(0.1, opacity);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = lineWidth;

          ctx.beginPath();
          ctx.moveTo(mousePos.x, mousePos.y);
          ctx.lineTo(element.x, element.y);
          ctx.stroke();
        }
      });

      animationFrameRef.current = requestAnimationFrame(drawConnections);
    };

    animationFrameRef.current = requestAnimationFrame(drawConnections);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, maxDistance, lineColor, lineOpacity, lineWidth]);

  return (
    <div 
      ref={containerRef} 
      className={`${className}`}
      style={{ pointerEvents: 'none' }}
    >
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      />
    </div>
  );
} 