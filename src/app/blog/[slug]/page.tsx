import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  Share2,
  BookOpen,
  Tag
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, GlowEffect, Magnetic, CursorConnector } from "@/components/ui/particle-effects";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Breadcrumbs from "@/components/ui/breadcrumbs";

// Sample blog posts data (in a real app, this would come from a CMS or database)
const blogPosts = [
  {
    id: "rfid-iot-ai-enterprise-transformation",
    title: "Unlocking the Power of RFID with IoT and AI: How Entraiot is Enabling Intelligent Enterprise Transformation",
    excerpt: "RFID + IoT + AI: Real-time visibility, automation, and data-driven decisions for modern enterprises. Transform operations, assets, and supply chains.",
    content: `
      <h2>Introduction</h2>
      <p>RFID (Radio Frequency Identification) tracks assets in real time. It's one of the most practical tracking technologies today. But RFID alone isn't enough.</p>
      <p>To get real business value, you need RFID plus IoT infrastructure, AI analytics, and cloud platforms. That's where Entraiot Solutions comes in.</p>
      <p>We don't just use RFID as a tool. We build it into smart, connected systems. Our solutions use embedded systems, AI algorithms, and full system integration.</p>
      <p>This article shows how we use RFID to solve real problems. We work in logistics, manufacturing, healthcare, energy, and smart cities. This integration matters more today than ever.</p>

      <h2>What is RFID and Why Does It Matter?</h2>
      <p>RFID stands for Radio Frequency Identification. It's a wireless technology that tracks tags on objects. Unlike barcodes, RFID doesn't need line-of-sight. It can read many tags at once. This makes it faster and more efficient.</p>
      <p>There are three main types of RFID tags:</p>
      <ul>
        <li><strong>Passive RFID Tags:</strong> Powered by the reader. Low cost and widely used.</li>
        <li><strong>Active RFID Tags:</strong> Battery-powered. Works over long distances.</li>
        <li><strong>Semi-passive Tags:</strong> Use a battery for the chip. Still need the reader to communicate.</li>
      </ul>
      <p>RFID systems use different frequency bands: LF, HF, and UHF. Each works best for different tasks. Examples include inventory management, access control, asset tracking, and environmental sensing.</p>

      <h2>RFID Meets IoT: Entraiot's Full-Stack Advantage</h2>
      <h3>1. End-to-End RFID Integration</h3>
      <p>We build complete RFID systems from scratch. Here's what we include:</p>
      <ul>
        <li>Tag deployment plans for pallets, equipment, and documents</li>
        <li>Reader networks that cover your entire facility</li>
        <li>Environmental sensors for temperature and humidity</li>
        <li>Data routing systems that send information to the cloud</li>
        <li>AI analytics that turn raw data into useful insights</li>
      </ul>
      <p>This complete approach removes the complexity of traditional RFID projects.</p>

      <h3>2. Real-Time Tracking + Predictive Intelligence</h3>
      <p>Our platform tracks assets, products, and people in real time. But we do more than track. We use AI to predict problems before they happen.</p>
      <p>Key features include:</p>
      <ul>
        <li><strong>Predictive Maintenance:</strong> Find equipment problems before they break</li>
        <li><strong>Theft Prevention:</strong> Get instant alerts when items move without permission</li>
        <li><strong>Process Optimization:</strong> See where delays happen and fix bottlenecks</li>
      </ul>

      <h3>3. Cloud and Application Integration</h3>
      <p>All RFID data goes securely to cloud dashboards, ERP systems, and mobile apps. Our custom interfaces help managers:</p>
      <ul>
        <li>See asset locations on maps</li>
        <li>Filter by location, time, or condition</li>
        <li>Get alerts for important events</li>
        <li>Create reports for audits and compliance</li>
      </ul>

      <h2>Industry Applications: RFID in Action</h2>
      <h3>Logistics & Supply Chain</h3>
      <p>Get real-time visibility across your entire supply chain. Track shipments by location and condition. Monitor temperature-sensitive goods. Ensure delivery compliance. This reduces loss, improves traceability, and builds customer trust.</p>

      <h3>Manufacturing & Industrial IoT</h3>
      <p>RFID tags on machinery track usage and maintenance needs. Combined with AI, this data helps manufacturers reduce downtime. You can avoid costly breakdowns before they happen.</p>

      <h3>Healthcare & Medical Asset Tracking</h3>
      <p>Track medical equipment, patient movement, and pharmaceuticals in real time. Link RFID data with hospital systems. Administrators see where everything is instantly. This reduces loss and improves patient care.</p>

      <h3>Smart Cities & Infrastructure</h3>
      <p>RFID tracks public assets, waste bins, and utilities. Cloud dashboards help cities manage operations proactively. Fix problems before they become emergencies.</p>

      <h3>Retail & Inventory Automation</h3>
      <p>Our RFID systems count stock automatically. They prevent theft and improve customer experience. Smart shelves show real-time inventory availability.</p>

      <h2>Entraiot’s Differentiators in RFID-Driven Solutions</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>How Entraiot Adds Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Custom RFID Hardware Design</td>
            <td>Tailored tags and sensors for unique environments</td>
          </tr>
          <tr>
            <td>Edge + Cloud Integration</td>
            <td>Combines edge computing for speed and cloud for scalability</td>
          </tr>
          <tr>
            <td>AI-Based Event Detection</td>
            <td>Advanced modeling to detect theft, loss, or faults</td>
          </tr>
          <tr>
            <td>Security and Compliance</td>
            <td>Encrypted communication and role-based access to data</td>
          </tr>
          <tr>
            <td>24/7 Monitoring & Support</td>
            <td>Continuous monitoring ensures high uptime and performance</td>
          </tr>
        </tbody>
      </table>
      <p>We don't just deploy hardware. We build smart, connected systems that grow with your business.</p>

      <h2>The Future of RFID: Smarter, Faster, More Secure</h2>
      <p>RFID technology keeps evolving. We're leading the way by combining it with:</p>
      <ul>
        <li>AI to detect problems and predict issues</li>
        <li>Blockchain for transparent supply chains</li>
        <li>Digital twins to simulate real systems</li>
        <li>Edge computing for instant local processing</li>
      </ul>
      <p>We focus on efficiency, reliability, and scalability. This helps businesses unlock the next generation of automation. It's powered by RFID, IoT, and AI working together.</p>

      <h2>Conclusion</h2>
      <p>RFID alone tracks assets. But RFID plus IoT and AI transforms your entire business. That's what Entraiot Solutions delivers.</p>
      <p>We work with warehouses, smart cities, hospitals, and factories. We build custom RFID systems that give you real-time visibility, predictive power, and measurable results.</p>
      <p>Ready to transform your business? Visit <a href="https://entraiot.com" target="_blank" rel="noopener noreferrer">entraiot.com</a> or schedule a consultation today.</p>
    `,
    author: "Salvin Jones",
    authorRole: "Founder & CEO",
    authorImage: "/CEO.jpg",
    publishDate: "2025-01-20",
    readTime: "7 min read",
    category: "RFID & IoT",
    tags: ["RFID", "IoT", "AI", "Automation", "Enterprise"],
    featured: true,
    image: "/RFID2.webp"
  },
  {
    id: "nfc-iot-ai-smart-connectivity",
    title: "How NFC, IoT, and AI Are Transforming Smart Connectivity",
    excerpt: "NFC, IoT, and AI integration is driving a new era of smart, connected solutions across smart homes, industrial automation, healthcare, and retail personalization.",
    content: `
      <h2>Introduction</h2>
      <p>NFC, IoT, and AI work together to create smart, connected solutions. This combination powers smart homes, industrial automation, healthcare monitoring, and retail personalization. These technologies enable seamless interactions, smart decisions, and efficient automation.</p>

      <h2>Understanding NFC, IoT, and AI</h2>
      <h3>NFC (Near Field Communication)</h3>
      <p>NFC is a short-range wireless technology. Devices exchange data with a simple tap. It's used for contactless payments, access control, and device pairing.</p>

      <h3>IoT (Internet of Things)</h3>
      <p>IoT is a network of connected devices. They collect and share data. Devices include sensors, wearables, smart appliances, and industrial machinery. Together, they enable real-time monitoring and automation.</p>

      <h3>AI (Artificial Intelligence)</h3>
      <p>AI analyzes IoT data, finds patterns, and makes decisions. When you combine AI with IoT, you get predictive insights, smart automation, and better efficiency.</p>

      <h2>How NFC Enhances IoT and AI Integration</h2>
      <p>NFC, IoT, and AI work together to create powerful, efficient systems:</p>
      <ul>
        <li><strong>Simple Device Setup:</strong> NFC adds devices to your IoT network instantly. Just tap to connect. No complex setup needed.</li>
        <li><strong>Secure Data Exchange:</strong> NFC keeps communication secure between devices. It protects sensitive information in IoT networks.</li>
        <li><strong>AI-Driven Insights:</strong> Once devices connect, AI analyzes the data. It provides useful insights, predicts maintenance needs, and automates routine tasks. This improves productivity.</li>
      </ul>

      <h2>Applications of NFC, IoT, and AI</h2>
      <h3>Smart Homes</h3>
      <p>NFC devices make home automation simple. Control lighting, temperature, and security with ease. AI learns your preferences. It optimizes comfort and saves energy.</p>

      <h3>Healthcare</h3>
      <p>NFC wristbands identify patients securely. Data transfers to IoT health monitoring systems. AI analyzes health data in real time. It detects problems early and improves patient care.</p>

      <h3>Industrial Automation</h3>
      <p>NFC tags on equipment provide instant identification. IoT sensors monitor machine performance. AI predicts when maintenance is needed. This reduces downtime and saves money.</p>

      <h3>Retail and Smart Shopping</h3>
      <p>NFC tags track inventory and customer interactions. AI uses this data for personalized marketing and demand forecasting. It optimizes inventory automatically.</p>

      <h3>Smart Logistics</h3>
      <p>NFC tags on packages track location and condition in real time. AI optimizes delivery routes and predicts delays. This improves supply chain efficiency.</p>

      <h2>Benefits of Integrating NFC, IoT, and AI</h2>
      <ul>
        <li><strong>Enhanced User Experience:</strong> NFC simplifies device interactions, making technology more accessible.</li>
        <li><strong>Improved Security:</strong> NFC ensures secure data transmission in IoT networks.</li>
        <li><strong>Operational Efficiency:</strong> AI-powered insights and automation reduce human error and optimize processes.</li>
        <li><strong>Scalability:</strong> NFC makes it easy to expand IoT networks while maintaining intelligent capabilities.</li>
        <li><strong>Personalization:</strong> AI delivers tailored experiences based on data collected from IoT devices.</li>
      </ul>

      <h2>The Future of Smart Connectivity</h2>
      <p>NFC, IoT, and AI are transforming industries. They enable smart automation, real-time monitoring, and predictive analytics. From smart cities to healthcare, these technologies create seamless, secure, and intelligent connectivity.</p>
      <p>Businesses that adopt NFC-enabled IoT solutions with AI succeed. They enhance customer experiences, improve efficiency, and stay ahead in the digital world.</p>
    `,
    author: "Salvin Jones",
    authorRole: "Founder & CEO",
    authorImage: "/CEO.jpg",
    publishDate: "2025-01-22",
    readTime: "6 min read",
    category: "Smart Connectivity",
    tags: ["NFC", "IoT", "AI", "Smart Connectivity", "Automation"],
    featured: true,
    image: "/NFC.webp"
  },
  
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.id === resolvedParams.slug);
  
  if (!post) {
    // Return metadata without canonical URL for non-existent pages (404)
    // This prevents canonical URLs pointing to non-indexable pages
    return {
      title: "Post Not Found - Entraiot Solutions",
      description: "The requested blog post could not be found. Explore our IoT & AI blog for expert insights, case studies, and industry trends.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Generate enhanced title with alternative keywords to differentiate from H1
  // Use synonyms and related phrases for SEO while H1 remains user-friendly
  let enhancedTitle: string;
  if (post.id === "rfid-iot-ai-enterprise-transformation") {
    enhancedTitle = "RFID IoT AI Business Intelligence Solutions | Entraiot Blog";
  } else if (post.id === "nfc-iot-ai-smart-connectivity") {
    enhancedTitle = "NFC IoT AI Connected Device Solutions | Entraiot Blog";
  } else {
    enhancedTitle = post.title;
  }

  return {
    title: enhancedTitle,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `https://entraiot.com/blog/${post.id}`,
    },
    openGraph: {
      title: enhancedTitle,
      description: post.excerpt,
      url: `https://entraiot.com/blog/${post.id}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.id === "rfid-iot-ai-enterprise-transformation"
            ? "RFID, IoT & AI Enterprise Transformation Solutions"
            : "NFC, IoT & AI Smart Connectivity Solutions",
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.id === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // Generate structured data for the blog post
  const blogPostStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "url": `https://entraiot.com/blog/${post.id}`,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole,
      "image": `https://entraiot.com${post.authorImage}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Entraiot Solutions Private Limited",
      "logo": "https://entraiot.com/logo.webp"
    },
    "image": `https://entraiot.com${post.image}`,
    "description": post.excerpt,
    "keywords": post.tags,
    "articleBody": post.content.replace(/<[^>]*>/g, ''), // Strip HTML tags for plain text
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(' ').length,
    "timeRequired": post.readTime
  };

  return (
    <>
      <Script
        id="blog-post-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostStructuredData),
        }}
      />
      <div className="min-h-screen gradient-accent">
        <section className="relative gradient-accent overflow-hidden">
          {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
            <ParticleField count={40} colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#ec4899"]} size={6} speed={10} opacity={1} />
            <FloatingElement intensity={10} speed={4} className="absolute top-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <FloatingElement intensity={12} speed={3.5} className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <FloatingElement intensity={8} speed={5} className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"></div>
      </div>

          {/* Cursor Connector Overlay */}
          <CursorConnector 
            maxDistance={250} 
            lineColor="#6366f1" 
            lineOpacity={0.4} 
            lineWidth={1.5}
            className="absolute inset-0"
          />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <div className="mb-6">
              <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
                <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} className="mb-0 [&_ol]:text-black [&_span]:text-black" />
              </div>
        </div>
        {/* Back Button */}
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="mb-8">
            <Magnetic strength={0.1}>
              <Button variant="outline" className="group glass backdrop-blur-sm">
                <Link href="/blog" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Blog
                </Link>
              </Button>
            </Magnetic>
          </div>
        </ScrollAnimation>

        {/* Article Header */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Badge className="bg-primary/90 text-primary-foreground">
                {post.category}
              </Badge>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground ml-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
              {post.excerpt}
            </p>
          </div>
        </ScrollAnimation>

        {/* Article Content */}
        <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <GlowEffect color="#6366f1" intensity={0}>
                <Card className="glass backdrop-blur-sm border border-border/20 overflow-hidden">
                  <div className="relative h-96 overflow-hidden">
                    <OptimizedImage
                      src={post.image}
                      alt={post.id === "rfid-iot-ai-enterprise-transformation"
                        ? "RFID, IoT & AI Enterprise Transformation Solutions"
                        : "NFC, IoT & AI Smart Connectivity Solutions"}
                      width={800}
                      height={384}
                      className="w-full h-full object-cover"
                      hoverEffect={false}
                    />
                  </div>
                  
                  <CardContent className="p-6 md:p-8 lg:p-12">
                    <div 
                      className="max-w-none space-y-8 text-foreground"
                      dangerouslySetInnerHTML={{ 
                        __html: post.content.replace(
                          /<h2>/g, '<div class="mt-12 mb-6"><h2 class="text-2xl font-bold text-foreground border-b border-border pb-3">'
                        ).replace(
                          /<\/h2>/g, '</h2></div>'
                        ).replace(
                          /<h3>/g, '<div class="mt-8 mb-4"><h3 class="text-xl font-semibold text-foreground">'
                        ).replace(
                          /<\/h3>/g, '</h3></div>'
                        ).replace(
                          /<p>/g, '<div class="mb-6"><p class="text-muted-foreground leading-7 text-base">'
                        ).replace(
                          /<\/p>/g, '</p></div>'
                        ).replace(
                          /<ul>/g, '<div class="my-6"><ul class="list-disc list-inside space-y-3 text-muted-foreground pl-4">'
                        ).replace(
                          /<\/ul>/g, '</ul></div>'
                        ).replace(
                          /<li>/g, '<li class="leading-7">'
                        ).replace(
                          /<strong>/g, '<strong class="font-semibold text-foreground">'
                        ).replace(
                          /<a /g, '<a class="text-primary hover:underline font-medium" '
                        ).replace(
                          /<table>/g, '<div class="my-8 overflow-hidden rounded-lg border border-border"><table class="w-full border-collapse">'
                        ).replace(
                          /<\/table>/g, '</table></div>'
                        ).replace(
                          /<th>/g, '<th class="bg-muted px-6 py-4 text-left font-semibold text-foreground border-b border-border">'
                        ).replace(
                          /<td>/g, '<td class="px-6 py-4 text-muted-foreground border-b border-border">'
                        ).replace(
                          /<tr>/g, '<tr class="hover:bg-muted/50 transition-colors">'
                        ).replace(
                          /<img(?![^>]*\s+width=)(?![^>]*\s+height=)([^>]*)>/gi,
                          (match, attrs) => {
                            // Check if width/height already exist
                            if (attrs.includes('width=') || attrs.includes('height=')) {
                              return match;
                            }
                            // Add default width and height for blog content images (16:9 aspect ratio)
                            // Default to 800x450 for blog images
                            return `<img${attrs} width="800" height="450" loading="lazy" style="max-width: 100%; height: auto;">`;
                          }
                        )
                      }}
                    />
                  </CardContent>
                </Card>
              </GlowEffect>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Author Info */}
                <GlowEffect color="#8b5cf6" intensity={0}>
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        About the Author
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <OptimizedImage
                            src={post.authorImage}
                            alt={post.author}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            hoverEffect={false}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </GlowEffect>

                {/* Tags */}
                <GlowEffect color="#10b981" intensity={0}>
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Tag className="h-5 w-5 mr-2 text-primary" />
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </GlowEffect>

                {/* Share */}
                <GlowEffect color="#f97316" intensity={0}>
                  <Card className="glass backdrop-blur-sm border border-border/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Share2 className="h-5 w-5 mr-2 text-primary" />
                        Share Article
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          LinkedIn
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Twitter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </GlowEffect>
              </div>
            </div>
          </div>

        {/* Related Articles CTA */}
        <ScrollAnimation direction="up" delay={0.8}>
          <div className="mt-20 text-center">
            <GlowEffect color="#6366f1" intensity={0}>
              <div className="glass backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/20 shadow-2xl">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-foreground">
                    Ready to Implement <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT Solutions?</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Let&apos;s discuss how our IoT and AI expertise can help transform your business operations.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Magnetic strength={0.1}>
                      <Button size="lg" className="group gradient-primary text-primary-foreground">
                        <Link href="/contact" className="flex items-center">
                          Get Started Today
                          <ArrowLeft className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </Magnetic>
                    <Magnetic strength={0.1}>
                      <Button size="lg" variant="outline" className="group glass backdrop-blur-sm">
                        <Link href="/blog" className="flex items-center">
                          <BookOpen className="mr-2 h-5 w-5" />
                          More Articles
                        </Link>
                      </Button>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </GlowEffect>
          </div>
        </ScrollAnimation>
      </div>
    </section>
      </div>
    </>
  );
}
