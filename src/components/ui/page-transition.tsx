"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Rolling Top Progress Bar ───────────────────────────────────────────────
function TopProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Start bar
    setProgress(0);
    setVisible(true);

    // Simulate rolling progress
    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 85) {
        p = 85;
        if (timerRef.current) clearInterval(timerRef.current);
      }
      setProgress(p);
    }, 120);

    // Complete after page renders
    const done = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(done);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: "3px",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #6366f1, #06b6d4, #6366f1)",
          backgroundSize: "200% 100%",
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 8px rgba(99,102,241,0.6)",
        }}
        animate={{
          width: `${progress}%`,
          backgroundPosition:
            progress < 100 ? ["0% 0%", "100% 0%"] : "0% 0%",
        }}
        transition={{
          width: { duration: 0.3, ease: "easeOut" },
          backgroundPosition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
      {/* Glow dot at the tip */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#818cf8",
          boxShadow: "0 0 6px 2px rgba(129,140,248,0.8)",
        }}
        animate={{ left: `calc(${progress}% - 3px)` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Page Fade-In Wrapper ────────────────────────────────────────────────────
const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as number[] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

function PageFadeIn({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Combined Export ─────────────────────────────────────────────────────────
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopProgressBar />
      <PageFadeIn>{children}</PageFadeIn>
    </>
  );
}
