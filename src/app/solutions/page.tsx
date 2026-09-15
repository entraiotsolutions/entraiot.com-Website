import type { Metadata } from "next";
import Script from "next/script";
import Solutions from "@/components/sections/solutions";
import { solutionsPageStructuredData, breadcrumbStructuredData } from "@/lib/structured-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, HelpCircle, TrendingUp, Zap, Shield } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";

export const metadata: Metadata = {
  title: "IoT Solutions - Deployment, Dashboards & AI | Entraiot",
  description: "Proven IoT solutions: deployment, dashboards, predictive maintenance. 98% uptime, 40% cost reduction. Trusted by enterprises. Get free consultation.",
  keywords: ["IoT solutions", "real-time dashboards", "predictive maintenance", "IoT deployment", "custom applications", "secure integration"],
  alternates: {
    canonical: "https://entraiot.com/solutions",
  },
  openGraph: {
    title: "IoT Solutions - Deployment, Dashboards & AI | Entraiot",
    description: "Proven IoT solutions: deployment, dashboards, predictive maintenance. 98% uptime, 40% cost reduction. Trusted by enterprises.",
    url: "https://entraiot.com/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <Script
        id="solutions-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(solutionsPageStructuredData),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: "Home", url: "https://entraiot.com" },
            { name: "Solutions", url: "https://entraiot.com/solutions" }
          ])),
        }}
      />
      <h1 className="sr-only">Enterprise IoT & AI Solutions Services</h1>
      
      <div className="min-h-screen gradient-accent">
        {/* Value-Driven Content Section */}
        <section className="relative gradient-accent overflow-hidden">
          {/* Breadcrumbs */}
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Solutions" }
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
            {/* Benefits Section */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="mb-16">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                    <CheckCircle className="h-6 w-6 mr-2 text-blue-600" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Key Benefits</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Why Choose Our <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT Solutions</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Our comprehensive IoT solutions deliver measurable results, improve efficiency and drive business growth.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">Real-Time Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get instant visibility into operations. Monitor assets, track performance and make data-driven decisions in real time.
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>Live dashboards and analytics</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>Instant alerts and notifications</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">Cost Reduction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Reduce operational costs by up to 40%. Optimize resource usage, prevent downtime and improve efficiency.
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>Predictive maintenance savings</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>Energy consumption optimization</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Secure & Scalable</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Enterprise-grade security with encryption. Scales from small deployments to large enterprise networks.
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>End-to-end encryption</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>Cloud and on-premise options</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollAnimation>

            {/* FAQ Section */}
            <ScrollAnimation direction="up" delay={0.4}>
              <div className="mb-16">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                    <HelpCircle className="h-6 w-6 mr-2 text-blue-600" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">FAQs</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Solution <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Questions</span>
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg">How long does IoT deployment take?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Typical deployments take 4-8 weeks depending on scope. Simple sensor installations can be faster, while complex enterprise systems may require 12+ weeks for full integration.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg">What ROI should I expect?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Most businesses see 150-300% ROI within the first year. Benefits include reduced downtime, lower maintenance costs, improved efficiency and better decision-making through data insights.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Do you provide training and support?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Yes, we provide comprehensive training for your team and 24/7 support. This includes documentation, video tutorials, live training sessions and ongoing technical support.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Can solutions integrate with existing systems?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Absolutely. Our solutions integrate with ERP systems, cloud platforms, databases, and APIs. We ensure seamless connectivity with your current infrastructure.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Solutions />
      </div>
    </>
  );
} 