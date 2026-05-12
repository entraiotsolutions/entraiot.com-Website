import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft,
  CheckCircle,
  Factory,
  Cpu,
  Shield,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, GlowEffect, Magnetic, CursorConnector } from "@/components/ui/particle-effects";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { CTAButton } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Manufacturing IoT Technology - Smart Factory | Entraiot",
  description: "Smart factories, predictive maintenance and production optimization. Transform manufacturing with IoT solutions. Get free consultation.",
  keywords: ["manufacturing IoT", "smart factory", "industrial automation", "predictive maintenance", "production optimization"],
  alternates: {
    canonical: "https://entraiot.com/industries/manufacturing",
  },
  openGraph: {
    title: "Manufacturing IoT Technology - Smart Factory | Entraiot",
    description: "Smart factories, predictive maintenance and production optimization. Transform manufacturing with IoT solutions.",
    url: "https://entraiot.com/industries/manufacturing",
    images: [
      {
        url: "https://entraiot.com/RFID.webp",
        width: 1200,
        height: 630,
        alt: "IoT Solutions for Manufacturing",
      },
    ],
  },
};

export default function ManufacturingPage() {
  const challenges = [
    "Equipment downtime and maintenance costs",
    "Production line inefficiencies",
    "Quality control and defect tracking",
    "Energy consumption optimization",
    "Supply chain coordination",
    "Worker safety monitoring"
  ];

  const solutions = [
    {
      title: "Smart Production Lines",
      description: "Watch and control your factory in real time. The system makes changes automatically.",
      benefits: ["30% efficiency increase", "25% waste reduction", "Improved quality control"],
      icon: Factory
    },
    {
      title: "Predictive Maintenance",
      description: "AI watches your equipment health. It stops problems before they happen.",
      benefits: ["40% downtime reduction", "Extended asset life", "Lower maintenance costs"],
      icon: Cpu
    },
    {
      title: "Quality Management",
      description: "Automatic quality checks find problems right away. Track issues as they happen.",
      benefits: ["99.5% quality rate", "Faster defect detection", "Reduced recalls"],
      icon: Shield
    },
    {
      title: "Energy Optimization",
      description: "Watch energy use across your factory. Find ways to save money and power.",
      benefits: ["20% energy savings", "Carbon footprint reduction", "Cost optimization"],
      icon: TrendingUp
    }
  ];

  const technologies = [
    "IoT Sensors", "RFID Systems", "PLC Integration", "Edge Computing",
    "Cloud Analytics", "AI/ML Models", "SCADA Systems", "Real-time Dashboards"
  ];

  return (
    <>
      <div className="min-h-screen gradient-accent">
        <section className="relative gradient-accent overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <ParticleField count={40} colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#ec4899"]} size={6} speed={10} opacity={1} />
            <FloatingElement intensity={10} speed={4} className="absolute top-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <FloatingElement intensity={12} speed={3.5} className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <FloatingElement intensity={8} speed={5} className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"></div>
          </div>

          {/* Cursor Connector Overlay */}
          <CursorConnector 
            maxDistance={250} 
            lineColor="#6366f1" 
            lineOpacity={0.4} 
            lineWidth={1.5}
            className="absolute inset-0"
          />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
            <div className="mb-6">
              <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
                <Breadcrumbs items={[
                  { label: "Home", href: "/" }, 
                  { label: "Industries", href: "/industries" }, 
                  { label: "Manufacturing" }
                ]} className="mb-0 [&_ol]:text-black [&_span]:text-black" />
              </div>
            </div>

          {/* Back Button */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="mb-8">
              <Magnetic strength={0.1}>
                <Button variant="outline" className="group glass backdrop-blur-sm">
                  <Link href="/industries" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Industries
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </ScrollAnimation>

          {/* Industry Header */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="mb-12">
              <Badge className="bg-primary/90 text-primary-foreground mb-6">
                Manufacturing Industry
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                Industrial <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Manufacturing</span> Automation
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
                Transform your factory into a smart manufacturing hub. Our IoT solutions optimize production, reduce costs and enhance quality control.
              </p>
            </div>
          </ScrollAnimation>

          {/* Challenges & Solutions */}
          <ScrollAnimation direction="up" delay={0.6}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Industry <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Challenges & Solutions</span>
            </h2>
          </ScrollAnimation>
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Challenges */}
            <GlowEffect color="#6366f1" intensity={0}>
              <Card className="glass backdrop-blur-sm border border-border/20 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-semibold flex items-center text-foreground">
                    <BarChart3 className="h-6 w-6 mr-3 text-primary" />
                    Industry Challenges
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </GlowEffect>

            {/* Solutions Overview */}
            <GlowEffect color="#8b5cf6" intensity={0}>
              <Card className="glass backdrop-blur-sm border border-border/20 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-semibold flex items-center text-foreground">
                    <TrendingUp className="h-6 w-6 mr-3 text-primary" />
                    Our Solutions
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6 md:gap-8 text-center mt-6">
                      <div>
                        <div className="text-2xl font-bold text-primary">30%</div>
                        <div className="text-sm text-muted-foreground">Efficiency Increase</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">40%</div>
                        <div className="text-sm text-muted-foreground">Downtime Reduction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">20%</div>
                        <div className="text-sm text-muted-foreground">Energy Savings</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">99.5%</div>
                        <div className="text-sm text-muted-foreground">Quality Rate</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GlowEffect>
          </div>

          {/* Solutions Grid */}
          <ScrollAnimation direction="up" delay={0.6}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Our <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT Solutions</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {solutions.map((solution, index) => (
                <GlowEffect key={index} color="#6366f1" intensity={0}>
                  <Card className="glass backdrop-blur-sm border border-border/20 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <solution.icon className="h-6 w-6 mr-3 text-primary" />
                        {solution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{solution.description}</p>
                      <div className="space-y-2">
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </GlowEffect>
              ))}
            </div>
          </ScrollAnimation>

          {/* Technologies & CTA */}
          <ScrollAnimation direction="up" delay={0.8}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Technologies We Use
            </h2>
          </ScrollAnimation>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Technologies */}
            <div className="lg:col-span-2">
              <GlowEffect color="#10b981" intensity={0}>
                <Card className="glass backdrop-blur-sm border border-border/20">
                  <CardHeader>
                    <h3 className="text-xl font-semibold flex items-center text-foreground">
                      <Shield className="h-6 w-6 mr-3 text-primary" />
                      Technology Stack
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </GlowEffect>
            </div>

            {/* CTA Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                <GlowEffect color="#6366f1" intensity={0}>
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Ready to Optimize Your Manufacturing?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Get a customized IoT solution for your manufacturing operations.
                      </p>
                      
                      <div className="space-y-3">
                        <CTAButton 
                          variant="primary" 
                          href="/contact/industry/manufacturing"
                          className="w-full"
                        >
                          Get Free Consultation
                        </CTAButton>
                        
                        <CTAButton 
                          variant="demo" 
                          href="/contact/industry/manufacturing/demo"
                          className="w-full"
                        >
                          View Demo
                        </CTAButton>
                      </div>
                    </CardContent>
                  </Card>
                </GlowEffect>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

