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
  const isInView = useInView(ref, { once: true, amount: 0, margin: "200px" });
  const controls = useAnimation();
  
  // Use a short, snappy distance so it pops in immediately without traveling offscreen
  const distance = 50;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
            duration: 0.25, // Snappier duration
            delay: delay * 0.3, // Greatly reduce explicitly passed delays so UI doesn't artificially stall
            ease: "easeOut", // Standard fast ease
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

