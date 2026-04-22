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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
            Transforming <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">Industries</span> with IoT Intelligence
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From logistics to healthcare, our <span className="text-primary font-semibold">IoT solutions</span> are designed to meet 
            the unique challenges and opportunities of diverse industries.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            // Determine animation direction based on position
            const getDirection = () => {
              const row = Math.floor(index / 4);
              const col = index % 4;
              // Alternate directions for visual interest
              if (row === 0) {
                if (col === 0) return "left";
                if (col === 1) return "up";
                if (col === 2) return "up";
                return "right";
              } else {
                if (col === 0) return "left";
                if (col === 1) return "down";
                if (col === 2) return "down";
                return "right";
              }
            };
            
            return (
              <ScrollAnimation
                key={index}
                direction={getDirection()}
                delay={0.2 + index * 0.1}
                duration={0.6}
                once={false}
              >
                <Link href={industry.href}>
                  <Card className={`group card-hover card-glow ${industry.bgColor} border-2 ${industry.borderColor} h-full backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
                    <CardHeader className="space-y-4">
                      <div className={`w-16 h-16 ${industry.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className={`h-8 w-8 ${industry.color}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {industry.title}
                        </CardTitle>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {industry.description}
                      </p>
                      <ul className="space-y-2">
                        {industry.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2 text-xs">
                            <TrendingUp className="h-3 w-3 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
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
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Proven Results Across <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">Industries</span>
            </h3>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
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
          <div className="glass backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/20 shadow-2xl animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  Ready to <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">Revolutionize</span> Your Industry?
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
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
                <Button size="lg" variant="outline" className="bg-white border-2 border-blue-800 text-blue-800 hover:bg-blue-50 rounded-lg">
                  <Link href="/solutions" className="flex items-center">
                    Explore Solutions
                  </Link>
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
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