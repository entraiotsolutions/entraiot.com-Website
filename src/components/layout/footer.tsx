import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, InstagramIcon, FacebookIcon, LinkedinIcon, GithubIcon } from "lucide-react";
import { GrGoogle } from "react-icons/gr";
import { SiUpwork } from "react-icons/si";

type FooterLink = {
  name: string;
  href: string;
  external?: boolean;
};

const footerSections: Record<string, { title: string; links: FooterLink[] }> = {
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about#expertise" },
      { name: "Founder", href: "/about#team" },
      { name: "Careers", href: "/careers" },
      { name: "News", href: "/news" },
      { name: "Build Wing", href: "https://entrabuild.com/", external: true },
    ],
  },
  solutions: {
    title: "Solutions",
    links: [
      { name: "IoT Deployment", href: "/solutions#iot-deployment" },
      { name: "Real-Time Dashboards", href: "/solutions#dashboards" },
      { name: "Predictive Maintenance", href: "/solutions#predictive-maintenance" },
      { name: "Smart Automation", href: "/solutions#automation" },
    ],
  },
  products: {
    title: "Products",
    links: [
      { name: "UHF RFID Readers", href: "/products#uhf-rfid" },
      { name: "NFC Readers & Modules", href: "/products#nfc-readers" },
      { name: "BLE Devices", href: "/products#ble-devices" },
      { name: "All Products", href: "/products" },
    ],
  },
  industries: {
    title: "Industries",
    links: [
      { name: "Logistics", href: "/industries/logistics" },
      { name: "Healthcare", href: "/industries/healthcare" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "Smart Retail", href: "/industries/smart-retail" },
    ],
  },
  industries2: {
    title: "Industries-2",
    links: [
      { name: "Manufacturing", href: "/industries/manufacturing" },
      { name: "Smart Cities", href: "/industries/smart-cities" },
      { name: "Energy Management", href: "/industries/energy-management" },
      { name: "Agriculture", href: "/industries/agriculture" },
    ],
  },
};

const disabledHrefs = new Set<string>([
  "/support",
  "/careers",
  "/news",
]);

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo.webp"
                  alt="Entraiot Solutions Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-bold text-foreground">
                  Entraiot Solutions
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-md">
                Empowering industries with real-time IoT solutions that optimize operations, 
                improve sustainability & bring intelligence to businesses & communities.
              </p>
              <div className="flex space-x-5 text-muted-foreground mt-4">
  <a href="https://g.co/kgs/dNeJiod" target="_blank" rel="noopener noreferrer nofollow" aria-label="Google icon">
    <GrGoogle className="w-5 h-5 align-middle text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="mailto:bde@entraiot.com" aria-label="Mail icon">
    <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="https://maps.app.goo.gl/HBdEEgeaMRjYF2MC6?g_st=aw" target="_blank" rel="noopener noreferrer nofollow" aria-label="Map icon">
    <MapPin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="tel:+919944442061" aria-label="Phone icon">
    <Phone className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="https://www.upwork.com/freelancers/~01a1b1c1d1e1f1g1h1" target="_blank" rel="noopener noreferrer nofollow" aria-label="Upwork icon">
    <SiUpwork className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="https://www.linkedin.com/in/entraiot-solutions-a5a235363/" target="_blank" rel="noopener noreferrer nofollow" aria-label="Linkedin icon">
    <LinkedinIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="https://www.instagram.com/entraiotsolutions/?next=%2F&hl=en" target="_blank" rel="noopener noreferrer nofollow" aria-label="Instagram icon">
    <InstagramIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="https://github.com/entraiotsolutions" target="_blank" rel="noopener noreferrer nofollow" aria-label="Github icon">
    <GithubIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  <a href="https://www.facebook.com/profile.php?id=61577230558744" target="_blank" rel="noopener noreferrer nofollow" aria-label="Facebook icon">
    <FacebookIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
  </a>
  {/* Minimal text-based 'e' link (opens in new tab) */}
  <a
    href="https://www.entraiotsolutions.in/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Entraiot external site"
    className="text-sm font-semibold text-muted-foreground hover:text-blue-600 transition-colors cursor-pointer"
  >
    e
  </a>
</div>

            </div>

            {/* Footer Links */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => {
                    const isDisabled = disabledHrefs.has(link.href);
                    if (isDisabled) {
                      return (
                        <li key={link.name}>
                          <span
                            aria-disabled="true"
                            title="Coming soon"
                            className="text-sm text-muted-foreground cursor-default"
                          >
                            {link.name}
                          </span>
                        </li>
                      );
                    }
                    if (link.external) {
                      return (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {link.name}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 Entraiot Solutions Private Limited. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mr-16 md:mr-20">
              <span
                aria-disabled="true"
                title="Coming soon"
                className="text-sm text-muted-foreground cursor-default"
              >
                Privacy Policy
              </span>
              <span
                aria-disabled="true"
                title="Coming soon"
                className="text-sm text-muted-foreground cursor-default"
              >
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}