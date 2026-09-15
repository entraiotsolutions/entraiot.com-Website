"use client";

import { motion } from "framer-motion";
import { Cpu, Wifi, Settings, BarChart3, Calendar, ArrowRight, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FEATURES = [
  { label: "AI-Powered Intelligence", icon: Cpu, bg: "bg-indigo-600" },
  { label: "IoT-Connected Everything", icon: Wifi, bg: "bg-emerald-500" },
  { label: "Workflow Automation", icon: Settings, bg: "bg-rose-500" },
  { label: "Real-time Insights", icon: BarChart3, bg: "bg-violet-600" },
];

const BOOK_APPOINTMENT_URL =
  "https://rytzuforms.web.app/org/dzeId1Bzx6Vdy4n2m8aq7YzFIz03/form/BW4JNqTuRr26ssQbcn5y";
const WHATSAPP_URL = "https://wa.me/919944442061";

export default function FuturisticIntroOverlay({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-black/60 p-3 pt-8 pb-8 md:items-center md:p-6"
      style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}
    >
      {/* Modal */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.005 }}
        className="relative m-auto w-full max-w-[440px] md:max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onDismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-50 md:right-4 md:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 max-h-[90vh] md:max-h-[85vh] overflow-y-auto p-5 pt-6 md:p-8">
          {/* LEFT / TOP: text content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-slate-900">
              Create your
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                Smart Automation Story
              </span>
            </h2>

            <p className="mt-3 text-sm md:text-base text-slate-500 leading-relaxed">
              Transform your business with intelligent AI + IoT automation.
              Orchestrate smarter workflows, unlock real-time insights, and
              accelerate growth with next-gen digital intelligence built for
              high-performance teams.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 rounded-2xl border border-slate-200 p-4">
              {FEATURES.map(({ label, icon: Icon, bg }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${bg}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* IMAGE (mobile: shown here, between features and CTAs) */}
            <div className="mt-4 md:hidden relative w-full aspect-[868/1024] max-h-56 rounded-xl overflow-hidden">
              <img
                src="/landing.png"
                alt="Smart automation illustration"
                className="w-full h-full object-cover object-right"
              />
            </div>

            {/* CTA BUTTONS */}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={BOOK_APPOINTMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Calendar className="h-4 w-4" />
                Book appointment
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-green-600 px-4 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-green-600/20 transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <FaWhatsapp className="h-4 w-4" />
                Chat on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* RIGHT: image (desktop only) */}
          <div className="hidden md:block relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden">
            <img
              src="/landing.png"
              alt="Smart automation illustration"
              className="w-full h-full object-cover object-right"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
