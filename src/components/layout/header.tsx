"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/optimized-image";
import { GlowEffect, Magnetic } from "@/components/ui/particle-effects";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Industries", href: "/industries" },
  { name: "Resources", href: "/resources" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Home clicked on home page - triggering animation");
      // Reset animation state first to allow re-triggering
      setIsAnimating(false);
      // Force reflow to restart animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
          console.log("Animation state set to true");
          // Reset animation after it completes
          setTimeout(() => {
            setIsAnimating(false);
          }, 600);
        });
      });
    } else {
      console.log("Not on home page, pathname:", pathname);
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm"
      style={isAnimating ? {
        animation: "headerSlideFromTop 0.6s ease-out",
        willChange: "transform"
      } : {
        animation: "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT - Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center overflow-hidden">
                <Logo
                  src="/logobg.webp"
                  alt="Entraiot Solutions"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg text-slate-900 whitespace-nowrap">
                Entraiot Solutions
              </span>
            </Link>
          </div>

          {/* CENTER - Nav Links (hidden on mobile) */}
          <nav
            role="navigation"
            aria-label="Main"
            className="hidden md:flex items-center gap-1 mx-4 min-w-0"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.name === "Home" ? handleHomeClick : undefined}
                className={`text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap transition-colors duration-150 ${
                  pathname === item.href 
                    ? "text-blue-600 font-semibold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT - Action Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto md:ml-0">
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="https://entrabuild.com/"
                target="_blank"
                className="text-sm font-semibold text-blue-600 px-3 py-2 whitespace-nowrap hover:text-blue-700 transition-colors"
              >
                Build Wing
              </Link>
              <Link 
                href="/contact#get-in-touch"
                className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.name === "Home") {
                      handleHomeClick(e);
                    }
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 pb-2 border-t border-slate-100">
                <Link
                  href="https://entrabuild.com/"
                  target="_blank"
                  className="block px-3 py-2 text-base font-semibold text-blue-600 hover:text-blue-700"
                >
                  Build Wing
                </Link>
                <Link
                  href="/contact#get-in-touch"
                  className="block px-3 py-2 mt-2 text-center text-base font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
