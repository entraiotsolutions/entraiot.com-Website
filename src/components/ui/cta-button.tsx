import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/particle-effects";
import { ArrowRight, Play, Download, MessageCircle } from "lucide-react";
import Link from "next/link";

interface CTAButtonProps {
  variant?: "primary" | "secondary" | "outline" | "demo" | "download" | "chat";
  size?: "sm" | "default" | "lg";
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const ctaVariants = {
  primary: "gradient-primary text-primary-foreground shadow-lg hover:shadow-xl",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  demo: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
  download: "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700",
  chat: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
};

const ctaIcons = {
  primary: ArrowRight,
  secondary: ArrowRight,
  outline: ArrowRight,
  demo: Play,
  download: Download,
  chat: MessageCircle
};

export function CTAButton({ 
  variant = "primary", 
  size = "lg", 
  href, 
  children, 
  className = "",
  external = false
}: CTAButtonProps) {
  const Icon = ctaIcons[variant];
  
  return (
    <Magnetic strength={0.1}>
      <Button 
        size={size} 
        className={`group ${ctaVariants[variant]} ${className}`}
        asChild
      >
        <Link 
          href={href} 
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
          <Icon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </Magnetic>
  );
}
