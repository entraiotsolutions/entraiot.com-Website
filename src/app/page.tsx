import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import Hero from "@/components/sections/hero";
import Solutions from "@/components/sections/solutions";
import Industries from "@/components/sections/industries";
import About from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import { homepageStructuredData, faqStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Entraiot Solutions - Enterprise IoT & AI Solutions",
  description: "Trusted IoT & AI solutions for 8+ industries. Proven 150-300% ROI, 40% cost reduction. Expert deployment, 24/7 support. Get free consultation today.",
  keywords: ["IoT solutions", "AI solutions", "smart automation", "Entraiot Solutions", "predictive maintenance", "smart cities", "industrial IoT", "Chennai IoT company", "IoT deployment", "AI automation"],
  alternates: {
    canonical: "https://entraiot.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://entraiot.com",
    title: "Entraiot Solutions - Enterprise IoT & AI Solutions",
    description: "Trusted IoT & AI solutions for 8+ industries. Proven 150-300% ROI, 40% cost reduction. Expert deployment, 24/7 support.",
    siteName: "Entraiot Solutions",
    images: [
      {
        url: "https://entraiot.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Entraiot Solutions - IoT & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entraiot Solutions - Enterprise IoT & AI Solutions",
    description: "Trusted IoT & AI solutions for 8+ industries. Proven 150-300% ROI, 40% cost reduction. Expert deployment, 24/7 support.",
    images: ["https://entraiot.com/logo.webp"],
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <main className="overflow-x-hidden">
        <Hero />
        <Solutions />
        <Industries />
        <About />
        <Testimonials />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Contact />
        </Suspense>
      </main>
    </>
  );
}
