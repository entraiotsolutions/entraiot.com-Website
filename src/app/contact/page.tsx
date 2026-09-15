import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import Contact from "@/components/sections/contact";
import { contactPageStructuredData, breadcrumbStructuredData } from "@/lib/structured-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageSquare, Clock, Users, Shield, HelpCircle } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";

export const metadata: Metadata = {
  title: "Contact Us - IoT Consultation & Free Assessment | Entraiot",
  description: "Expert IoT consultation in Chennai. 24-hour response, free assessment. Trusted by 8+ industries. Call +91 99444 42061 or get started online.",
  keywords: ["contact entraiot", "IoT consultation", "Chennai IoT company", "project inquiry", "demo request"],
  alternates: {
    canonical: "https://entraiot.com/contact",
  },
  openGraph: {
    title: "Contact Us - IoT Consultation & Assessment | Entraiot",
    description: "Expert IoT consultation in Chennai. 24-hour response, free assessment. Trusted by 8+ industries. Get started today.",
    url: "https://entraiot.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageStructuredData),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: "Home", url: "https://entraiot.com" },
            { name: "Contact", url: "https://entraiot.com/contact" }
          ])),
        }}
      />
      <h1 className="sr-only">Contact Entraiot Solutions - IoT Consultation & Free Assessment</h1>
      
      <div className="min-h-screen gradient-accent">
        {/* Value-Driven Content Section */}
        <section className="relative gradient-accent overflow-hidden">
          {/* Breadcrumbs */}
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Contact" }
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
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Why Contact Us</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Get Expert <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT Consultation</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Connect with our IoT experts to discuss your project needs and discover how we can help transform your business.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">Fast Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Get a response within 24 hours. Our team prioritizes your inquiries and provides quick, actionable guidance.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">Expert Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Work with experienced IoT engineers & AI specialists. Get insights from professionals who understand your industry.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Free Consultation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        No obligation consultation. Discuss your project requirements and get expert advice on IoT implementation strategies.
                      </p>
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
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Frequently Asked Questions</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Common <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Questions</span>
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                        How quickly will I get a response?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        We respond to all inquiries within 24 hours. For urgent projects, call us directly at +91 99444 42061 for immediate assistance.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                        What information should I include?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Share your industry, project goals, current challenges & timeline. This helps us provide tailored recommendations & solutions.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                        Is the consultation free?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Yes, initial consultations are free. We discuss your requirements, provide expert advice & outline potential solutions without any obligation.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                        Can I visit your office?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Yes, we&apos;re located in Chennai. Visit us at W-126, 3rd Floor, 3rd Ave, Anna Nagar. Schedule an appointment for the best experience.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Contact />
      </Suspense>
      </div>
      
      {/* Multi-Step Form Section - Hidden for now */}
      {/* <section className="section-padding bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Start Your <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT Journey?</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Get a personalized consultation and project assessment from our IoT experts.
              </p>
            </div>
            
            <MultiStepForm />
          </div>
        </div>
      </section> */}
    </>
  );
} 