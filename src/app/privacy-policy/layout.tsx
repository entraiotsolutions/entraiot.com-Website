import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Entraiot Solutions",
  description: "How Entraiot Solutions collects, uses and protects your personal data, and your privacy rights.",
  alternates: { canonical: "https://entraiot.com/privacy-policy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
