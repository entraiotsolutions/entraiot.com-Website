import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { resourcesStructuredData, breadcrumbStructuredData } from "@/lib/structured-data";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle, FileText, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "IoT AI Knowledge Base - Case Studies & Guides | Entraiot",
  description: "IoT case studies, AI whitepapers, technical docs and implementation guides. Free resources for smart automation solutions. Download now.",
  keywords: ["IoT case studies", "AI whitepapers", "IoT documentation", "smart automation resources", "predictive maintenance guides", "IoT implementation", "technical resources"],
  alternates: {
    canonical: "https://entraiot.com/resources",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://entraiot.com/resources",
    title: "IoT AI Knowledge Base - Case Studies & Guides | Entraiot",
    description: "IoT case studies, AI whitepapers, technical docs and implementation guides. Free resources for smart automation solutions.",
    siteName: "Entraiot Solutions",
    images: [
      {
        url: "https://entraiot.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Entraiot Solutions Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IoT AI Knowledge Base - Case Studies & Guides | Entraiot",
    description: "IoT case studies, AI whitepapers, technical docs and implementation guides. Free resources for smart automation solutions.",
    images: ["https://entraiot.com/logo.webp"],
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Script
        id="resources-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resourcesStructuredData),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: "Home", url: "https://entraiot.com" },
            { name: "Resources", url: "https://entraiot.com/resources" }
          ])),
        }}
      />
      <div className="min-h-screen gradient-accent">
        {/* Hero Section */}
        <section className="relative gradient-accent overflow-hidden">
          {/* Breadcrumbs */}
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Resources" }
              ]} 
              className="mb-0 [&_ol]:text-slate-600 dark:[&_ol]:text-slate-300 [&_span]:text-slate-900 dark:[&_span]:text-slate-100"
            />
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
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 lg:pb-28">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <ScrollAnimation direction="up" delay={0.2}>
                <Badge variant="outline" className="mb-8 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                  <Sparkles className="h-6 w-6 mr-2 text-blue-600" />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Knowledge Hub</span>
                </Badge>
              </ScrollAnimation>
              
              <ScrollAnimation direction="up" delay={0.4}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-[#0f172a] mb-8 leading-tight">
                  IoT & AI <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Knowledge Hub</span>
                </h1>
              </ScrollAnimation>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <ScrollAnimation direction="up" delay={0.6}>
                  <p className="text-lg md:text-xl text-[#0f172a] leading-relaxed font-bold">
                    Technology should inspire transformation. Not complexity.
                  </p>
                </ScrollAnimation>
                <ScrollAnimation direction="up" delay={0.8}>
                  <p className="text-base md:text-lg text-[#475569] leading-relaxed">
                    Our resources help businesses understand IoT and AI. Learn how these tools change industries. They help you work faster and make better choices with data.
                  </p>
                </ScrollAnimation>
                <ScrollAnimation direction="up" delay={1.0}>
                  <p className="text-base md:text-lg text-[#475569] leading-relaxed">
                    See how smart tools make work better. Get help setting up IoT systems for your business. Read real stories and learn from experts.
                  </p>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 relative gradient-accent">
          <div className="absolute inset-0"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                    <CheckCircle className="h-6 w-6 mr-2 text-blue-600" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Success Stories</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-4">
                    Case Studies
                  </h2>
                  <p className="text-lg text-[#475569] max-w-3xl mx-auto">
                    Discover how businesses across different industries are using Entraiot&apos;s IoT and AI platforms 
                    to unlock new possibilities.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Smart Manufacturing Optimization */}
                <ScrollAnimation direction="up" delay={0.4}>
                  <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-[#0f172a] mb-3">
                        Smart Manufacturing Optimization
                      </h3>
                    </div>
                    <div className="space-y-4 flex-grow">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                          Challenge:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">High downtime and lack of machine visibility.</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Solution:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">IoT-enabled predictive maintenance and centralized dashboards.</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Result:
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300 font-semibold text-sm">35% reduction in unplanned downtime and improved overall efficiency.</p>
                      </div>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>

                {/* Fleet & Cargo Intelligence */}
                <ScrollAnimation direction="up" delay={0.6}>
                  <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-[#0f172a] mb-3">
                        Fleet & Cargo Intelligence
                      </h3>
                    </div>
                    <div className="space-y-4 flex-grow">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                          Challenge:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">Inconsistent delivery tracking and fuel inefficiency.</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Solution:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">Live GPS tracking, route analytics and condition monitoring sensors.</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Result:
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300 font-semibold text-sm">20% improvement in delivery time accuracy and fuel cost savings.</p>
                      </div>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>

                {/* Smart Energy Management */}
                <ScrollAnimation direction="up" delay={0.8}>
                  <div className="group relative md:col-span-2 lg:col-span-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-[#0f172a] mb-3">
                        Smart Energy Management
                      </h3>
                    </div>
                    <div className="space-y-4 flex-grow">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                          Challenge:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">Rising operational costs and poor energy visibility.</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Solution:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">Smart meters with AI-based load prediction and energy analytics.</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1 flex items-center text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Result:
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300 font-semibold text-sm">30% cost reduction and better sustainability reporting.</p>
                      </div>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Whitepapers Section */}
        <section className="py-16 relative gradient-accent">
          <div className="absolute inset-0"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Expert Insights</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-4">
                    Whitepapers & Technical Insights
                  </h2>
                  <p className="text-lg text-[#475569] max-w-3xl mx-auto">
                    Our whitepapers provide actionable insights and frameworks to help you plan, build and scale 
                    your IoT projects effectively.
                  </p>
                </div>
              </ScrollAnimation>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Building Scalable IoT Solutions */}
                <ScrollAnimation direction="up" delay={0.4}>
                  <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-[#0f172a] mb-3">
                        Building Scalable IoT Solutions: From Sensors to Insights
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-grow">
                      Explore the complete IoT ecosystem — from hardware integration to cloud analytics, 
                      dashboard visualization and data security.
                    </p>
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Whitepaper
                      </button>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>

                {/* AI-Driven Predictive Maintenance */}
                <ScrollAnimation direction="up" delay={0.6}>
                  <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                        AI-Driven Predictive Maintenance: The Future of Industrial Efficiency
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-grow">
                      Learn how AI algorithms and sensor networks work together to reduce downtime, 
                      extend asset life and optimize performance.
                    </p>
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Whitepaper
                      </button>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>

                {/* Secure IoT Infrastructure */}
                <ScrollAnimation direction="up" delay={0.8}>
                  <div className="group relative md:col-span-2 lg:col-span-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                        Secure IoT Infrastructure: Building Trust in Connected Environments
                      </h3>
                    </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-grow">
                      Understand how encryption, authentication and compliance play a vital role 
                      in enterprise-level IoT deployments.
                    </p>
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Whitepaper
                      </button>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-16 relative gradient-accent">
          <div className="absolute inset-0"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Technical Resources</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-4">
                    Documentation & Product Guides
                  </h2>
                  <p className="text-lg text-[#475569] max-w-3xl mx-auto">
                    Access complete technical documentation, API references, hardware setup guides and integration 
                    manuals to make your IoT deployment seamless.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={0.4}>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Solution Implementation Manuals",
                      icon: "📋",
                      description: "Step-by-step guides for implementing IoT solutions"
                    },
                    {
                      title: "Hardware & Sensor Configuration Guides",
                      icon: "⚙️",
                      description: "Complete hardware setup and configuration documentation"
                    },
                    {
                      title: "Cloud & API Integration Documentation",
                      icon: "☁️",
                      description: "API references and cloud integration guides"
                    },
                    {
                      title: "Platform Release Notes",
                      icon: "📝",
                      description: "Latest updates and feature releases "
                    }
                  ].map((resource, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700 h-full flex flex-col text-center">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {resource.icon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                          {resource.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed flex-grow">
                          {resource.description}
                        </p>
                        <div className="mt-auto">
                          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group-hover:shadow-lg text-sm">
                            Access Resource
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative gradient-accent overflow-hidden">
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
              <ScrollAnimation direction="up" delay={0.2}>
                <Badge variant="outline" className="mb-6 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
                  <Zap className="h-6 w-6 mr-2 text-blue-600" />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Ready to Transform?</span>
                </Badge>
              </ScrollAnimation>
              
              <ScrollAnimation direction="up" delay={0.4}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-[900] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6 leading-tight">
                  Start Your Journey with Entraiot
                </h2>
              </ScrollAnimation>
              
              <div className="max-w-3xl mx-auto space-y-4 mb-8">
                <ScrollAnimation direction="up" delay={0.6}>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Ready to see how IoT intelligence can transform your business?
                  </p>
                </ScrollAnimation>
                <ScrollAnimation direction="up" delay={0.8}>
                  <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                    Explore our resources, download the materials and connect with our experts for a personalized consultation.
                  </p>
                </ScrollAnimation>
              </div>
              
              <ScrollAnimation direction="up" delay={1.0}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link 
                    href="/contact" 
                    className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <span className="relative flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      👉 Contact Us
                    </span>
                  </Link>
                  <span className="text-slate-500 dark:text-slate-400 text-base font-medium">
                    to learn how Entraiot can help accelerate your digital transformation.
                  </span>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
