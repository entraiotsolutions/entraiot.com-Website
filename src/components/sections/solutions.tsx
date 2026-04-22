import Link from "next/link";
import { 
  Cloud, 
  BarChart3, 
  Settings, 
  Shield, 
  Code, 
  Palette,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation, ScrollStagger, ScrollCounter } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, GlowEffect, Magnetic, RippleEffect, CursorConnector } from "@/components/ui/particle-effects";

const solutions = [
// ... (Your solutions array remains unchanged) ...
  {
    id: "iot-deployment",
    icon: Cloud,
    title: "End-to-End IoT Deployment",
    description: "We set up your IoT system from start to finish. We handle sensors, cloud tools and everything in between. Our setup grows with your business.",
    features: [
      "Sensor integration & deployment",
      "Cloud analytics setup",
      "Scalable infrastructure",
      "Complete project management"
    ],
    color: "text-sky-600",
    bgColor: "bg-gradient-to-br from-sky-400/10 to-sky-600/10",
    borderColor: "border-sky-500/30",
    iconBg: "bg-sky-500/20",
    glowColor: "#0ea5e9"
  },
 {
  id: "dashboards",
  icon: BarChart3,
  title: "Real-Time Dashboards",
    description: "See your data in real time. Our dashboards show what's happening right now. Make better decisions faster with clear, easy-to-read charts.",
  features: [
    "Live data visualization",
    "Custom dashboard design",
    "Multi-device compatibility",
    "Advanced analytics"
  ],
  color: "text-lime-600",
  bgColor: "bg-gradient-to-br from-lime-300/10 to-lime-500/10",
  borderColor: "border-lime-500/30",
  iconBg: "bg-lime-500/20",
  glowColor: "#84cc16"
},
  {
    id: "predictive-maintenance",
    icon: Settings,
    title: "Predictive Maintenance",
    description: "Our AI finds problems before they break your equipment. It learns patterns and warns you early. This saves time and money.",
    features: [
      "AI-powered predictions",
      "Pattern recognition",
      "Downtime reduction",
      "Asset life extension"
    ],
    color: "text-violet-600",
    bgColor: "bg-gradient-to-br from-violet-400/10 to-violet-700/10",
    borderColor: "border-violet-500/50",
    iconBg: "bg-violet-500/20",
    glowColor: "#8b5cf6"
  },
  {
    id: "automation",
    icon: Shield,
    title: "Smart Automation",
    description: "Your data stays safe. We use strong security to protect information. Everything is encrypted as it moves between devices and the cloud.",
    features: [
      "End-to-end encryption",
      "Secure protocols",
      "Network protection",
      "Compliance ready"
    ],
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-400/10 to-orange-600/10",
    borderColor: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
    glowColor: "#f97316"
  },
  {
    icon: Code,
    title: "Application Development",
    description: "We build apps that make work easier. Our apps connect your IoT devices and use AI to help. You get full control of your smart systems.",
    features: [
      "Custom app development",
      "IoT & AI integration",
      "Workflow optimization",
      "User-centric design"
    ],
    color: "text-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-300/10 to-yellow-500/10",
    borderColor: "border-yellow-400/30",
    iconBg: "bg-yellow-400/20",
    glowColor: "#eab308"
  },
  {
    icon: Palette,
    title: "Custom UI/UX Interfaces",
    description: "We design easy-to-use interfaces. Users interact with IoT devices effortlessly. We turn complex data into clear visuals.",
    features: [
      "Intuitive interface design",
      "Data visualization",
      "User experience optimization",
      "Cross-platform compatibility"
    ],
    color: "text-pink-600",
    bgColor: "bg-gradient-to-br from-pink-300/10 to-pink-600/10",
    borderColor: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
    glowColor: "#ec4899"
  }
];


