"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Cpu, 
  BarChart3, 
  Brain, 
  Zap, 
  Code2, 
  Layers,
  ChevronRight,
  ChevronDown,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { ScrollAnimation, ScrollStagger, ScrollCounter } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";

const solutions = [
  {
    id: "iot-deployment",
    icon: Cpu,
    title: "End-to-End IoT Deployment",
    description: "We set up your IoT system from start to finish. We handle sensors, cloud tools and everything in between. Our setup grows with your business.",
    features: ["Sensor integration", "Cloud analytics setup", "Scalable infrastructure", "Complete project management"],
    gradient: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    vividAccent: "#2563eb",
    ultraLightTint: "#eff6ff",
    lightBorder: "#bfdbfe",
    darkAccentText: "#1d4ed8",
    shadowColor: "rgba(37,99,235,0.3)"
  },
  {
    id: "dashboards",
    icon: BarChart3,
    title: "Real-Time Dashboards",
    description: "See your data in real time. Our dashboards show what's happening right now. Make better decisions faster with clear, easy-to-read charts.",
    features: ["Live data visualization", "Custom dashboard design", "Multi-device compatibility", "Advanced analytics"],
    gradient: "linear-gradient(135deg, #047857, #10b981)",
    vividAccent: "#059669",
    ultraLightTint: "#ecfdf5",
    lightBorder: "#a7f3d0",
    darkAccentText: "#047857",
    shadowColor: "rgba(16,185,129,0.3)"
  },
  {
    id: "predictive-maintenance",
    icon: Brain,
    title: "Predictive Maintenance",
    description: "Our AI finds problems before they break your equipment. It learns patterns and warns you early. This saves time and money.",
    features: ["AI-powered predictions", "Pattern recognition", "Downtime reduction", "Asset life extension"],
    gradient: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
    vividAccent: "#7c3aed",
    ultraLightTint: "#f5f3ff",
    lightBorder: "#c4b5fd",
    darkAccentText: "#6d28d9",
    shadowColor: "rgba(124,58,237,0.3)"
  },
  {
    id: "automation",
    icon: Zap,
    title: "Smart Automation",
    description: "Your data stays safe. We use strong security to protect information. Everything is encrypted as it moves between devices and the cloud.",
    features: ["End-to-end encryption", "Secure protocols", "Network protection", "Compliance ready"],
    gradient: "linear-gradient(135deg, #b45309, #f59e0b)",
    vividAccent: "#d97706",
    ultraLightTint: "#fffbeb",
    lightBorder: "#fcd34d",
    darkAccentText: "#b45309",
    shadowColor: "rgba(245,158,11,0.3)"
  },
  {
    id: "app-dev",
    icon: Code2,
    title: "Application Development",
    description: "We build apps that make work easier. Our apps connect your IoT devices and use AI to help. You get full control of your smart systems.",
    features: ["Custom app development", "IoT & AI integration", "Workflow optimisation", "User-centric design"],
    gradient: "linear-gradient(135deg, #0369a1, #0ea5e9)",
    vividAccent: "#0284c7",
    ultraLightTint: "#f0f9ff",
    lightBorder: "#bae6fd",
    darkAccentText: "#0369a1",
    shadowColor: "rgba(14,165,233,0.3)"
  },
  {
    id: "ui-ux",
    icon: Layers,
    title: "Custom UI/UX Interfaces",
    description: "We design easy-to-use interfaces. Users interact with IoT devices effortlessly. We turn complex data into clear visuals.",
    features: ["Intuitive interface design", "Data visualisation", "User experience optimisation", "Cross-platform compatibility"],
    gradient: "linear-gradient(135deg, #be185d, #ec4899)",
    vividAccent: "#db2777",
    ultraLightTint: "#fdf2f8",
    lightBorder: "#f9a8d4",
    darkAccentText: "#be185d",
    shadowColor: "rgba(236,72,153,0.3)"
  }
];

