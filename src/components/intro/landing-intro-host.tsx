"use client";

import { useState } from "react";
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

  // Only show on home page and if not dismissed
  if (pathname !== "/" || isDismissed) {
    return null;
  }

  return <FuturisticIntroOverlay onDismiss={handleDismiss} />;
}