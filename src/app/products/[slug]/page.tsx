import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Star,
  Users,
  Clock,
  Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, GlowEffect, Magnetic, CursorConnector } from "@/components/ui/particle-effects";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { productStructuredData } from "@/lib/structured-data";

// Product data
const products = [
  {
    id: "iot-deployment",
    title: "End-to-End IoT Deployment Solutions - Enterprise Implementation & Integration Services",
    description: "We set up your IoT system from start to finish. We handle sensors, cloud tools, and everything in between. Our setup grows with your business. Get started today.",
    features: [
      "Sensor Integration & Configuration",
      "Cloud Analytics Platform",
      "Real-time Data Processing",
      "Scalable Infrastructure",
      "24/7 Monitoring & Support"
    ],
    benefits: [
      "Reduced deployment time by 60%",
      "Improved operational efficiency",
      "Real-time insights and analytics",
      "Scalable and future-proof solution"
    ],
    demoUrl: "/contact/service/iot-deployment/demo",
    quoteUrl: "/contact/service/iot-deployment",
    image: "/RFID.webp",
    category: "IoT Solutions",
    price: "Contact for pricing",
    duration: "4-8 weeks",
    complexity: "Advanced"
  },
  {
    id: "predictive-maintenance",
    title: "AI-Powered Predictive Maintenance - Machine Learning & Equipment Health Monitoring Solutions",
    description: "Our AI finds problems before they happen. It spots patterns and warns you early. This cuts downtime and makes equipment last longer.",
    features: [
      "AI Pattern Recognition",
      "Predictive Analytics",
      "Equipment Health Monitoring",
      "Automated Alerts",
      "Maintenance Scheduling"
    ],
    benefits: [
      "Reduced downtime by 40%",
      "Extended equipment lifespan",
      "Lower maintenance costs",
      "Improved safety and reliability"
    ],
    demoUrl: "/contact/service/predictive-maintenance/demo",
    quoteUrl: "/contact/service/predictive-maintenance",
    image: "/NFC.webp",
    category: "AI Solutions",
    price: "Contact for pricing",
    duration: "6-12 weeks",
    complexity: "Expert"
  },
  {
    id: "smart-dashboards",
    title: "Real-Time Smart Dashboards - IoT Analytics & Data Visualization Platform",
    description: "See your data in real time. Our dashboards show what's happening right now. Make better decisions faster with clear, easy-to-read charts. Get a demo today.",
    features: [
      "Real-time Data Visualization",
      "Custom Dashboard Design",
      "Multi-device Compatibility",
      "Interactive Analytics",
      "Role-based Access Control"
    ],
    benefits: [
      "Faster decision making",
      "Improved data visibility",
      "Enhanced user experience",
      "Reduced training time"
    ],
    demoUrl: "/contact/service/smart-dashboards/demo",
    quoteUrl: "/contact/service/smart-dashboards",
    image: "/RFID2.webp",
    category: "Dashboard Solutions",
    price: "Contact for pricing",
    duration: "2-4 weeks",
    complexity: "Intermediate"
  }
];

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find(p => p.id === resolvedParams.slug);
  
  if (!product) {
    // Return metadata without canonical URL for non-existent pages (404)
    // This prevents canonical URLs pointing to non-indexable pages
    return {
      title: "Product Not Found - Entraiot Solutions",
      description: "The requested product page could not be found. Browse our IoT hardware products including UHF RFID readers, NFC modules, and BLE devices.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Generate enhanced title with alternative keywords to differentiate from H1
  // Use synonyms and related phrases for SEO while H1 remains user-friendly
  let enhancedTitle: string;
  if (product.id === "iot-deployment") {
    enhancedTitle = "Enterprise IoT Implementation Services | Entraiot";
  } else if (product.id === "predictive-maintenance") {
    enhancedTitle = "AI Equipment Monitoring Solutions | Entraiot";
  } else if (product.id === "smart-dashboards") {
    enhancedTitle = "Real-Time IoT Analytics & Visualization | Entraiot";
  } else {
    enhancedTitle = product.title;
    if (!enhancedTitle.includes("Entraiot Solutions") && !enhancedTitle.includes("Entraiot")) {
      enhancedTitle = `${enhancedTitle} | Entraiot Solutions`;
    }
  }
  
  // Ensure all titles meet minimum length requirements (above 200 pixels / ~20 characters)
  // Product titles are already enhanced, so we just ensure brand name is included

  return {
    title: enhancedTitle,
    description: product.description,
    keywords: [product.category, "IoT solutions", "AI solutions", "smart automation"],
    alternates: {
      canonical: `https://entraiot.com/products/${product.id}`,
    },
    openGraph: {
      title: enhancedTitle,
      description: product.description,
      url: `https://entraiot.com/products/${product.id}`,
      images: [
        {
          url: `https://entraiot.com${product.image}`,
          width: 1200,
          height: 630,
          alt: product.id === "iot-deployment" 
            ? "IoT Deployment Solutions - Enterprise Implementation"
            : product.id === "predictive-maintenance"
            ? "AI Predictive Maintenance - Equipment Health Monitoring"
            : "Real-Time Smart Dashboards - IoT Analytics Platform",
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find(p => p.id === resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  // Generate structured data for the product
  const productSchema = {
    ...productStructuredData,
    "name": product.title,
    "description": product.description,
    "image": `https://entraiot.com${product.image}`,
    "offers": {
      ...productStructuredData.offers,
      "name": product.title,
      "description": product.description
    }
  };

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <section className="relative section-padding bg-gradient-to-br from-background to-muted/30 overflow-visible">
        <div className="absolute inset-0 overflow-hidden">
          <ParticleField count={20} colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981"]} size={3} speed={2} opacity={0.6} />
          <FloatingElement intensity={6} speed={1.5} className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <FloatingElement intensity={8} speed={2} className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
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
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: "Home", href: "/" }, 
              { label: "Products", href: "/products" }, 
              { label: product.title }
            ]} />
          </div>

          {/* Back Button */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="mb-8">
              <Magnetic strength={0.1}>
                <Button variant="outline" className="group glass backdrop-blur-sm">
                  <Link href="/products" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Products
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </ScrollAnimation>

          {/* Product Header */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Badge className="bg-primary/90 text-primary-foreground">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground ml-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{product.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>{product.complexity}</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
                {product.description}
              </p>
            </div>
          </ScrollAnimation>

          {/* Product Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <GlowEffect color="#6366f1" intensity={0}>
                <Card className="glass backdrop-blur-sm border border-border/20 overflow-hidden mb-8">
                  <div className="relative h-96 overflow-hidden">
                    <OptimizedImage
                      src={product.image}
                      alt={product.id === "iot-deployment" 
                        ? "IoT Deployment Solutions - Enterprise Implementation"
                        : product.id === "predictive-maintenance"
                        ? "AI Predictive Maintenance - Equipment Health Monitoring"
                        : "Real-Time Smart Dashboards - IoT Analytics Platform"}
                      width={800}
                      height={384}
                      className="w-full h-full object-cover"
                      hoverEffect={false}
                    />
                  </div>
                  
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-8">
                      {/* Features */}
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Business Benefits</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {product.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </GlowEffect>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Pricing & CTA */}
                <GlowEffect color="#8b5cf6" intensity={0}>
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Get Started</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{product.price}</div>
                        <p className="text-sm text-muted-foreground">Custom pricing based on requirements</p>
                      </div>
                      
                      <div className="space-y-3">
                        <Magnetic strength={0.1}>
                          <Button size="lg" variant="outline" className="w-full group glass backdrop-blur-sm">
                            <Link href={product.demoUrl} className="flex items-center justify-center w-full">
                              <Play className="mr-2 h-5 w-5" />
                              View Demo
                            </Link>
                          </Button>
                        </Magnetic>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{product.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                          <span className="text-muted-foreground">Complexity:</span>
                          <span className="font-medium">{product.complexity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </GlowEffect>

                {/* Contact Info */}
                <GlowEffect color="#10b981" intensity={0}>
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        Need Help?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our experts are ready to help you implement this solution.
                      </p>
                      <Button variant="outline" className="w-full">
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </GlowEffect>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
