import Link from "next/link";
import {
  Truck,
  Factory,
  Hotel,
  Zap,
  Building2,
  Heart,
  ShoppingCart,
  Leaf,
  ArrowRight,
  TrendingUp,
  Globe,
  Target,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";
import { ScrollCounter, ScrollAnimation } from "@/components/ui/scroll-animations";

const industries = [
  {
    icon: Truck,
    title: "Logistics",
    href: "/industries/logistics",
    description: "Track your vehicles in real time. Watch cargo conditions as they move. Deliveries arrive on time and in good shape.",
    benefits: [
      "Real-time fleet tracking",
      "Route optimization",
      "Cargo condition monitoring",
      "On-time delivery assurance"
    ],
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/20"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    href: "/industries/manufacturing",
    description: "Make your factory run better. Automate production lines. Watch machine health. Cut waste and save money.",
    benefits: [
      "Production line automation",
      "Machinery health monitoring",
      "Quality control systems",
      "Efficiency optimization"
    ],
    color: "text-gray-600",
    bgColor: "bg-gradient-to-br from-gray-500/10 to-gray-600/10",
    borderColor: "border-gray-500/20",
    iconBg: "bg-gray-500/20"
  },
  {
    icon: Hotel,
    title: "Hospitality",
    href: "/industries/hospitality",
    description: "Make guests happy. Use smart room controls. Get instant feedback. Give each guest a personal experience.",
    benefits: [
      "Personalized guest services",
      "Automated room controls",
      "Real-time feedback systems",
      "Energy management"
    ],
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-500/20",
    iconBg: "bg-purple-500/20"
  },
  {
    icon: Zap,
    title: "Energy Management",
    href: "/industries/energy-management",
    description: "Use less energy and save money. Predict when you'll need more power. Lower your carbon footprint with smart monitoring.",
    benefits: [
      "Energy usage optimization",
      "Load demand prediction",
      "Carbon footprint reduction",
      "Smart grid integration"
    ],
    color: "text-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-500/10 to-yellow-600/10",
    borderColor: "border-yellow-500/20",
    iconBg: "bg-yellow-500/20"
  },
  {
    icon: Building2,
    title: "Smart Cities",
    href: "/industries/smart-cities",
    description: "Help your city run better. Improve traffic flow. Add smart lighting. Manage waste better. Make cities safer and cleaner.",
    benefits: [
      "Traffic flow optimization",
      "Smart lighting systems",
      "Waste management",
      "Public safety enhancement"
    ],
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/10",
    borderColor: "border-green-500/20",
    iconBg: "bg-green-500/20"
  },
  {
    icon: Heart,
    title: "Healthcare",
    href: "/industries/healthcare",
    description: "Watch patient health from anywhere. Get instant alerts. Predict health problems early. Help patients get better care.",
    benefits: [
      "Remote patient monitoring",
      "Real-time health alerts",
      "Predictive diagnostics",
      "Emergency response systems"
    ],
    color: "text-red-600",
    bgColor: "bg-gradient-to-br from-red-500/10 to-red-600/10",
    borderColor: "border-red-500/20",
    iconBg: "bg-red-500/20"
  },
  {
    icon: ShoppingCart,
    title: "Smart Retail",
    href: "/industries/smart-retail",
    description: "Watch how customers shop. Automate your inventory. Give each customer a personal shopping experience.",
    benefits: [
      "Customer behavior tracking",
      "Inventory automation",
      "Personalized experiences",
      "Shopping analytics"
    ],
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-500/10 to-orange-600/10",
    borderColor: "border-orange-500/20",
    iconBg: "bg-orange-500/20"
  },
  {
    icon: Leaf,
    title: "Agriculture",
    href: "/industries/agriculture",
    description: "Grow more crops with less water. Use smart sensors to watch soil health. Get better harvests with precision farming.",
    benefits: [
      "Precision farming",
      "Water conservation",
      "Soil health monitoring",
      "Yield optimization"
    ],
    color: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10",
    borderColor: "border-emerald-500/20",
    iconBg: "bg-emerald-500/20"
  }
];

export default function Industries() {
  return (
    <section className="relative section-padding gradient-secondary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField count={40} colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#ec4899"]} size={6} speed={10} opacity={1} />
        <FloatingElement intensity={10} speed={4} className="absolute top-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <FloatingElement intensity={12} speed={3.5} className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <FloatingElement intensity={8} speed={5} className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
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
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <Badge variant="outline" className="mb-6 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
            <Globe className="h-6 w-6 mr-2 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Industries We Serve</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[800] text-[#0f172a] mb-8">
            Transforming <span className="bg-gradient-to-r from-[#2563eb] to-[#10b981] bg-clip-text text-transparent">Industries</span> with IoT Intelligence
          </h2>
          <p className="text-xl md:text-2xl text-[#475569] max-w-4xl mx-auto leading-relaxed">
            From logistics to healthcare, our <span className="text-[#2563eb] font-semibold">IoT solutions</span> are designed to meet
            the unique challenges and opportunities of diverse industries.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <ScrollAnimation
                key={index}
                direction="up"
                delay={0.1 + index * 0.05}
                duration={0.4}
                once={true}
              >
                <Link href={industry.href} className="block h-full outline-none">
                  <Card className={`group ${industry.bgColor} border ${industry.borderColor} h-[340px] shadow-sm hover:shadow-lg transition-all duration-500 rounded-3xl overflow-hidden relative cursor-pointer`}>
                    
                    {/* DEFAULT STATE: Massive Centered Topic */}
                    <div className="absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-500 group-hover:-translate-y-12 group-hover:opacity-0 group-hover:scale-95 z-10 opacity-100 translate-y-0 scale-100">
                        <div className={`w-28 h-28 ${industry.iconBg} rounded-[2rem] flex items-center justify-center mb-6 shadow-sm`}>
                          <Icon className={`h-14 w-14 animate-icon-dance ${industry.color}`} style={{ animationDelay: `${index * 0.2}s` }} />
                        </div>
                        <CardTitle className="text-2xl font-extrabold text-foreground tracking-tight text-center">
                          {industry.title}
                        </CardTitle>
                    </div>

                    {/* HOVER STATE: Information Reveal Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col transition-all duration-500 translate-y-12 opacity-0 scale-105 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 z-20 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
                      <div className="flex items-center space-x-4 mb-5 border-b pb-4 border-border/40">
                        <div className={`w-12 h-12 flex-shrink-0 ${industry.iconBg} rounded-xl flex items-center justify-center`}>
                          <Icon className={`h-6 w-6 ${industry.color}`} />
                        </div>
                        <CardTitle className="text-[1.15rem] font-bold text-foreground tracking-tight">
                          {industry.title}
                        </CardTitle>
                      </div>
                      
                      <div className="flex-1 overflow-visible">
                        <p className="text-muted-foreground text-[13.5px] leading-relaxed mb-4">
                          {industry.description}
                        </p>
                        <ul className="space-y-2.5">
                          {industry.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start space-x-2 text-[12.5px]">
                              <TrendingUp className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 opacity-80 ${industry.color}`} />
                              <span className="text-muted-foreground font-semibold leading-tight">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </Card>
                </Link>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Success Stories Section */}
        <div className="glass backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-20 border border-border/20 shadow-2xl animate-fade-in">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-primary mr-2" />
              <Badge variant="outline" className="glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Proven Results</span>
              </Badge>
            </div>
            <h3 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-6">
              Proven Results Across <span className="bg-gradient-to-r from-[#2563eb] to-[#10b981] bg-clip-text text-transparent">Industries</span>
            </h3>
            <p className="text-xl text-[#475569] mb-12 max-w-3xl mx-auto leading-relaxed">
              Our IoT solutions have consistently delivered measurable improvements
              in efficiency, cost reduction and operational excellence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={90} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Average Efficiency Improvement</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">Consistent Growth</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={40} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">Significant Savings</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  <ScrollCounter from={0} to={98} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">Reliable Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/20 dark:border-slate-700 shadow-2xl animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h3 className="dark-readable text-3xl md:text-4xl font-[800] text-[#0f172a]">
                  Ready to <span className="bg-gradient-to-r from-[#2563eb] to-[#10b981] bg-clip-text text-transparent">Revolutionize</span> Your Industry?
                </h3>
                <p className="dark-muted-readable text-xl text-[#475569] leading-relaxed">
                  Let&apos;s discuss how our IoT solutions can address your specific industry
                  challenges and unlock new opportunities for growth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  <Link href="/contact" className="flex items-center">
                    Get Industry-Specific Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white dark:bg-slate-800 border-2 border-blue-800 dark:border-blue-400 text-blue-800 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg">
                  <Link href="/solutions" className="flex items-center">
                    Explore Solutions
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="dark-muted-readable text-sm text-muted-foreground mb-4">
                  See how we&apos;ve helped companies in your industry succeed
                </p>
                <Button variant="ghost" asChild>
                  <Link href="/resources" className="text-primary hover:text-primary/80">
                    View Industry Case Studies →
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-6 border-t border-border/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    <ScrollCounter from={0} to={8} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Industries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    <ScrollCounter from={0} to={25} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
