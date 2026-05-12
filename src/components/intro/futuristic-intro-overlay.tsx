"use client";

import { motion } from "framer-motion";

export default function FuturisticIntroOverlay({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -12, 0],   // 👈 floating motion
        }}
        whileHover={{ scale: 1.01 }}
        transition={{
          duration: 0.6,
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative w-[95%] md:w-[85%] lg:w-[75%] max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 z-50 bg-white rounded-full px-3 py-1 shadow"
        >
          ✕
        </button>

        {/* IMAGE WRAPPER (IMPORTANT) */}
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">

          <motion.img
            src="/landing.png"
            alt="Landing"
            className="w-full h-full object-cover"
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
          className="absolute left-[6%] bottom-[18%] w-[22%] h-[10%] z-40"
        />

        {/* WhatsApp */}
        <a
          href="https://wa.me/919944442061"
          target="_blank"
          className="absolute left-[6%] bottom-[6%] w-[22%] h-[10%] z-40"
        />

      </motion.div>
    </div>
  );
}