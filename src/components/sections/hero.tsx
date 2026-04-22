import Link from "next/link";
import { ArrowRight, Play, Users, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation, ScrollCounter } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement,  Magnetic, CursorConnector } from "@/components/ui/particle-effects";
import { Logo } from "@/components/ui/optimized-image";

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

          {/* Enhanced Visual/Dashboard */}
          <ScrollAnimation direction="right" delay={0.4}>
            <div className="relative mt-8 lg:mt-0">
              <FloatingElement intensity={8} speed={6}>
                  <div className="glass backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-lg border border-border/20 max-w-lg mx-auto lg:max-w-none">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                            <Logo
                              src="/logobg.webp"
                              alt="Entraiot Solutions"
                              width={20}
                              height={20}
                              className="h-20 w-20 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">IoT Solutions Dashboard</h3>
                            <p className="text-sm text-muted-foreground">Real-time AI solutions monitoring</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          Live
                        </Badge>
                      </div>
                      
                      {/* Enhanced Mock Dashboard Elements */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Connected Devices</span>
                          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            <ScrollCounter from={0} to={2847} />
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">System Performance</span>
                            <span className="text-foreground font-medium">
                              <ScrollCounter from={0} to={94} suffix="%" />
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full w-[94%] animate-pulse"></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-4 border border-green-500/20 hover:border-green-500/40 transition-colors">
                              <div className="text-xs text-green-700 font-medium">Energy Saved</div>
                              <div className="text-2xl font-bold text-green-600">
                                <ScrollCounter from={0} to={23} suffix="%" />
                              </div>
                              <div className="text-xs text-green-600">↑ 12% this month</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                              <div className="text-xs text-blue-700 font-medium">Efficiency</div>
                              <div className="text-2xl font-bold text-blue-600">
                                <ScrollCounter from={0} to={90} suffix="%" />
                              </div>
                              <div className="text-xs text-blue-600">↑ 8% this month</div>
                            </div>
                        </div>

                        {/* Enhanced Team Section */}
                        {/* <div className="pt-4 border-t border-border/50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-foreground">Expert Team</span>
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex items-center space-x-2">
                            {teamAvatars.map((avatar, index) => (
                              <Avatar
                                key={index}
                                src={avatar.src}
                                alt={avatar.alt}
                                size={40}
                                online={true}
                                hoverEffect={true}
                                className="transition-transform duration-300"
                              />
                            ))}
                            <div className="ml-3 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">4+ experts</span> online
                            </div>
                          </div>
                        </div> */}
                      </div>
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
