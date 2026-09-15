import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/ui/chatbot";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import LandingIntroHost from "@/components/intro/landing-intro-host";
import { organizationStructuredData } from "@/lib/structured-data";
import { PageTransition } from "@/components/ui/page-transition";

export const metadata: Metadata = {
  metadataBase: new URL('https://entraiot.com'),
  // Default fallback title - should be overridden by page-specific metadata
  // This title is distinct from homepage to avoid duplicates
  title: {
    default: "Entraiot Solutions - Enterprise IoT & AI Solutions Provider",
    template: "%s | Entraiot Solutions",
  },
  description: "Leading IoT & AI solutions provider. Expert deployment, predictive maintenance and smart automation for industries. Get started today.",
  keywords: ["IoT solutions", "AI solutions", "smart automation", "Entraiot Solutions", "predictive maintenance", "smart cities", "industrial IoT", "Chennai IoT company", "IoT deployment", "AI automation"],
  authors: [{ name: "Entraiot Solutions" }],
  creator: "Entraiot Solutions",
  publisher: "Entraiot Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://entraiot.com",
    // Default OG title - pages should override this
    title: "Entraiot Solutions - Enterprise IoT & AI Solutions Provider",
    description: "Leading IoT & AI solutions provider. Expert deployment, predictive maintenance and smart automation for industries.",
    siteName: "Entraiot Solutions",
    images: [
      {
        url: "https://entraiot.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Entraiot Solutions - IoT & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // Default Twitter title - pages should override this
    title: "Entraiot Solutions - Enterprise IoT & AI Solutions Provider",
    description: "Leading IoT & AI solutions provider. Expert deployment, predictive maintenance and smart automation for industries.",
    images: ["https://entraiot.com/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/logo.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-512x512.webp", sizes: "512x512", type: "image/webp" }
    ],
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "dmJcQrza58NFvrLnAJm9ltmSCFylnrft_Y42T2XExVo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/logobg.webp" as="image" type="image/webp" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className="antialiased"
      >
        {/* Google Analytics - Optimized for performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1PRJ68930B"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1PRJ68930B');
          `}
        </Script>
        
        {/* Tawk.to Live Chat Widget */}
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/65f8b8b31ec1082f04e8b8b1/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        
        <Header />
        <main className="min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
        <Chatbot />
        <LandingIntroHost />
      </body>
    </html>
  );
}
