import type { Metadata } from "next";
import Script from "next/script";
import { 
  Download,
  MessageCircle,
  Bluetooth,
  Radio,
  CheckCircle,
  Star,
  Zap,
  Smartphone,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { CTAButton } from "@/components/ui/cta-button";
import { productsStructuredData, breadcrumbStructuredData } from "@/lib/structured-data";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";

export const metadata: Metadata = {
  title: "Enterprise IoT Devices - UHF RFID, NFC & BLE | Entraiot",
  description: "Enterprise-grade IoT hardware: UHF RFID, NFC modules, BLE devices. Proven reliability, 24/7 support. Trusted by businesses worldwide. Get pricing today.",
  keywords: ["UHF RFID readers", "NFC modules", "BLE devices", "IoT hardware", "RFID solutions", "NFC readers", "Bluetooth Low Energy"],
  alternates: {
    canonical: "https://entraiot.com/products",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://entraiot.com/products",
    title: "Enterprise IoT Devices - UHF RFID, NFC & BLE | Entraiot",
    description: "Enterprise-grade IoT hardware: UHF RFID, NFC modules, BLE devices. Proven reliability, 24/7 support. Trusted by businesses worldwide.",
    siteName: "Entraiot Solutions",
    images: [
      {
        url: "https://entraiot.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Entraiot Solutions Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise IoT Devices - UHF RFID, NFC & BLE | Entraiot",
    description: "Enterprise-grade IoT hardware: UHF RFID, NFC modules, BLE devices. Proven reliability, 24/7 support. Trusted by businesses worldwide.",
    images: ["https://entraiot.com/logo.webp"],
  },
};

// Product categories and data
const productCategories = [
  {
    id: "uhf-rfid",
    title: "UHF RFID Readers",
    description: "High-performance UHF RFID readers for enterprise applications",
    icon: Radio,
    color: "from-blue-600 to-indigo-600",
    products: [
      {
        id: "model-a1",
        name: "EntraIoT UHF Active Reader Model-A1",
        description: "Advanced active RFID reader with long-range capabilities",
        features: ["Long-range detection", "Active tag support", "Industrial grade", "Real-time tracking"],
        specifications: {
          "Frequency": "433 MHz",
          "Range": "Up to 100m",
          "Power": "12V DC",
          "Interface": "Ethernet, RS485"
        },
        category: "Active RFID"
      },
      {
        id: "model-p1",
        name: "EntraIoT UHF Passive Fixed Reader Model-P1",
        description: "Fixed installation passive RFID reader for asset tracking",
        features: ["Passive tag support", "Fixed installation", "High accuracy", "Multi-tag reading"],
        specifications: {
          "Frequency": "860-960 MHz",
          "Range": "Up to 8m",
          "Power": "24V DC",
          "Interface": "Ethernet, RS232"
        },
        category: "Passive RFID"
      },
      {
        id: "model-p4e",
        name: "EntraIoT UHF 4-Port Ethernet Reader Model-P4E",
        description: "Multi-port Ethernet RFID reader for high-volume applications",
        features: ["4 antenna ports", "Ethernet connectivity", "High throughput", "Scalable solution"],
        specifications: {
          "Frequency": "860-960 MHz",
          "Antennas": "4 ports",
          "Power": "24V DC",
          "Interface": "Ethernet"
        },
        category: "Multi-port RFID"
      },
      {
        id: "model-p2u",
        name: "EntraIoT UHF 2-Port USB Reader Model-P2U",
        description: "Compact USB RFID reader with dual antenna support",
        features: ["USB connectivity", "2 antenna ports", "Compact design", "Plug-and-play"],
        specifications: {
          "Frequency": "860-960 MHz",
          "Antennas": "2 ports",
          "Power": "USB powered",
          "Interface": "USB 2.0"
        },
        category: "USB RFID"
      },
      {
        id: "model-h1",
        name: "EntraIoT UHF Handheld Reader Model-H1 (C72)",
        description: "Portable handheld RFID reader for mobile applications",
        features: ["Handheld design", "Battery powered", "Mobile connectivity", "Rugged construction"],
        specifications: {
          "Frequency": "860-960 MHz",
          "Range": "Up to 5m",
          "Battery": "Li-ion rechargeable",
          "Interface": "WiFi, Bluetooth"
        },
        category: "Handheld RFID"
      },
      {
        id: "model-c1",
        name: "EntraIoT UHF Chip Reader Model-C1 (PR920)",
        description: "Compact chip-based RFID reader for embedded applications",
        features: ["Chip-based design", "Compact form factor", "Low power consumption", "Embedded integration"],
        specifications: {
          "Frequency": "860-960 MHz",
          "Range": "Up to 2m",
          "Power": "5V DC",
          "Interface": "SPI, I2C"
        },
        category: "Chip RFID"
      }
    ]
  },
  {
    id: "nfc-readers",
    title: "NFC Readers & Modules",
    description: "Near Field Communication readers and modules for contactless applications",
    icon: Smartphone,
    color: "from-purple-600 to-pink-600",
    products: [
      {
        id: "model-n1",
        name: "EntraIoT NFC USB Reader Model-N1 (ACR122U)",
        description: "USB NFC reader for desktop and embedded applications",
        features: ["USB connectivity", "NFC Type A/B support", "Contactless smart cards", "Easy integration"],
        specifications: {
          "Frequency": "13.56 MHz",
          "Range": "Up to 5cm",
          "Power": "USB powered",
          "Interface": "USB 2.0"
        },
        category: "USB NFC"
      },
      {
        id: "model-n2",
        name: "EntraIoT NFC Bluetooth Reader Model-N2 (ACR1255U-J1)",
        description: "Bluetooth-enabled NFC reader for mobile applications",
        features: ["Bluetooth connectivity", "Mobile compatibility", "NFC Type A/B/F", "Wireless operation"],
        specifications: {
          "Frequency": "13.56 MHz",
          "Range": "Up to 5cm",
          "Connectivity": "Bluetooth 4.0",
          "Interface": "USB, Bluetooth"
        },
        category: "Bluetooth NFC"
      },
      {
        id: "model-n3",
        name: "EntraIoT NFC Bluetooth Reader Model-N3 (ACR1311U-N2)",
        description: "Advanced Bluetooth NFC reader with enhanced features",
        features: ["Enhanced Bluetooth", "NFC Type A/B/F", "Mobile payment support", "Secure element"],
        specifications: {
          "Frequency": "13.56 MHz",
          "Range": "Up to 5cm",
          "Connectivity": "Bluetooth 5.0",
          "Interface": "USB, Bluetooth"
        },
        category: "Advanced NFC"
      },
      {
        id: "model-t1",
        name: "EntraIoT NFC Tag IC Model-T1 (Panasonic MN63Y1213)",
        description: "High-performance NFC tag IC for various applications",
        features: ["High memory capacity", "Fast read/write", "Tamper resistant", "ISO 14443 compliant"],
        specifications: {
          "Memory": "8KB EEPROM",
          "Frequency": "13.56 MHz",
          "Protocol": "ISO 14443 Type A",
          "Interface": "Contactless"
        },
        category: "NFC Tag IC"
      },
      {
        id: "model-m1",
        name: "EntraIoT NFC DESFire Module Model-M1 (M890)",
        description: "DESFire EV2 compliant NFC module for secure applications",
        features: ["DESFire EV2 compliant", "High security", "Multi-application support", "Contactless interface"],
        specifications: {
          "Memory": "32KB EEPROM",
          "Security": "DESFire EV2",
          "Frequency": "13.56 MHz",
          "Interface": "Contactless"
        },
        category: "Secure NFC"
      },
      {
        id: "model-i1",
        name: "EntraIoT NFC IC Model-I1 (ST Electronics M24LR04E-RDW6T/2)",
        description: "Dual interface NFC IC with RF and I2C communication",
        features: ["Dual interface", "RF and I2C", "Energy harvesting", "Low power consumption"],
        specifications: {
          "Memory": "4KB EEPROM",
          "Interface": "RF + I2C",
          "Frequency": "13.56 MHz",
          "Power": "Energy harvesting"
        },
        category: "Dual Interface NFC"
      },
      {
        id: "model-d1",
        name: "EntraIoT NFC Dynamic Tag Module Model-D1 (DTAG100)",
        description: "Dynamic NFC tag module with programmable content",
        features: ["Dynamic content", "Programmable", "URL redirection", "NFC Forum compliant"],
        specifications: {
          "Memory": "1KB EEPROM",
          "Frequency": "13.56 MHz",
          "Protocol": "NFC Forum Type 2",
          "Interface": "Contactless"
        },
        category: "Dynamic NFC"
      }
    ]
  },
  {
    id: "ble-devices",
    title: "BLE (Bluetooth Low Energy) Devices",
    description: "Bluetooth Low Energy devices for IoT and healthcare applications",
    icon: Bluetooth,
    color: "from-green-600 to-emerald-600",
    products: [
      {
        id: "model-b1",
        name: "EntraIoT BLE Access Controller Model-B1 (CBox Access)",
        description: "BLE-based access control system for secure entry management",
        features: ["BLE connectivity", "Access control", "Mobile app integration", "Secure authentication"],
        specifications: {
          "Connectivity": "Bluetooth 5.0",
          "Range": "Up to 50m",
          "Power": "Battery powered",
          "Interface": "BLE, Mobile App"
        },
        category: "Access Control"
      },
      {
        id: "model-bp1",
        name: "EntraIoT BLE BP Monitor Model-BP1 (iHealth Cuff)",
        description: "Bluetooth blood pressure monitor for healthcare applications",
        features: ["Medical grade accuracy", "BLE connectivity", "Mobile health apps", "Data logging"],
        specifications: {
          "Connectivity": "Bluetooth 4.0",
          "Range": "Up to 10m",
          "Power": "Rechargeable battery",
          "Interface": "BLE, Mobile App"
        },
        category: "Health Monitoring"
      },
      {
        id: "model-ws1",
        name: "EntraIoT BLE Weigh Scale Model-WS1 (iHealth)",
        description: "Smart weighing scale with Bluetooth connectivity",
        features: ["High precision weighing", "BLE connectivity", "Body composition analysis", "Health tracking"],
        specifications: {
          "Connectivity": "Bluetooth 4.0",
          "Range": "Up to 10m",
          "Power": "Battery powered",
          "Interface": "BLE, Mobile App"
        },
        category: "Health Monitoring"
      },
      {
        id: "model-g1",
        name: "EntraIoT BLE Glucose Meter Model-G1 (iHealth)",
        description: "Bluetooth glucose meter for diabetes management",
        features: ["Medical accuracy", "BLE connectivity", "Data synchronization", "Trend analysis"],
        specifications: {
          "Connectivity": "Bluetooth 4.0",
          "Range": "Up to 10m",
          "Power": "Battery powered",
          "Interface": "BLE, Mobile App"
        },
        category: "Health Monitoring"
      },
      {
        id: "model-f1",
        name: "EntraIoT BLE Fitness Integration Model-F1 (Fitbit Ionic)",
        description: "Fitness tracker with comprehensive health monitoring",
        features: ["Fitness tracking", "Heart rate monitoring", "Sleep tracking", "GPS integration"],
        specifications: {
          "Connectivity": "Bluetooth 4.0",
          "Range": "Up to 10m",
          "Power": "Rechargeable battery",
          "Interface": "BLE, Mobile App"
        },
        category: "Fitness Tracking"
      },
      {
        id: "model-cn1",
        name: "EntraIoT BLE Custom NFC Reader Model-CN1",
        description: "Custom BLE NFC reader for specialized applications",
        features: ["Custom design", "BLE + NFC", "Flexible integration", "Custom firmware"],
        specifications: {
          "Connectivity": "Bluetooth 5.0 + NFC",
          "Range": "BLE: 50m, NFC: 5cm",
          "Power": "Rechargeable battery",
          "Interface": "BLE, NFC, Custom"
        },
        category: "Custom BLE"
      }
    ]
  }
];

export default function ProductsPage() {
  return (
    <>
      <Script
        id="products-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productsStructuredData),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: "Home", url: "https://entraiot.com" },
            { name: "Products", url: "https://entraiot.com/products" }
          ])),
        }}
      />
      
      <div className="min-h-screen gradient-accent">
        {/* Hero Section */}
        <section className="relative gradient-accent overflow-hidden">
          {/* Breadcrumbs */}
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Products" }
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
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-40">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="text-center mb-20">
                <ScrollAnimation direction="up" delay={0.2}>
                  <Badge variant="outline" className="mb-6 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                    <Sparkles className="h-6 w-6 mr-2 text-blue-600" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Products</span>
                  </Badge>
                </ScrollAnimation>
                
                <ScrollAnimation direction="up" delay={0.4}>
                  <h1 className="text-5xl font-[900] text-[#0f172a] mb-12">
                    IoT Hardware <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Products</span>
                  </h1>
                </ScrollAnimation>
                
                <ScrollAnimation direction="up" delay={0.6}>
                  <p className="text-xl text-[#475569] max-w-4xl mx-auto">
                    Complete range of <span className="text-[#2563eb] font-semibold">UHF RFID readers, NFC modules and BLE devices</span>. Built for enterprise IoT applications. From industrial RFID readers to healthcare BLE devices. Our hardware meets the demanding requirements of modern IoT deployments.
                  </p>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        {productCategories.map((category) => (
          <section key={category.id} id={category.id} className="py-16 relative scroll-mt-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent dark:via-blue-950/10"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-7xl mx-auto">
                {/* Category Header */}
                <ScrollAnimation direction="up" delay={0.2}>
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                      <category.icon className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </category.icon>
                      {category.title}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-4">
                      {category.title}
                    </h2>
                    <p className="text-lg text-[#475569] max-w-3xl mx-auto">
                      {category.description}
                    </p>
                  </div>
                </ScrollAnimation>

                {/* Products Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                  {category.products.map((product, productIndex) => {
                    const getDirection = () => {
                      const index = productIndex % 3;
                      if (index === 0) return "left";
                      if (index === 1) return "up";
                      return "right";
                    };
                    return (
                    <ScrollAnimation 
                      key={product.id} 
                      direction={getDirection()} 
                      delay={0.4 + productIndex * 0.1}
                      duration={0.8}
                      once={false}
                    >
                      <div className="group relative w-full h-full max-w-sm">
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
                        <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                          {/* Product Header */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className={`bg-gradient-to-r ${category.color} text-white text-xs`}>
                                {product.category}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#0f172a] mb-2">
                              {product.name}
                            </h3>
                            <p className="text-sm text-[#475569] mb-4">
                              {product.description}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="space-y-3 flex-grow min-h-[120px]">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Key Features:</h4>
                            <div className="space-y-2">
                              {product.features.slice(0, 3).map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                  <span className="text-xs text-[#475569]">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Specifications */}
                          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2">Specifications:</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-slate-500 dark:text-slate-400">{key}:</span>
                                  <span className="text-slate-700 dark:text-slate-300 font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </ScrollAnimation>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden gradient-accent">
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
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </Zap>
                Ready to Deploy?
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[900] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] bg-clip-text text-transparent mb-6 leading-tight">
                Start Your IoT Hardware Journey
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-4 mb-8">
                <p className="text-lg md:text-xl text-[#475569] leading-relaxed font-bold">
                  Need help selecting the right hardware for your IoT project?
                </p>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
                  Our experts can help you choose the perfect combination of RFID, NFC and BLE devices 
                  for your specific application requirements.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton 
                  variant="primary" 
                  size="lg" 
                  href="/contact"
                  className="group"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consult Our Experts
                </CTAButton>
                <CTAButton 
                  variant="download" 
                  size="lg" 
                  href="/resources"
                  className="group"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Catalog
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

