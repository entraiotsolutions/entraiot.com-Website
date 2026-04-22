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
      className="sticky top-0 z-50 w-full glass backdrop-blur-xl border-b border-border/20 shadow-sm"
      style={isAnimating ? {
        animation: "headerSlideFromTop 0.6s ease-out",
        willChange: "transform"
      } : {
        animation: "none"
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Magnetic strength={0.1}>
              <GlowEffect color="#6366f1" intensity={0}>
                <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl overflow-hidden">
                    <Logo
                      src="/logobg.webp"
                      alt="Entraiot Solutions"
                      width={40}
                      height={40}
                      className="w-12 h-auto sm:w-16 sm:h-auto object-contain"
                    />
                  </div>
                  <span className="text-sm sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                    Entraiot Solutions
                  </span>
                </Link>
              </GlowEffect>
            </Magnetic>
          </div>

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            aria-label="Main"
            className="hidden md:flex space-x-6 lg:space-x-8"
          >
            {navigation.map((item) => {
              const linkContent = (
                <Link
                  href={item.href}
                  onClick={item.name === "Home" ? handleHomeClick : undefined}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
              
              return (
                <Magnetic key={item.name} strength={0.05}>
                  {linkContent}
                </Magnetic>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
            <Link
              href="https://entrabuild.com/"
              target="_blank"
              className="font-bold text-[15px] sm:text-base text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
            >
              Build Wing
            </Link>
            <Magnetic strength={0.15}>
              <GlowEffect color="#6366f1" intensity={0}>
                <Button
                  size="sm"
                  asChild
                  className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <Link href="/contact#get-in-touch">Get Started</Link>
                </Button>
              </GlowEffect>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-3 py-3 space-y-2 glass backdrop-blur-xl rounded-lg border border-border/20 shadow-md">
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
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-1 space-y-2">
                <Link
                  href="https://entrabuild.com/"
                  target="_blank"
                  className="block w-full text-center py-2 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Build Wing
                </Link>
                <Button
                  size="sm"
                  asChild
                  className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Link href="/contact#get-in-touch">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
