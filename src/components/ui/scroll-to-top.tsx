"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show button when page is scrolled down 300px
          if (window.scrollY > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Listen for scroll events with throttling
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      variant="default"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all duration-150",
        "hover:scale-110 active:scale-95",
        "h-12 w-12",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
      style={{ willChange: 'transform, opacity' }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}

