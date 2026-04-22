"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Tag,
  SearchX,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation, ScrollStagger } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, GlowEffect, Magnetic, CursorConnector } from "@/components/ui/particle-effects";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Sample blog posts data
const blogPosts = [
  {
    id: "rfid-iot-ai-enterprise-transformation",
    title: "Unlocking the Power of RFID with IoT and AI: How Entraiot is Enabling Intelligent Enterprise Transformation",
    excerpt: "How RFID, combined with IoT and AI, delivers real-time visibility, automation and data-driven decision-making to modern enterprises across operations, assets and supply chains.",
    content: "RFID + IoT + AI create a powerful foundation for intelligent tracking, automation and analytics—unlocking operational efficiency and enterprise-wide transformation.",
    author: "Salvin Jones",
    authorRole: "Founder & CEO",
    authorImage: "/CEO.jpg",
    publishDate: "2025-01-20",
    readTime: "7 min read",
    category: "RFID & IoT",
    tags: ["RFID", "IoT", "AI", "Automation", "Enterprise"],
    featured: true,
    image: "/RFID.webp"
  },
  {
    id: "nfc-iot-ai-smart-connectivity",
    title: "How NFC, IoT and AI Are Transforming Smart Connectivity",
    excerpt: "NFC, IoT and AI integration is driving a new era of smart, connected solutions across smart homes, industrial automation, healthcare and retail personalization.",
    content: "The integration of NFC, IoT and AI is creating seamless interactions, intelligent decision-making and efficient automation across industries.",
    author: "Salvin Jones",
    authorRole: "Founder & CEO",
    authorImage: "/CEO.jpg",
    publishDate: "2025-01-22",
    readTime: "6 min read",
    category: "Smart Connectivity",
    tags: ["NFC", "IoT", "AI", "Smart Connectivity", "Automation"],
    featured: true,
    image: "/NFC2.webp"
  },
  
];

const categories = [
  "All",
  "Manufacturing", 
  "AI & Analytics",
  "Smart Cities",
  "Security",
  "Energy",
  "Data Analytics"
];

interface BlogSectionProps {
  backgroundClass?: string;
  breadcrumbs?: React.ReactNode;
}

