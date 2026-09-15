"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const FuturisticIntroOverlay = dynamic(
  () => import("./futuristic-intro-overlay"),
  { ssr: false }
);

export default function LandingIntroHost() {
  const pathname = usePathname();
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const isHomePage = pathname === "/";
  const shouldShow = isHomePage && !isDismissed;

  // Lock page scroll/interaction while the popup is showing so the site
  // behind it only becomes visible/usable once the user closes it or
  // taps one of its actions (Book appointment / Chat on WhatsApp).
  useEffect(() => {
    if (!shouldShow) return;

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";

    return () => {
      style.overflow = previousOverflow;
    };
  }, [shouldShow]);

  // Only show on home page and if not dismissed
  if (!shouldShow) {
    return null;
  }

  return <FuturisticIntroOverlay onDismiss={handleDismiss} />;
}