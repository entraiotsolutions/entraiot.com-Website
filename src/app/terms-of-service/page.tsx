import type { Metadata } from "next";
import TermsOfServiceContent from "./TermsOfServiceContent";

export const metadata: Metadata = {
  title: "Terms of Service | Entraiot Solutions",
  description: "Terms of Service for using the Entraiot Solutions website and IoT & AI services.",
  alternates: { canonical: "https://entraiot.com/terms-of-service" },
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
