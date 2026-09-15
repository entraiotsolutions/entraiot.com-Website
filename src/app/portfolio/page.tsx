import type { Metadata } from "next";
import PortfolioSection from "@/components/sections/portfolio";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Portfolio - IT & IoT Solutions | Entraiot Solutions",
  description: "Explore our portfolio of IT and IoT service solutions. From smart device integration to industrial automation and custom software development.",
  keywords: ["IoT portfolio", "IT services", "industrial automation", "smart logistics", "predictive maintenance", "Entraiot projects"],
  alternates: {
    canonical: "https://entraiot.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <h1 className="sr-only">Entraiot Solutions Portfolio - IT & IoT Services</h1>
      <div className="min-h-screen gradient-accent">
        <div className="container mx-auto px-4 pt-8 relative z-50">
           <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio" }
            ]} 
            className="mb-0 [&_ol]:text-slate-500 [&_span]:text-slate-900"
          />
        </div>
        <PortfolioSection />
      </div>
    </>
  );
}