export default function Solutions() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-background to-muted/30 overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField count={40} colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#f97316"]} size={6} speed={4} opacity={1} />
        <FloatingElement intensity={12} speed={2} className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <FloatingElement intensity={15} speed={1} className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <FloatingElement intensity={10} speed={3} className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Cursor Connector Overlay */}
      <CursorConnector 
        maxDistance={250} 
        lineColor="#6366f1" 
        lineOpacity={0.4} 
        lineWidth={1.5}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <ScrollAnimation direction="up" delay={0.2}>
            <Badge variant="outline" className="mb-6 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
              <Sparkles className="h-6 w-6 mr-2 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Our Solutions</span>
            </Badge>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.4}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Comprehensive <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT & AI</span> Solutions
            </h2>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We provide <span className="text-primary font-semibold">complete IoT solutions</span> from start to finish. 
              We help you set up and improve your systems. See real results that matter.
            </p>
          </ScrollAnimation>
        </div>
        {/* Enhanced Solutions Grid */}
        <ScrollStagger staggerDelay={0.15} childDelay={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 auto-rows-[minmax(280px,auto)]">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              // Jomor style Bento Box logic: Alternating wide and square cards to create a sleek asymmetric layout perfectly filling a 3-col grid
              const isWide = index === 0 || index === 3 || index === 4;
              const bentoClass = isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1 md:col-span-1 lg:col-span-1";

              return (
                <div key={index} id={solution.id || undefined} className={`h-full scroll-mt-20 ${bentoClass}`}>
                  <GlowEffect color={solution.glowColor} intensity={0}>
                    <div className="h-full rounded-[2rem] p-0.5 border border-border/20 bg-background/40 backdrop-blur-sm overflow-hidden group/bento">
                      <RippleEffect color={solution.glowColor}>
                        <Card className={`group/card ${solution.bgColor} border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm transition-all duration-500 h-full flex flex-col overflow-hidden relative rounded-[calc(2rem-2px)]`}>
                          
                          {/* Webflow/Jomor style oversized background watermark icon */}
                          <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover/card:scale-125 group-hover/card:-rotate-12 group-hover/card:opacity-[0.06] transition-all duration-700 ease-out pointer-events-none z-0">
                            <Icon className={`w-64 h-64 ${solution.color}`} />
                          </div>

                          <CardHeader className={`space-y-6 relative z-10 ${isWide ? 'p-8 md:p-10' : 'p-8'}`}>
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                              <Magnetic strength={0.15}>
                                <FloatingElement intensity={5} speed={3}>
                                  <div className={`w-14 h-14 ${solution.iconBg} rounded-2xl flex items-center justify-center group-hover/card:scale-110 group-hover/card:-rotate-6 transition-transform duration-500 shadow-md border border-white/10`}>
                                    <Icon className={`h-7 w-7 ${solution.color}`} />
                                  </div>
                                </FloatingElement>
                              </Magnetic>
                            </div>
                            <CardTitle className="text-2xl font-bold text-foreground tracking-tight group-hover/card:text-primary transition-colors">
                              {solution.title}
                            </CardTitle>
                          </CardHeader>
                          
                          <CardContent className={`space-y-6 relative z-10 flex-1 flex flex-col ${isWide ? 'px-8 md:px-10 pb-8 md:pb-10' : 'px-8 pb-8'}`}>
                            <p className="text-muted-foreground leading-relaxed text-[15px] flex-1">
                              {solution.description}
                            </p>
                            
                            <ul className={`grid gap-3 pt-4 border-t ${solution.borderColor} ${isWide ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                              {solution.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center space-x-3 text-[14px] font-medium">
                                  <div className={`w-5 h-5 rounded-full ${solution.iconBg} flex items-center justify-center flex-shrink-0`}>
                                    <CheckCircle className={`h-3 w-3 ${solution.color}`} />
                                  </div>
                                  <span className="text-foreground/80 group-hover/card:text-foreground transition-colors">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </RippleEffect>
                    </div>
                  </GlowEffect>
                </div>
              );
            })}
          </div>
        </ScrollStagger>

        {/* Enhanced Stats Section */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div id="proven-results" className="scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Proven <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Results & Performance</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <GlowEffect color="#6366f1" intensity={20}>
              <div className="text-center space-y-2 p-6 glass backdrop-blur-sm rounded-3xl border border-border/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={98} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">Industry Leading</span>
                </div>
              </div>
            </GlowEffect>
            
            <GlowEffect color="#10b981" intensity={20}>
              <div className="text-center space-y-2 p-6 glass backdrop-blur-sm rounded-3xl border border-border/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={48} />
                </div>
                <div className="text-sm text-muted-foreground">Hours Avg Setup</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">Rapid Deployment</span>
                </div>
              </div>
            </GlowEffect>
            
            <GlowEffect color="#8b5cf6" intensity={20}>
              <div className="text-center space-y-2 p-6 glass backdrop-blur-sm rounded-3xl border border-border/20">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={90} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Efficiency Boost</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">Average Results</span>
                </div>
              </div>
            </GlowEffect>
            </div>
          </div>
        </ScrollAnimation>

        {/* Enhanced CTA Section */}
        <ScrollAnimation direction="up" delay={0.6}>
          <div className="text-center glass backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/20 shadow-2xl">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  Ready to Transform Your <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Business?</span>
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Join hundreds of companies already benefiting from our IoT solutions. 
                  Get started with a free consultation and see the difference we can make.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic strength={0.2}>
                  <GlowEffect color="#6366f1" intensity={0}>
                    <Button size="lg" asChild className="group gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                      <Link href="/contact#get-in-touch" className="flex items-center">
                        Start Your Project
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </GlowEffect>
                </Magnetic>
                
                <Magnetic strength={0.1}>
                  <Button size="lg" variant="outline" className="group bg-white border-2 border-blue-800 text-blue-800 hover:bg-blue-50 rounded-lg">
                    <Link href="/industries" className="flex items-center">
                      View Industries
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Learn from real-world implementations and best practices
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}