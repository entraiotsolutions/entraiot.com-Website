"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  imageSrc: string;
};

export default function Testimonials() {
  const testimonials: Testimonial[] = useMemo(
    () => [

      {
        quote:
          "Auditing IoT systems requires absolute precision - there's no room for error. Entraiot's transparent, audit-ready infrastructure impressed me instantly. Their compliance tracking and automated reporting saved us in manual work. Every auditor's dream come true!",
        name: "Mr. Judy Prasad",
        role: "Senior Auditor (25+ Years Experience)",
        company: "JPT & CO",
        imageSrc: "/judyprasad.webp",
      },
      {
        quote:
          "In my 25 years of mathematical modeling, I've never seen IoT data analytics this precise! Entraiot's algorithms are mathematically sound and incredibly efficient. Their predictive models helped us optimize research equipment usage by 80%. Simply brilliant engineering backed by solid mathematical foundations!",
        name: "Dr. Christy Raj",
        role: "Mathematics Professor (25+ Years)",
        company: "Anjalai Ammal Mahalingam Engineering College (Anna University)",
        imageSrc: "/christyraj.webp",
      },
      {
        quote:
          "Laboratory precision meets IoT innovation! Entraiot's sensor networks transformed our research workflows. Real-time equipment monitoring, predictive maintenance and seamless data integration - exactly what modern scientific research demands over AI. Our lab efficiency increased by 60% within months!",
        name: "Dr. Irudaya Charles",
        role: "Director of Technical operations - California",
        company: "Thermo Fisher Scientific",
        imageSrc: "/irudayacharles.webp",
      },
      
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const isHoveringRef = useRef(false);
  const goPrev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % testimonials.length);
  const active = testimonials[activeIndex];

  // Auto-advance every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isHoveringRef.current) return;
      setIsFading(true);
      // Trigger out then switch then in
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % testimonials.length);
        setIsFading(false);
      }, 250);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [testimonials.length]);
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Proven Business
            </span>{" "}
              Testimonials
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by industry leaders across healthcare, manufacturing and technology sectors
          </p>
        </div>

        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => (isHoveringRef.current = true)}
          onMouseLeave={() => (isHoveringRef.current = false)}
        >
          <button
            suppressHydrationWarning
            className="hidden sm:flex absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg items-center justify-center border border-white/20 hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
            onClick={goPrev}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            suppressHydrationWarning
            className="hidden sm:flex absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg items-center justify-center border border-white/20 hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
            onClick={goNext}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="mx-4 sm:mx-8">
            <div
              className={
                "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/20 relative transition-opacity duration-300 ease-out " +
                (isFading ? "opacity-0" : "opacity-100")
              }
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex justify-center mb-6 sm:mb-8 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                ))}
              </div>

              <blockquote className="text-center mb-8 sm:mb-10">
                <p
                  className={
                    "text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic font-medium transition-opacity duration-300 " +
                    (isFading ? "opacity-0" : "opacity-100")
                  }
                >
                  “{active.quote}”
                </p>
              </blockquote>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className={"w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg flex-shrink-0 transition-opacity duration-300 " + (isFading ? "opacity-0" : "opacity-100")}> 
                  <Image alt={active.name} src={active.imageSrc} width={80} height={80} quality={85} className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left">
                  <div className={"text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 transition-opacity duration-300 " + (isFading ? "opacity-0" : "opacity-100")}>{active.name}</div>
                  <div className={"text-sm sm:text-base text-muted-foreground mb-1 transition-opacity duration-300 " + (isFading ? "opacity-0" : "opacity-100")}>{active.role}</div>
                  <div className={"text-sm sm:text-base text-primary font-semibold transition-opacity duration-300 " + (isFading ? "opacity-0" : "opacity-100")}>{active.company}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 sm:mt-10 md:mt-12 space-x-2 px-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                suppressHydrationWarning
                className={
                  "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 " +
                  (i === activeIndex ? "bg-primary scale-110" : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50")
                }
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-14 md:mt-16 px-4">
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-primary/20 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Transform Your Business?</h2>
            <p className="text-muted-foreground mb-5 sm:mb-6 text-sm sm:text-base">Join hundreds of companies already benefiting from our IoT solutions.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact#get-in-touch">
                  Get Started Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                <Link href="/resources">
                  View Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


