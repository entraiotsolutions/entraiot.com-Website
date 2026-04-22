import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft,
  CheckCircle,
  Hotel,
  Key,
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
  title: "Hospitality IoT Systems - Smart Hotels | Entraiot",
  description: "IoT solutions for hospitality. Enhance guest experiences with automated room controls, personalized services and real-time feedback. Get started.",
  keywords: ["hospitality IoT", "smart hotels", "guest experience", "room automation", "hotel IoT", "hospitality technology"],
  alternates: {
    canonical: "https://entraiot.com/industries/hospitality",
  },
  openGraph: {
    title: "Hospitality IoT Systems - Smart Hotels | Entraiot",
    description: "IoT solutions for hospitality. Enhance guest experiences with automated room controls and personalized services.",
    url: "https://entraiot.com/industries/hospitality",
    images: [
      {
        url: "https://entraiot.com/RFID.webp",
        width: 1200,
        height: 630,
        alt: "IoT Solutions for Hospitality",
      },
    ],
  },
};

export default function HospitalityPage() {
  const challenges = [
    "Guest experience personalization",
    "Energy consumption optimization",
    "Room automation and control",
    "Maintenance scheduling and tracking",
    "Guest feedback collection",
    "Staff workflow optimization"
  ];

  const solutions = [
    {
      title: "Smart Room Controls",
      description: "Lights, temperature, and TV adjust automatically. Each guest gets their perfect room settings.",
      benefits: ["Enhanced guest satisfaction", "Energy savings", "Personalized experience"],
      icon: Hotel
    },
    {
      title: "Keyless Entry Systems",
      description: "Guests check in with their phone. No keys needed. Fast, easy, and secure.",
      benefits: ["Faster check-in", "Improved security", "Guest convenience"],
      icon: Key
    },
    {
      title: "Energy Management",
      description: "Watch energy use closely. Find ways to save. Cut costs without hurting guest comfort.",
      benefits: ["30% energy savings", "Cost reduction", "Sustainability"],
      icon: Shield
    },
    {
      title: "Guest Services",
      description: "Get guest feedback instantly. Handle service requests automatically. Keep guests happy.",
      benefits: ["Higher satisfaction", "Faster response", "Better reviews"],
      icon: TrendingUp
    }
  ];

  const technologies = [
    "NFC Systems", "BLE Devices", "IoT Sensors", "Mobile Apps",
    "Cloud Analytics", "Smart Controls", "Voice Integration", "Real-time Dashboards"
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
                  { label: "Hospitality" }
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
                Hospitality Industry
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                Connected <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Hospitality</span> Solutions
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
                Transform your hospitality business with smart IoT solutions. Personalize guest experiences, optimize operations and drive customer satisfaction.
              </p>
            </div>
          </ScrollAnimation>

          {/* Challenges & Solutions */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Challenges */}
            <GlowEffect color="#6366f1" intensity={0}>
              <Card className="glass backdrop-blur-sm border border-border/20 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <BarChart3 className="h-6 w-6 mr-3 text-primary" />
                    Industry Challenges
                  </CardTitle>
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
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="h-6 w-6 mr-3 text-primary" />
                    Our Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6 md:gap-8 text-center mt-6">
                      <div>
                        <div className="text-2xl font-bold text-primary">30%</div>
                        <div className="text-sm text-muted-foreground">Energy Savings</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">25%</div>
                        <div className="text-sm text-muted-foreground">Cost Reduction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">90%</div>
                        <div className="text-sm text-muted-foreground">Guest Satisfaction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">50%</div>
                        <div className="text-sm text-muted-foreground">Faster Check-in</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GlowEffect>
          </div>

          {/* Solutions Grid */}
          <ScrollAnimation direction="up" delay={0.6}>
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
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Technologies */}
            <div className="lg:col-span-2">
              <GlowEffect color="#10b981" intensity={0}>
                <Card className="glass backdrop-blur-sm border border-border/20">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-primary" />
                      Technologies We Use
                    </CardTitle>
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
                      <CardTitle className="text-lg">Ready to Enhance Hospitality?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Get a customized IoT solution for your hospitality business.
                      </p>
                      
                      <div className="space-y-3">
                        <CTAButton 
                          variant="primary" 
                          href="/contact/industry/hospitality"
                          className="w-full"
                        >
                          Get Free Consultation
                        </CTAButton>
                        
                        <CTAButton 
                          variant="demo" 
                          href="/contact/industry/hospitality/demo"
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