export default function Solutions() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative section-padding bg-[#f8fafc] overflow-visible">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleField count={40} colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#f97316"]} size={6} speed={4} opacity={0.6} />
        <FloatingElement intensity={12} speed={2} className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
        <FloatingElement intensity={15} speed={1} className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <CursorConnector 
        maxDistance={250} 
        lineColor="#6366f1" 
        lineOpacity={0.2} 
        lineWidth={1}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              Our Solutions
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.4}>
            <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 mb-6">
              Comprehensive <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">IoT & AI</span> Solutions
            </h2>
            <div className="w-[100px] h-1 bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#ec4899] rounded-full mx-auto" />
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.6}>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed mt-6">
              We provide complete IoT solutions from start to finish. We help you set up and improve your systems for real results.
            </p>
          </ScrollAnimation>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 items-start">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isActive = openId === solution.id;

            return (
              <div 
                key={solution.id}
                onClick={() => toggleCard(solution.id)}
                className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden self-start ${
                  isActive 
                    ? "border-2 border-opacity-100 ring-0" 
                    : "border-opacity-100 hover:shadow-xl"
                }`}
                style={{ 
                  backgroundColor: solution.ultraLightTint,
                  borderColor: isActive ? solution.vividAccent : solution.lightBorder,
                  borderLeft: isActive ? `5px solid ${solution.vividAccent}` : `1px solid ${solution.lightBorder}`,
                  boxShadow: isActive ? `0 16px 48px ${solution.shadowColor}` : "",
                  transform: !isActive ? "translateY(0px)" : "",
                  // Using inline style for hover translate because of dynamic colors, but tailwind is fine for basic hover
                }}
              >
                <div className="p-6">
                  {/* Card Header (Icon + Title + Chevron) */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <div 
                        className="w-[52px] h-[52px] flex-shrink-0 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110"
                        style={{ 
                          background: solution.gradient,
                          boxShadow: `0 4px 16px ${solution.shadowColor}`
                        }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0f172a]">
                        {solution.title}
                      </h3>
                    </div>
                    <div 
                      className={`transition-transform duration-300 ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`}
                      style={{ color: solution.vividAccent }}
                    >
                      {isActive ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div className={`transition-all duration-300 overflow-hidden ${isActive ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                    <div 
                      className="transition-all duration-300 transform"
                      style={{ 
                        opacity: isActive ? 1 : 0, 
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: isActive ? "0.1s" : "0s"
                      }}
                    >
                      <p className="text-sm text-[#475569] leading-[1.75]">
                        {solution.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {solution.features.map((feature, fIdx) => (
                          <div 
                            key={fIdx}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full text-xs font-semibold"
                            style={{ borderColor: solution.lightBorder, color: solution.darkAccentText }}
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: solution.vividAccent }}
                            />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Link 
                        href="/contact"
                        onClick={(e) => e.stopPropagation()}
                        className="block mt-6 w-full py-3 rounded-xl text-white font-bold text-sm text-center shadow-lg transition-all hover:-translate-y-0.5"
                        style={{ 
                          background: solution.gradient,
                          boxShadow: `0 4px 20px ${solution.shadowColor}`
                        }}
                      >
                        Talk to Our Team →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div 
            className="relative overflow-hidden rounded-[2rem] p-10 md:p-12 mb-24"
            style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a1060 50%, #0f2044 100%)' }}
          >
            {/* Decorative blurred circles */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#2563eb] opacity-15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#7c3aed] opacity-15 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 w-[200px] h-[200px] bg-[#ec4899] opacity-10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <h3 className="relative z-10 text-center text-blue-200 font-bold mb-12 text-xs tracking-widest uppercase">Proven Results & Performance</h3>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Stat 1 */}
              <div className="text-center px-4 md:border-r border-white/10">
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={76} suffix="%" />
                </div>
                <div className="text-sm text-blue-100/80 font-medium uppercase tracking-wide">System Uptime</div>
                <div className="text-xs text-emerald-400 font-bold mt-2">
                  +12.4% Increase
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center px-4 md:border-r border-white/10">
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={37} />
                </div>
                <div className="text-sm text-blue-100/80 font-medium uppercase tracking-wide">Hours Avg Setup</div>
                <div className="text-xs text-emerald-400 font-bold mt-2">
                  -24.1% Reduced
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center px-4">
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={69} suffix="%" />
                </div>
                <div className="text-sm text-blue-100/80 font-medium uppercase tracking-wide">Efficiency Boost</div>
                <div className="text-xs text-emerald-400 font-bold mt-2">
                  +45.2% Growth
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* CTA Section */}
        <ScrollAnimation direction="up" delay={0.6}>
          <div 
            className="text-center rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #312e81 100%)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full -ml-32 -mb-32" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                  Ready to Transform Your <span className="text-[#60a5fa]">Business?</span>
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Join hundreds of companies already benefiting from our IoT solutions. 
                  Get started with a free consultation today.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact#get-in-touch" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20"
                >
                  Start Your Project
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link 
                  href="/industries" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-bold border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  View Industries
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}