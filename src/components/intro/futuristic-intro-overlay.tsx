"use client";

import { motion } from "framer-motion";

export default function FuturisticIntroOverlay({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[999] overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onDismiss}
    >
      {/* Scroll container keeps the modal reachable + closable on any viewport height */}
      <div className="flex min-h-full items-start justify-center p-3 py-6 md:items-center md:p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
          whileHover={{ scale: 1.01 }}
          transition={{
            duration: 0.6,
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[420px] md:max-w-3xl lg:max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white"
        >
          {/* CLOSE BUTTON — always on top, never covered/clipped by the image */}
          <button
            onClick={onDismiss}
            aria-label="Close"
            className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl leading-none shadow-lg md:right-4 md:top-4"
          >
            ✕
          </button>

          {/* ===================== MOBILE (portrait creative) ===================== */}
          <div className="relative w-full aspect-[9/16] md:hidden">
            <motion.img
              src="/landing-mobile.png"
              alt="Create your Smart Automation Story"
              className="w-full h-full object-contain"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Book Appointment hotspot */}
            <a
              href="https://rytzuforms.web.app/org/dzeId1Bzx6Vdy4n2m8aq7YzFIz03/form/BW4JNqTuRr26ssQbcn5y"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book appointment"
              className="absolute left-[10%] top-[79.5%] h-[9.5%] w-[80%] z-40"
            />

            {/* Chat on WhatsApp hotspot */}
            <a
              href="https://wa.me/919944442061"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="absolute left-[10%] top-[89%] h-[9%] w-[80%] z-40"
            />
          </div>

          {/* ===================== DESKTOP (landscape creative) ===================== */}
          <div className="relative hidden w-full aspect-[3/2] md:block">
            <motion.img
              src="/landing.png"
              alt="Create your Smart Automation Story"
              className="w-full h-full object-contain"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Book Appointment hotspot */}
            <a
              href="https://rytzuforms.web.app/org/dzeId1Bzx6Vdy4n2m8aq7YzFIz03/form/BW4JNqTuRr26ssQbcn5y"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book appointment"
              className="absolute left-[3%] top-[65.5%] h-[12%] w-[34%] z-40"
            />

            {/* Chat on WhatsApp hotspot */}
            <a
              href="https://wa.me/919944442061"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="absolute left-[3%] top-[80%] h-[12%] w-[34%] z-40"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
