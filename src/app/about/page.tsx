import type { Metadata } from "next";
import Script from "next/script";
import About from "@/components/sections/about";
import { aboutPageStructuredData, breadcrumbStructuredData } from "@/lib/structured-data";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "About Us - IoT & AI Experts | Company Mission | Entraiot",
  description: "Trusted IoT & AI experts led by experienced founder. Proven expertise in smart automation. Custom solutions for 8+ industries. Get consultation.",
  keywords: ["about entraiot", "salvin jones", "IoT experts", "AI solutions", "company mission", "founder story"],
  alternates: {
    canonical: "https://entraiot.com/about",
  },
  openGraph: {
    title: "About Us - IoT & AI Experts | Company Mission | Entraiot",
    description: "Trusted IoT & AI experts led by experienced founder. Proven expertise in smart automation. Custom solutions for 8+ industries.",
    url: "https://entraiot.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageStructuredData),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData([
            { name: "Home", url: "https://entraiot.com" },
            { name: "About", url: "https://entraiot.com/about" }
          ])),
        }}
      />
      <h1 className="sr-only">About Entraiot Solutions</h1>
      
      <div className="min-h-screen gradient-accent">
        <About isAboutPage={true} backgroundClass="gradient-accent" breadcrumbs={
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "About" }
            ]} 
            className="mb-0 [&_ol]:text-black [&_span]:text-black"
          />
        } />
      </div>
    </>
  );
} 