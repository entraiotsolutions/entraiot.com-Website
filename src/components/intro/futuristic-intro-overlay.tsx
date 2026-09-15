"use client";

import { motion } from "framer-motion";

export default function FuturisticIntroOverlay({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-black/60 p-3 pt-10 pb-10 md:items-center md:p-6"
      style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}
    >

      {/* Modal */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -12, 0],   // 👈 floating motion
        }}
        whileHover={{ scale: 1.01 }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative m-auto w-full max-w-[min(94vw,420px)] md:w-[85%] md:max-w-6xl lg:w-[75%] rounded-2xl overflow-hidden shadow-2xl bg-white"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onDismiss}
          className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl leading-none shadow md:right-4 md:top-4 md:h-auto md:w-auto md:px-3 md:py-1 md:text-base"
        >
          ✕
        </button>

        {/* IMAGE WRAPPER (IMPORTANT) */}
        <div className="relative w-full aspect-[3/2]">

          <motion.img
            src="/landing.png"
            alt="Landing"
            className="w-full h-full object-contain"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </div>

        {/* CLICKABLE HOTSPOTS */}

        {/* Book Appointment */}
        <a
          href="https://rytzuforms.web.app/org/dzeId1Bzx6Vdy4n2m8aq7YzFIz03/form/BW4JNqTuRr26ssQbcn5y"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[6%] bottom-[18%] w-[22%] h-[10%] z-40"
        />

        {/* WhatsApp */}
        <a
          href="https://wa.me/919944442061"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[6%] bottom-[6%] w-[22%] h-[10%] z-40"
        />

      </motion.div>
    </div>
  );
}