export default function BlogSection({ backgroundClass = "gradient-accent", breadcrumbs }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => {
        // Map category names to match blog post categories
        const categoryMap: Record<string, string[]> = {
          "Manufacturing": ["Manufacturing", "RFID & IoT"],
          "AI & Analytics": ["AI & Analytics", "AI"],
          "Smart Cities": ["Smart Cities", "Smart Connectivity"],
          "Security": ["Security"],
          "Energy": ["Energy"],
          "Data Analytics": ["Data Analytics", "AI & Analytics"]
        };
        
        const matchingCategories = categoryMap[selectedCategory] || [selectedCategory];
        return matchingCategories.some(cat => 
          post.category.toLowerCase().includes(cat.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(cat.toLowerCase()))
        );
      });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section className={`relative ${backgroundClass === "gradient-accent" ? "pt-6" : "section-padding"} ${backgroundClass === "gradient-accent" ? "pb-12 md:pb-16 lg:pb-20" : "section-padding"} ${backgroundClass} overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField count={40} colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#ec4899"]} size={6} speed={10} opacity={1} />
        <FloatingElement intensity={10} speed={4} className="absolute top-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <FloatingElement intensity={12} speed={3.5} className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <FloatingElement intensity={8} speed={5} className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        {backgroundClass === "gradient-accent" && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"></div>
        )}
      </div>

      {/* Cursor Connector Overlay */}
      <CursorConnector 
        maxDistance={250} 
        lineColor="#6366f1" 
        lineOpacity={0.4} 
        lineWidth={1.5}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <div className="pt-6 pb-0">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
              {breadcrumbs}
            </div>
          </div>
        )}
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollAnimation direction="up" delay={0.2}>
            <Badge variant="outline" className="mb-6 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
              <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Our Blog</span>
            </Badge>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.4}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              IoT & AI <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Insights</span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Stay ahead with expert insights on <span className="text-primary font-semibold">IoT, AI and smart automation</span> technologies 
              that are transforming industries worldwide.
            </p>
          </ScrollAnimation>
        </div>

        {/* Category Filter */}
        <ScrollAnimation direction="up" delay={0.8}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? "gradient-primary text-primary-foreground" 
                    : "glass backdrop-blur-sm border-border/50 hover:bg-accent"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollAnimation>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && (
          <ScrollAnimation direction="up" delay={1.0}>
            <div className="text-center py-20">
              <GlowEffect color="#6366f1" intensity={0}>
                <div className="glass backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-border/20 shadow-2xl max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                        <div className="relative bg-primary/10 rounded-full p-6">
                          <SearchX className="h-16 w-16 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                        No Articles Found
                      </h3>
                      <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        We couldn&apos;t find any articles in the{" "}
                        <span className="text-primary font-semibold">{selectedCategory}</span>{" "}
                        category yet. Check back soon for new content!
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <Magnetic strength={0.1}>
                        <Button
                          onClick={() => setSelectedCategory("All")}
                          size="lg"
                          className="group gradient-primary text-primary-foreground"
                        >
                          <RefreshCw className="mr-2 h-5 w-5 transition-transform group-hover:rotate-180" />
                          View All Articles
                        </Button>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </GlowEffect>
            </div>
          </ScrollAnimation>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <ScrollAnimation direction="up" delay={1.0}>
            <div className="mb-20">
              <div className="flex items-center mb-8">
                <Sparkles className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Featured Articles</h2>
              </div>
              
              <ScrollStagger staggerDelay={0.15} childDelay={0.2}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {featuredPosts.map((post) => (
                  <GlowEffect key={post.id} color="#6366f1" intensity={0}>
                    <Card className="group card-glow glass backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <OptimizedImage
                          src={post.image}
                          alt={post.id === "rfid-iot-ai-enterprise-transformation"
                            ? "RFID, IoT & AI Enterprise Transformation"
                            : "NFC, IoT & AI Smart Connectivity"}
                          width={600}
                          height={256}
                          quality={80}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          hoverEffect={false}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary/90 text-primary-foreground">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="space-y-6 flex-1 flex flex-col">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <OptimizedImage
                              src={post.authorImage}
                              alt={post.author}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                              hoverEffect={false}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Magnetic strength={0.1}>
                          <Button className="w-full group mt-auto" variant="outline">
                            <Link href={`/blog/${post.id}`} className="flex items-center justify-center">
                              Read Article
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </Magnetic>
                      </CardContent>
                    </Card>
                  </GlowEffect>
                  ))}
                </div>
              </ScrollStagger>
            </div>
          </ScrollAnimation>
        )}

        {/* All Posts Grid */}
        {regularPosts.length > 0 && (
          <ScrollAnimation direction="up" delay={1.2}>
            <div className="mb-20">
              <ScrollStagger staggerDelay={0.1} childDelay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {regularPosts.map((post) => (
                  <GlowEffect key={post.id} color="#8b5cf6" intensity={0}>
                    <Card className="group card-glow glass backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
                      <div className="relative h-40 md:h-48 overflow-hidden">
                        <OptimizedImage
                          src={post.image}
                          alt={post.id === "rfid-iot-ai-enterprise-transformation"
                            ? "RFID, IoT & AI Enterprise Transformation"
                            : "NFC, IoT & AI Smart Connectivity"}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          hoverEffect={false}
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/90 text-primary-foreground text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="space-y-3 flex-1">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 flex-1 flex flex-col">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <OptimizedImage
                              src={post.authorImage}
                              alt={post.author}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                              hoverEffect={false}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                          </div>
                        </div>
                        
                        <Magnetic strength={0.1}>
                          <Button className="w-full group mt-auto" variant="outline" size="sm">
                            <Link href={`/blog/${post.id}`} className="flex items-center justify-center">
                              Read More
                              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </Magnetic>
                      </CardContent>
                    </Card>
                  </GlowEffect>
                  ))}
                </div>
              </ScrollStagger>
            </div>
          </ScrollAnimation>
        )}

        {/* Newsletter CTA */}
        <ScrollAnimation direction="up" delay={1.4}>
          <div className="text-center">
            <GlowEffect color="#6366f1" intensity={0}>
              <div className="glass backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/20 shadow-2xl max-w-4xl mx-auto">
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    Stay Updated with <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">IoT Insights</span>
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Get the latest articles, case studies and industry insights delivered to your inbox.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Magnetic strength={0.1}>
                      <Button size="lg" className="group gradient-primary text-primary-foreground">
                        <Link href="/contact" className="flex items-center">
                          Subscribe to Newsletter
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
  );
}
