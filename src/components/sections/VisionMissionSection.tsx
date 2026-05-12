"use client";
import { useState } from "react";
import {
    Target,
    Heart,
    Lightbulb,
    Globe,
    TrendingUp,
    Rocket,
    ChevronDown
} from "lucide-react";
import { ScrollCounter } from "@/components/ui/scroll-animations";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { GlowEffect, FloatingElement } from "@/components/ui/particle-effects";

const visionPillars = [
    {
        title: "Large Impact Beyond Business",
        accent: "#2563eb",
        icon: Globe,
        iconColor: "#60a5fa",
        text: "Entraiot's vision extends beyond business by contributing to society through sustainability — enabling smart cities, smarter living environments, energy saving, and improving overall quality of life.",
        tags: ["🌱 Sustainability", "🏙️ Smart Cities", "♻️ Green Tech", "🌍 Society"]
    },
    {
        title: "Innovation Leadership",
        accent: "#7c3aed",
        icon: Lightbulb,
        iconColor: "#a78bfa",
        text: "Committed to setting industry standards, driving next-generation innovation, and leading the global AI and IoT transformation with cutting-edge solutions.",
        tags: ["🤖 AI", "⚡ Next-Gen", "🏆 Standards", "🔬 R&D"]
    },
    {
        title: "Global Expansion Vision",
        accent: "#10b981",
        icon: TrendingUp,
        iconColor: "#34d399",
        text: "Entraiot aims to grow from Chennai to global markets, empowering businesses worldwide with scalable IoT and AI solutions built for every industry.",
        tags: ["🇮🇳 Chennai", "🌍 Global", "📈 Growth", "🤝 Partners"]
    },
    {
        title: "Human-Centric Approach",
        accent: "#ec4899",
        icon: Heart,
        iconColor: "#f472b6",
        text: "Technology alone is not enough. Entraiot focuses on people — usability, accessibility, and making complex IoT and AI solutions simple and practical for everyone.",
        tags: ["👥 People First", "♿ Accessible", "🎯 Usability", "💡 Simplicity"]
    }
];

