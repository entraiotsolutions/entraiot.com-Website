import type { Metadata } from "next";
import Contact from "@/components/sections/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageSquare, Clock, Users, Shield, HelpCircle } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import { Suspense } from "react";

interface ContactCleanUrlPageProps {
  params: Promise<{ type: string; value: string }>;
}

export async function generateStaticParams() {
  const industries = [
    "logistics",
    "manufacturing",
    "hospitality",
    "energy-management",
    "smart-cities",
    "healthcare",
    "smart-retail",
    "agriculture",
  ];

  const services = [
    "iot-consulting",
    "ai-solutions",
    "smart-automation",
  ];

  const products = [
    "iot-deployment",
    "predictive-maintenance",
    "smart-dashboards",
  ];

  const params: { type: string; value: string }[] = [];

  // Generate params for industries
  industries.forEach((industry) => {
    params.push({ type: "industry", value: industry });
  });

  // Generate params for services
  services.forEach((service) => {
    params.push({ type: "service", value: service });
  });

  // Generate params for products
  products.forEach((product) => {
    params.push({ type: "product", value: product });
  });

  return params;
}

export async function generateMetadata({ params }: ContactCleanUrlPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { type, value } = resolvedParams;
  
  // Generate dynamic descriptions based on type and value
  let description = "Expert IoT consultation in Chennai. 24-hour response, free assessment. Trusted by 8+ industries. Get started today.";
  
  if (type === "industry" && value) {
    const industryName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
    description = `Expert IoT solutions for ${industryName}. Proven results, 30-50% cost reduction. Trusted by industry leaders. Get free consultation.`;
  } else if (type === "service" && value) {
    const serviceName = value.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    description = `${serviceName} services from IoT experts. 150-300% ROI guaranteed. Trusted by enterprises. Free consultation available.`;
  } else if (type === "product" && value) {
    const productName = value.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    description = `${productName} solutions with expert support. Proven results, 24/7 monitoring. Trusted by businesses. Get pricing today.`;
  }
  
  // Generate enhanced titles with keywords based on type and value
  // Keep titles concise to stay under 561 pixels (55-58 chars max)
  let title = `Contact Us - ${type.charAt(0).toUpperCase() + type.slice(1)} Consultation | Entraiot`;
  
  if (type === "industry" && value) {
    const industryName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
    title = `Contact Us - ${industryName} IoT Solutions | Entraiot`;
  } else if (type === "service" && value) {
    const serviceName = value.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    title = `Contact Us - ${serviceName} Services | Entraiot`;
  } else if (type === "product" && value) {
    const productName = value.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    title = `Contact Us - ${productName} Solutions | Entraiot`;
  }
  
  return {
    title,
    description,
    keywords: ["IoT consultation", "contact entraiot", "Chennai IoT company", "project inquiry"],
    alternates: {
      canonical: `https://entraiot.com/contact/${type}/${value}`,
    },
    openGraph: {
      title,
      description,
      url: `https://entraiot.com/contact/${type}/${value}`,
    },
  };
}

export default async function ContactCleanUrlPage({ params }: ContactCleanUrlPageProps) {
  const resolvedParams = await params;
  const { type, value } = resolvedParams;
  
  // Generate unique H1 based on type and value
  let h1Text = "Contact Entraiot Solutions";
  
  if (type === "industry" && value) {
    const industryName = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
    h1Text = `Contact Entraiot Solutions - ${industryName} IoT Solutions & Consultation`;
  } else if (type === "service" && value) {
    const serviceName = value.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    h1Text = `Contact Entraiot Solutions - ${serviceName} Services & Consultation`;
  } else if (type === "product" && value) {
    const productName = value.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    h1Text = `Contact Entraiot Solutions - ${productName} Solutions & Inquiry`;
  }

  return (
    <>
      <h1 className="sr-only">{h1Text}</h1>
      
      {/* Value-Driven Content Section */}
      <section className="relative py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Benefits Section */}
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="mb-16">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                    Why Contact Us
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
                        Work with experienced IoT engineers and AI specialists. Get insights from professionals who understand your industry.
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
                  <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30">
                    <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                    Frequently Asked Questions
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
                        Share your industry, project goals, current challenges and timeline. This helps us provide tailored recommendations and solutions.
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
                        Yes, initial consultations are free. We discuss your requirements, provide expert advice and outline potential solutions without any obligation.
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
    </>
  );
}

