import type { Metadata } from "next";
import Script from "next/script";
import Industries from "@/components/sections/industries";
import { industriesPageStructuredData, breadcrumbStructuredData } from "@/lib/structured-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Target, TrendingUp } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";

export const metadata: Metadata = {
  title: "Industry IoT Solutions - Manufacturing & More | Entraiot",
  description: "Industry-specific IoT solutions for 8+ sectors. Proven results: 30-50% cost reduction. Trusted by leading businesses. Get free consultation today.",
  keywords: ["IoT logistics", "smart manufacturing", "healthcare IoT", "smart cities", "IoT agriculture", "retail automation", "energy management"],
  alternates: {
    canonical: "https://entraiot.com/industries",
  },
  openGraph: {
    title: "Industry IoT Solutions - Manufacturing & More | Entraiot",
    description: "Industry-specific IoT solutions for 8+ sectors. Proven results: 30-50% cost reduction. Trusted by leading businesses.",
    url: "https://entraiot.com/industries",
  },
};

export default function IndustriesPage() {
  return (
    <>
      <Script
        id="industries-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(industriesPageStructuredData),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: "Home", url: "https://entraiot.com" },
            { name: "Industries", url: "https://entraiot.com/industries" }
          ])),
        }}
      />
      <h1 className="sr-only">Industries We Serve</h1>
      
      <div className="min-h-screen gradient-accent">
        {/* Value-Driven Content Section */}
        <section className="relative gradient-accent overflow-hidden">
          {/* Breadcrumbs */}
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Industries" }
                ]} 
                className="mb-0 [&_ol]:text-black [&_span]:text-black"
              />
            </div>
          </div>
          
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
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
            <div className="max-w-6xl mx-auto">
            {/* Intro Content */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="mb-16 text-center">
                <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                  <Globe className="h-6 w-6 mr-2 text-blue-600" />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Industry Expertise</span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Tailored <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT Solutions</span> for Every Industry
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  Each industry has unique challenges and opportunities. Our IoT solutions are customized to address specific needs, 
                  deliver measurable results and drive transformation across diverse sectors.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center mb-4">
                        <Target className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 text-center">Industry-Specific</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Solutions designed for your industry&apos;s unique requirements and workflows.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 text-center">Proven Results</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Tested solutions that deliver measurable improvements in efficiency and ROI.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center mb-4">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 text-center">Scalable Growth</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Solutions that grow with your business, from small pilots to enterprise-wide deployment.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollAnimation>

            {/* Key Benefits */}
            <ScrollAnimation direction="up" delay={0.4}>
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Universal <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Benefits</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    While each industry has specific needs, our IoT solutions deliver core benefits across all sectors:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start space-x-3 p-4 glass dark:bg-slate-900/90 backdrop-blur-sm rounded-lg border border-border/20 dark:border-slate-700">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-slate-50 text-sm mb-1">Real-Time Monitoring</h4>
                      <p className="text-xs text-muted-foreground dark:text-slate-300">Track assets, processes and performance instantly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 glass dark:bg-slate-900/90 backdrop-blur-sm rounded-lg border border-border/20 dark:border-slate-700">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-slate-50 text-sm mb-1">Cost Reduction</h4>
                      <p className="text-xs text-muted-foreground dark:text-slate-300">Reduce operational costs by 30-50%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 glass dark:bg-slate-900/90 backdrop-blur-sm rounded-lg border border-border/20 dark:border-slate-700">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-slate-50 text-sm mb-1">Improved Efficiency</h4>
                      <p className="text-xs text-muted-foreground dark:text-slate-300">Optimize workflows and resource utilization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 glass dark:bg-slate-900/90 backdrop-blur-sm rounded-lg border border-border/20 dark:border-slate-700">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-slate-50 text-sm mb-1">Data-Driven Decisions</h4>
                      <p className="text-xs text-muted-foreground dark:text-slate-300">Make informed decisions with actionable insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Industries />
      </div>
    </>
  );
} 
