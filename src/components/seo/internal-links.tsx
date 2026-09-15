import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";

interface InternalLink {
  title: string;
  href: string;
  description: string;
  category: string;
  external?: boolean;
}

interface InternalLinksProps {
  currentPage: string;
  links: InternalLink[];
  title?: string;
  className?: string;
}

export function InternalLinks({ 
  currentPage, 
  links, 
  title = "Related Resources",
  className = ""
}: InternalLinksProps) {
  const filteredLinks = links.filter(link => link.href !== currentPage);

  if (filteredLinks.length === 0) return null;

  return (
    <Card className={`glass backdrop-blur-sm border border-border/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <ArrowRight className="h-5 w-5 mr-2 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredLinks.slice(0, 4).map((link, index) => (
            <div key={index} className="group">
              <Link 
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="block p-3 rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:bg-muted/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      {link.external && (
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {link.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {link.category}
                    </Badge>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-2" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Predefined link sets for different page types
export const productLinks: InternalLink[] = [
  {
    title: "IoT Consulting Services",
    href: "/solutions",
    description: "Strategic IoT consulting for enterprise transformation",
    category: "Services"
  },
  {
    title: "AI Solutions",
    href: "/solutions", 
    description: "AI-powered solutions for predictive analytics",
    category: "Services"
  },
  {
    title: "Logistics IoT Solutions",
    href: "/industries/logistics",
    description: "IoT solutions for logistics and supply chain",
    category: "Industries"
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Get a free consultation for your project",
    category: "Contact"
  }
];

export const serviceLinks: InternalLink[] = [
  {
    title: "IoT Deployment",
    href: "/products/iot-deployment",
    description: "End-to-end IoT deployment solutions",
    category: "Products"
  },
  {
    title: "Predictive Maintenance",
    href: "/products/predictive-maintenance",
    description: "AI-powered predictive maintenance",
    category: "Products"
  },
  {
    title: "Case Studies",
    href: "/blog",
    description: "Read our success stories and case studies",
    category: "Resources"
  },
  {
    title: "About Our Team",
    href: "/about",
    description: "Meet our IoT and AI experts",
    category: "Company"
  }
];

export const industryLinks: InternalLink[] = [
  {
    title: "Manufacturing IoT",
    href: "/industries/manufacturing",
    description: "Smart manufacturing solutions",
    category: "Industries"
  },
  {
    title: "Healthcare IoT",
    href: "/industries/healthcare",
    description: "IoT solutions for healthcare",
    category: "Industries"
  },
  {
    title: "Smart Cities",
    href: "/industries/smart-cities",
    description: "IoT for smart city infrastructure",
    category: "Industries"
  },
  {
    title: "Get Quote",
    href: "/contact",
    description: "Request a customized solution",
    category: "Contact"
  }
];
