"use client";

import Link from "next/link";
import { ArrowRight, Play, Users, Star, CheckCircle, Cpu, Cloud, Shield, Zap, Database, Wifi, Activity, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation, ScrollCounter } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement,  Magnetic, CursorConnector } from "@/components/ui/particle-effects";
import { Logo } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";

const Orbit = ({ size, duration, nodeContent, color = "bg-primary/20", iconColor = "text-primary", reverse = false }: any) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 rounded-full border border-primary/20 border-dashed hidden md:block" // Hidden on mobile to prevent overflow
      style={{
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        pointerEvents: "none",
        zIndex: 0,
        animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
      }}
    >
      <div 
        className={`absolute w-12 h-12 -top-6 left-1/2 -ml-6 rounded-2xl ${color} shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center backdrop-blur-md border border-white/10`}
        style={{
          animation: `spin ${duration}s linear infinite ${reverse ? 'normal' : 'reverse'}`,
        }}
      >
        {nodeContent}
      </div>
    </div>
  );
};


// Removed unused teamAvatars to satisfy eslint no-unused-vars

const highlights = [
  "Real-Time Analytics",
  "24/7 Support",
  "Secure Integration", 
  "Custom Solutions"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-accent overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField 
          count={0}
          colors={["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981"]}
          size={6}
          speed={3}
          opacity={1}
        />
        
        <FloatingElement intensity={15} speed={2} className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl">{null}</FloatingElement>
        <FloatingElement intensity={12} speed={1} className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl">{null}</FloatingElement>
        <FloatingElement intensity={16} speed={3} className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl">{null}</FloatingElement>
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJva2xjaCgwLjY2IDAuMjIgMjY0LjM2IC8gMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* Cursor Connector Overlay */}
      <CursorConnector 
        maxDistance={250} 
        lineColor="#6366f1" 
        lineOpacity={0.4} 
        lineWidth={1.5}
        className="absolute inset-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-20 items-center">
          {/* Enhanced Content */}
          <div className="space-y-6 md:space-y-8">
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="space-y-6 md:space-y-8">
                {/* <Badge variant="outline" className="text-sm glass backdrop-blur-sm border-primary/30">
                  <Zap className="h-4 w-4 mr-2 text-primary" />
                  AI-Powered IoT Solutions
                </Badge> */}
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center lg:text-left leading-[1.1]">
                  <span className="text-foreground">Smarter</span>
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Spaces.</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smarter</span>
                  <span className="text-foreground"> Decisions.</span>
                </h1>

                <p className="hero-support-line max-w-2xl mx-auto lg:mx-0 text-center lg:text-left text-lg sm:text-xl md:text-2xl font-bold leading-relaxed tracking-[0.05em] text-foreground/90">
                  We deliver AI and IoT solutions that transform businesses.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-center lg:text-left leading-relaxed">
                  We help businesses with <span className="text-primary font-semibold">real-time IoT solutions</span> and <span className="text-primary font-semibold">AI solutions</span>. 
                  Our tools make work easier. They save money and help the environment. 
                  We bring <span className="text-primary font-semibold">smart automation</span> to companies and communities.
                </p>
                
                {/* Optimized Highlights */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {highlights.map((highlight, index) => (
                    <ScrollAnimation
                      key={highlight}
                      direction="scale"
                      delay={0.4 + index * 0.1}
                    >
                      <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50 hover:border-primary/50 transition-colors">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{highlight}</span>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Enhanced CTAs */}
            <ScrollAnimation direction="up" delay={0.6}>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Magnetic strength={0.2}>
                    <Button size="lg" asChild className="w-full sm:w-auto group gradient-primary text-primary-foreground hover:opacity-90 transition-opacity px-8 py-6 text-lg">
                      <Link href="/contact#get-in-touch" className="flex items-center justify-center">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                </Magnetic>
                <Magnetic strength={0.1}>
                  <Button size="lg" variant="outline" asChild className="w-full sm:w-auto group glass backdrop-blur-sm border-border/50 hover-gradient-primary transition-all px-8 py-6 text-lg">
                    <Link href="/solutions" className="flex items-center justify-center">
                      <Play className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      Watch Demo
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </ScrollAnimation>

            {/* Enhanced Trust Indicators */}
            <ScrollAnimation direction="up" delay={0.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">5.0 Client Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">3.5K+ LinkedIn Followers</span>
                </div>
              </div>
            </ScrollAnimation>

            {/* Enhanced Stats with Scroll Counters */}
            <ScrollAnimation direction="up" delay={1.0}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-8 pb-4 border-t border-border/50">
                <div className="text-center sm:text-left">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    <ScrollCounter from={0} to={8} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Industries Served</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    <ScrollCounter from={0} to={20} />
                  </div>
                  <div className="text-sm text-muted-foreground">Core Solutions</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Massive AI/IoT Solar System Visual */}
          <ScrollAnimation direction="right" delay={0.4}>
            <div className="relative mt-12 lg:mt-0 flex items-center justify-center min-h-[500px] md:min-h-[700px] w-full max-w-[700px] mx-auto">
              {/* 9 Orbitting rings */}
              <Orbit size={200} duration={15} color="bg-blue-500/10" nodeContent={<Wifi className="w-5 h-5 text-blue-500" />} />
              <Orbit size={280} duration={20} reverse color="bg-purple-500/10" nodeContent={<Zap className="w-5 h-5 text-purple-500" />} />
              <Orbit size={360} duration={25} color="bg-green-500/10" nodeContent={<Database className="w-5 h-5 text-green-500" />} />
              <Orbit size={440} duration={30} reverse color="bg-indigo-500/10" nodeContent={<Cloud className="w-6 h-6 text-indigo-500" />} />
              <Orbit size={520} duration={35} color="bg-rose-500/10" nodeContent={<Activity className="w-6 h-6 text-rose-500" />} />
              <Orbit size={600} duration={40} reverse color="bg-teal-500/10" nodeContent={<Cpu className="w-6 h-6 text-teal-500" />} />
              <Orbit size={680} duration={45} color="bg-amber-500/10" nodeContent={<Shield className="w-6 h-6 text-amber-500" />} />
              <Orbit size={760} duration={50} reverse color="bg-cyan-500/10" nodeContent={<Server className="w-6 h-6 text-cyan-500" />} />
              <Orbit size={840} duration={55} color="bg-pink-500/10" nodeContent={<Lock className="w-6 h-6 text-pink-500" />} />

              {/* Central Sun/Logo Hub */}
              <FloatingElement intensity={4} speed={4} className="relative z-10">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full glass bg-white/5 border border-white/40 flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.4)] backdrop-blur-3xl animate-pulse-slow">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]">
                    <Logo
                      src="/logobg.webp"
                      alt="Entraiot Central Hub"
                      width={60}
                      height={60}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </FloatingElement>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
} 
