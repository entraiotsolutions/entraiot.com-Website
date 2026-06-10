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
    <footer className="bg-slate-50 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800">
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
                <span className="text-xl font-[800] text-[#0f172a] dark:text-slate-50">
                  Entraiot Solutions
                </span>
              </Link>
              <p className="text-sm text-[#475569] leading-relaxed mb-4 max-w-md dark:text-slate-300">
                Empowering industries with real-time IoT solutions that optimize operations, 
                improve sustainability & bring intelligence to businesses & communities.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a href="https://g.co/kgs/dNeJiod" target="_blank" rel="noopener noreferrer nofollow" aria-label="Google icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <GrGoogle size={16} />
                </a>
                <a href="mailto:bde@entraiot.com" aria-label="Mail icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <Mail size={16} />
                </a>
                <a href="https://maps.app.goo.gl/HBdEEgeaMRjYF2MC6?g_st=aw" target="_blank" rel="noopener noreferrer nofollow" aria-label="Map icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <MapPin size={16} />
                </a>
                <a href="tel:+919944442061" aria-label="Phone icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <Phone size={16} />
                </a>
                <a href="https://www.upwork.com/freelancers/~01a1b1c1d1e1f1g1h1" target="_blank" rel="noopener noreferrer nofollow" aria-label="Upwork icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <SiUpwork size={16} />
                </a>
                <a href="https://www.linkedin.com/in/entraiot-solutions-a5a235363/" target="_blank" rel="noopener noreferrer nofollow" aria-label="Linkedin icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <LinkedinIcon size={16} />
                </a>
                <a href="https://www.instagram.com/entraiotsolutions/?next=%2F&hl=en" target="_blank" rel="noopener noreferrer nofollow" aria-label="Instagram icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <InstagramIcon size={16} />
                </a>
                <a href="https://github.com/entraiotsolutions" target="_blank" rel="noopener noreferrer nofollow" aria-label="Github icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <GithubIcon size={16} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61577230558744" target="_blank" rel="noopener noreferrer nofollow" aria-label="Facebook icon" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors duration-150">
                  <FacebookIcon size={16} />
                </a>
                {/* Minimal text-based 'e' link */}
                <a
                  href="https://www.entraiotsolutions.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Entraiot external site"
                  className="w-7 h-7 flex items-center justify-center text-base font-bold text-slate-500 hover:text-slate-700 transition-colors duration-150 leading-none"
                >
                  e
                </a>
              </div>

            </div>

            {/* Footer Links */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-sm font-bold text-[#0f172a] mb-3 dark:text-slate-100">
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
                          className="text-sm text-[#475569] hover:text-[#2563eb] transition-colors dark:text-slate-300 dark:hover:text-blue-300"
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
              &copy; 2025 Entraiot Solutions Private Limited. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mr-16 md:mr-20">
              <Link href="/privacy-policy" className="text-sm text-[#475569] hover:text-[#2563eb] transition-colors dark:text-slate-300 dark:hover:text-blue-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-[#475569] hover:text-[#2563eb] transition-colors dark:text-slate-300 dark:hover:text-blue-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
