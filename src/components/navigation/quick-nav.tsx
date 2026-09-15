"use client";

import Link from "next/link";
import { 
  ArrowRight,
  Cog,
  Building,
  Target,
  MessageCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import { GlowEffect, Magnetic } from "@/components/ui/particle-effects";

interface QuickNavProps {
  title?: string;
  showTitle?: boolean;
  className?: string;
}

export function QuickNav({ 
  title = "Explore Our Solutions", 
  showTitle = true,
  className = ""
}: QuickNavProps) {
  const quickNavSections = [
    {
      title: "Products",
      icon: Cog,
      color: "#6366f1",
      links: [
        { name: "IoT Deployment", href: "/products/iot-deployment", description: "End-to-end IoT solutions" },
        { name: "Predictive Maintenance", href: "/products/predictive-maintenance", description: "AI-powered maintenance" },
        { name: "Smart Dashboards", href: "/products/smart-dashboards", description: "Real-time analytics" }
      ]
    },
    {
      title: "Services",
      icon: Building,
      color: "#8b5cf6",
      links: [
        { name: "IoT Consulting", href: "/solutions", description: "Strategic IoT planning" },
        { name: "AI Solutions", href: "/solutions", description: "AI implementation" },
        { name: "Smart Automation", href: "/solutions", description: "Process automation" }
      ]
    },
    {
      title: "Industries",
      icon: Target,
      color: "#10b981",
      links: [
        { name: "Logistics", href: "/industries/logistics", description: "Supply chain IoT" },
        { name: "Manufacturing", href: "/industries/manufacturing", description: "Smart manufacturing" },
        { name: "Healthcare", href: "/industries/healthcare", description: "Medical IoT" },
        { name: "Smart Cities", href: "/industries/smart-cities", description: "Urban IoT solutions" },
        { name: "Hospitality", href: "/industries/hospitality", description: "Guest experience IoT" },
        { name: "Energy Management", href: "/industries/energy-management", description: "Smart energy solutions" },
        { name: "Smart Retail", href: "/industries/smart-retail", description: "Retail automation" },
        { name: "Agriculture", href: "/industries/agriculture", description: "Precision farming" }
      ]
    }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {showTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground">
            Discover our comprehensive IoT and AI solutions
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickNavSections.map((section, sectionIndex) => (
          <ScrollAnimation key={section.title} direction="up" delay={0.1 * sectionIndex}>
            <GlowEffect color={section.color} intensity={0}>
              <Card className="glass backdrop-blur-sm border border-border/20 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <section.icon className="h-5 w-5 mr-2" style={{ color: section.color }} />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.links.map((link) => (
                    <div key={link.href} className="group">
                      <Link 
                        href={link.href}
                        className="block p-3 rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:bg-muted/50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                              {link.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-2 flex-shrink-0" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </GlowEffect>
          </ScrollAnimation>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Magnetic strength={0.1}>
          <Button size="lg" className="group gradient-primary text-primary-foreground">
            <Link href="/contact" className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Magnetic>
      </div>
    </div>
  );
}