export default function VisionMissionSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6 md:space-y-8">
                <div className="space-y-6">
                    <div className="mb-6 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                            🎯 About Entraiot
                        </div>
                        <h2 className="text-3xl md:text-4xl font-[800] text-slate-900 mb-4">
                            Entraiot <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Vision & Mission</span>
                        </h2>
                        <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed]"></div>
                    </div>

                    {/* Vision Card */}
                    <GlowEffect color="#2563eb" intensity={0}>
                        <div className="relative group bg-white border border-slate-200 border-l-[4px] border-l-[#2563eb] rounded-[16px] p-6 shadow-sm backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">OUR VISION</span>
                                <Target className="w-5 h-5 text-[#2563eb]" />
                            </div>
                            <p className="text-base text-slate-800 font-medium leading-[1.7] opacity-100">
                                To become a global leader in IoT and AI innovation by creating intelligent, sustainable, and human-centric ecosystems that transform businesses, empower industries, and enhance everyday life through smart automation and data-driven decision-making.
                            </p>
                        </div>
                    </GlowEffect>

                    {/* Mission Card */}
                    <GlowEffect color="#7c3aed" intensity={0}>
                        <div className="relative group bg-white border border-slate-200 border-l-[4px] border-l-[#7c3aed] rounded-[16px] p-6 shadow-sm backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#7c3aed]">OUR MISSION</span>
                                <Rocket className="w-5 h-5 text-[#7c3aed]" />
                            </div>
                            <p className="text-base text-slate-800 font-medium leading-[1.7] opacity-100">
                                We simplify complex technology into user-friendly, scalable solutions that deliver measurable results. We execute end-to-end — from concept to deployment to maintenance — automating operations, delivering real-time insights, and growing alongside our clients as their long-term technology partner.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold transition-all hover:scale-105">🚀 5+ IoT Solutions</div>
                                <div className="px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold transition-all hover:scale-105">🏭 8+ Industries</div>
                                <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold transition-all hover:scale-105">⚙️ End-to-End</div>
                            </div>
                        </div>
                    </GlowEffect>

                    {/* Additional Vision Pillars - Moved from Right Column for Left column part */}
                    <div className="mt-8 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mb-2">MORE PILLARS</div>
                        <div className="flex flex-col gap-3">
                            {visionPillars.slice(2, 4).map((pillar, i) => {
                                const actualIndex = i + 2;
                                const Icon = pillar.icon;
                                const isActive = activeIndex === actualIndex;
                                return (
                                    <div 
                                        key={actualIndex} 
                                        className={`rounded-[16px] overflow-hidden transition-all duration-350 border-l-[3px] bg-white border border-slate-200 ${isActive ? 'shadow-md' : ''}`}
                                        style={{ 
                                            borderLeftColor: isActive ? pillar.accent : 'transparent'
                                        }}
                                    >
                                        <button
                                            onClick={() => setActiveIndex(isActive ? -1 : actualIndex)}
                                            className={`w-full flex items-center justify-between p-4 transition-all ${isActive ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${pillar.accent}26` }}>
                                              <Icon className="w-[18px] h-[18px]" style={{ color: pillar.accent }} />
                                            </div>
                                            <span className={`text-sm font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{pillar.title}</span>
                                          </div>
                                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} style={{ color: isActive ? pillar.accent : undefined }} />
                                        </button>
                                        
                                        <div 
                                            className="transition-all duration-400 ease-in-out overflow-hidden"
                                            style={{ maxHeight: isActive ? '300px' : '0', opacity: isActive ? 1 : 0 }}
                                        >
                                            <div className="p-5 pt-3 bg-white border-t border-slate-100">
                                                <p className="text-sm text-slate-700 font-normal leading-[1.7]">{pillar.text}</p>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {pillar.tags.map((tag, j) => (
                                                        <span key={j} className="text-[10px] px-2.5 py-1 rounded-full border font-semibold" style={{ background: `${pillar.accent}1a`, borderColor: `${pillar.accent}33`, color: pillar.accent }}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Right Column: Founder Image and Vision Pillars */}
            <div className="relative">
                <div className="relative">
                    <FloatingElement intensity={6} speed={4}>
                        <div className="relative">
                            <div className="w-full max-w-md mx-auto glass backdrop-blur-sm rounded-3xl p-6 border border-border/20">
                                <OptimizedImage
                                    src="/CEO.jpg"
                                    alt="Salvin Jones - Founder & CEO"
                                    width={320}
                                    height={400}
                                    className="rounded-2xl object-cover w-full h-80 md:h-96"
                                    hoverEffect={true}
                                />
                            </div>
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
                                <GlowEffect color="#6366f1" intensity={0}>
                                    <div className="glass backdrop-blur-sm rounded-2xl p-4 border border-border/20 shadow-lg cursor-pointer transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-2">
                                        <div className="text-center space-y-2">
                                            <h4 className="font-bold text-foreground text-lg">Salvin Jones</h4>
                                            <p className="text-sm text-primary font-medium">Founder & CEO</p>
                                            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                <span>Available for consultation</span>
                                            </div>
                                        </div>
                                    </div>
                                </GlowEffect>
                            </div>
                        </div>
                    </FloatingElement>
                </div>
                
                {/* Professional Stats */}
                <div className="mt-16 grid grid-cols-2 gap-4">
                    <a href="https://www.linkedin.com/in/salvin-jones-3238899a" target="_blank" rel="noopener noreferrer nofollow" className="block">
                        <GlowEffect color="#6366f1" intensity={0}>
                            <div className="text-center bg-white/95 dark:bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border/20 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105">
                                <div className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-400">
                                    <ScrollCounter from={0} to={3200} suffix="+" duration={3.5} className="tabular-nums" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 leading-tight">LinkedIn Followers</div>
                            </div>
                        </GlowEffect>
                    </a>
                    <a href="https://www.linkedin.com/in/salvin-jones-3238899a" target="_blank" rel="noopener noreferrer nofollow" className="block">
                        <GlowEffect color="#6366f1" intensity={0}>
                            <div className="text-center bg-white/95 dark:bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border/20 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105">
                                <div className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-400">
                                    <ScrollCounter from={0} to={500} suffix="+" duration={3.5} className="tabular-nums" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 leading-tight">Professional Network</div>
                            </div>
                        </GlowEffect>
                    </a>
                </div>

                {/* Vision Pillars Accordion - Right Column part */}
                <div className="mt-8 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mb-2">VISION PILLARS</div>
                    <div className="flex flex-col gap-3">
                        {visionPillars.slice(0, 2).map((pillar, i) => {
                            const Icon = pillar.icon;
                            const isActive = activeIndex === i;
                            return (
                                <div 
                                    key={i} 
                                    className={`rounded-[16px] overflow-hidden transition-all duration-350 border-l-[3px] bg-white border border-slate-200 ${isActive ? 'shadow-md' : ''}`}
                                    style={{ 
                                        borderLeftColor: isActive ? pillar.accent : 'transparent'
                                    }}
                                >
                                    <button
                                        onClick={() => setActiveIndex(isActive ? -1 : i)}
                                        className={`w-full flex items-center justify-between p-4 transition-all ${isActive ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${pillar.accent}26` }}>
                                          <Icon className="w-[18px] h-[18px]" style={{ color: pillar.accent }} />
                                        </div>
                                        <span className={`text-sm font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{pillar.title}</span>
                                      </div>
                                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} style={{ color: isActive ? pillar.accent : undefined }} />
                                    </button>
                                    
                                    <div 
                                        className="transition-all duration-400 ease-in-out overflow-hidden"
                                        style={{ maxHeight: isActive ? '300px' : '0', opacity: isActive ? 1 : 0 }}
                                    >
                                        <div className="p-5 pt-3 bg-white border-t border-slate-100">
                                            <p className="text-sm text-slate-700 font-normal leading-[1.7]">{pillar.text}</p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {pillar.tags.map((tag, j) => (
                                                    <span key={j} className="text-[10px] px-2.5 py-1 rounded-full border font-semibold" style={{ background: `${pillar.accent}1a`, borderColor: `${pillar.accent}33`, color: pillar.accent }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
