import Link from "next/link";
import {
    Users,
    Award,
    Target,
    Heart,
    Sparkles,
    ArrowRight,
    CheckCircle,
    TrendingUp,
    Zap,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollAnimation, ScrollStagger, ScrollCounter } from "@/components/ui/scroll-animations";
import { ParticleField, FloatingElement, GlowEffect, Magnetic, CursorConnector } from "@/components/ui/particle-effects";

import { OptimizedImage } from "@/components/ui/optimized-image";

const companyValues = [
    {
        icon: Target,
        title: "Innovation First",
        description: "We push the boundaries of what's possible with IoT & AI technology",
        color: "text-blue-600",
        bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
        borderColor: "border-blue-500/20",
        glowColor: "#3b82f6",
        href: "/industries",
    },
    {
        icon: Users,
        title: "Client Success",
        description: "Your success is our success. We're committed to delivering results that matter",
        color: "text-green-600",
        bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/10",
        borderColor: "border-green-500/20",
        glowColor: "#10b981",
        href: "/#testimonials",
    },
    {
        icon: Award,
        title: "Excellence",
        description: "We maintain the highest standards in every project we undertake",
        color: "text-purple-600",
        bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
        borderColor: "border-purple-500/20",
        glowColor: "#8b5cf6",
        href: "/solutions#proven-results",
    },
    {
        icon: Heart,
        title: "Sustainability",
        description: "Building solutions that create a better, more sustainable future",
        color: "text-pink-600",
        bgColor: "bg-gradient-to-br from-pink-500/10 to-pink-600/10",
        borderColor: "border-pink-500/20",
        glowColor: "#ec4899",
        href: "/solutions",
    },
];

const achievements = [
    { number: "25+", label: "Projects Completed", color: "from-blue-600 to-cyan-600" },
    { number: "8", label: "Industries Served", color: "from-green-600 to-emerald-600" },
    { number: "99.9%", label: "Client Satisfaction", color: "from-purple-600 to-pink-600" },
    { number: "24/7", label: "Support Available", color: "from-orange-600 to-red-600" },
];

interface AboutProps {
    backgroundClass?: string;
    breadcrumbs?: React.ReactNode;
}

export default function About({ backgroundClass = "gradient-secondary", breadcrumbs }: AboutProps) {
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

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                {breadcrumbs && (
                    <div className="pt-6 pb-0">
                        <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2 inline-block">
                            {breadcrumbs}
                        </div>
                    </div>
                )}
                {/* Header - Company Details */}
                <div id="company" className="text-center mb-12 md:mb-20 scroll-mt-20">
                    <ScrollAnimation direction="up" delay={0.2}>
                        <Badge variant="outline" className="mb-4 md:mb-6 glass backdrop-blur-sm border-primary/30 text-base md:text-lg px-3 py-1 md:px-4 md:py-1.5 rounded-full">
                            <Sparkles className="h-4 w-4 md:h-6 md:w-6 mr-2 text-blue-600" />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">About Us</span>
                        </Badge>
                    </ScrollAnimation>
                    <ScrollAnimation direction="up" delay={0.4}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-8 leading-tight">
                            Meet the <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Founder</span> Driving Innovation
                        </h2>
                    </ScrollAnimation>
                    <ScrollAnimation direction="up" delay={0.6}>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                            Entraiot Solutions is led by a hands-on founder. We combine <span className="text-primary font-semibold">IoT, embedded systems and AI</span> to solve real problems. Our work helps businesses succeed.
                        </p>
                    </ScrollAnimation>
                </div>

                {/* Enhanced Founder Section */}
                <ScrollAnimation direction="up" delay={0.8}>
                    <div id="team" className="mb-12 md:mb-20 scroll-mt-20">
                        <div className="glass backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl border border-border/20">
                            {/* Mobile Layout: Founder Image First */}
                            <div className="block lg:hidden mb-8">
                                <FloatingElement intensity={6} speed={4}>
                                    <div className="relative">
                                        <div className="w-full max-w-sm mx-auto glass backdrop-blur-sm rounded-3xl p-6 border border-border/20">
                                            <OptimizedImage
                                                src="/CEO.jpg"
                                                alt="Salvin Jones - Founder & CEO"
                                                width={320}
                                                height={400}
                                                quality={85}
                                                className="rounded-2xl object-cover w-full h-64 sm:h-80"
                                                hoverEffect={true}
                                            />
                                        </div>
                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
                                            <GlowEffect color="#6366f1" intensity={0}>
                                                <div className="glass backdrop-blur-sm rounded-2xl p-4 border border-border/20 shadow-lg cursor-pointer transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-2">
                                                    <div className="text-center space-y-1 md:space-y-2">
                                                        <h4 className="font-bold text-foreground text-base md:text-lg">Salvin Jones</h4>
                                                        <p className="text-xs md:text-sm text-primary font-medium">Founder & CEO</p>
                                                        <div className="flex items-center justify-center space-x-2 text-[10px] md:text-xs text-muted-foreground">
                                                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                            <span>Available for consultation</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </GlowEffect>
                                        </div>
                                    </div>
                                </FloatingElement>
                                
                                {/* Professional Stats for Mobile */}
                                <div className="mt-12 grid grid-cols-2 gap-4">
                                    <a href="https://www.linkedin.com/in/salvin-jones-3238899a" target="_blank" rel="noopener noreferrer nofollow">
                                    <div className="text-center bg-white/95 dark:bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-border/20 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-white/20 hover:scale-105">
                                        <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                            <ScrollCounter from={0} to={3200} suffix="+" duration={3.5} className="tabular-nums" />
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-tight">LinkedIn Followers</div>
                                    </div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/salvin-jones-3238899a" target="_blank" rel="noopener noreferrer nofollow">
                                    <div className="text-center bg-white/95 dark:bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-border/20 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-white/20 hover:scale-105">
                                        <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                            <ScrollCounter from={0} to={500} suffix="+" duration={3.5} className="tabular-nums" />
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-tight">Professional Network</div>
                                    </div>
                                    </a>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                                <div className="space-y-6 md:space-y-8">
                                    <div className="space-y-4 md:space-y-6">
                                        <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                                            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Leadership</span> Vision
                                        </h3>
                                        <blockquote className="text-base md:text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-4 md:pl-6 italic">
                                            &quot;At Entraiot Solutions, we believe the future of business is intelligent connectivity. 
                                            Our mission is simple: make IoT technology accessible, reliable and transformative. We want every organization to succeed.&quot;
                                        </blockquote>
                                    </div>
                                    
                                    {/* Professional Journey */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg md:text-xl font-semibold text-foreground flex items-center">
                                            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                                            Professional Journey
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start space-x-3 md:space-x-4 p-4 glass backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/20">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm md:text-base font-medium text-foreground">Engineering Foundation</p>
                                                    <p className="text-xs md:text-sm text-muted-foreground">B.E. in Electronics &amp; Communication Engineering from St. Joseph&apos;s College of Engineering</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3 md:space-x-4 p-4 glass backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/20">
                                                <CheckCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm md:text-base font-medium text-foreground">Technical Excellence</p>
                                                    <p className="text-xs md:text-sm text-muted-foreground">Former Embedded Engineer at Nissi Software Systems (1.8 years)</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3 md:space-x-4 p-4 glass backdrop-blur-sm rounded-xl md:rounded-2xl border border-border/20">
                                                <CheckCircle className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm md:text-base font-medium text-foreground">Entrepreneurship</p>
                                                    <p className="text-xs md:text-sm text-muted-foreground">Founded Entraiot Solutions in April 2025, building smart IoT + AI solutions</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Desktop Layout: Founder Image */}
                                <div className="hidden lg:block relative lg:sticky lg:top-8">
                                    <FloatingElement intensity={6} speed={4}>
                                        <div className="relative">
                                            <div className="w-full max-w-md mx-auto glass backdrop-blur-sm rounded-3xl p-6 border border-border/20">
                                                <OptimizedImage
                                                    src="/CEO.jpg"
                                                    alt="Salvin Jones - Founder & CEO"
                                                    width={320}
                                                    height={400}
                                                    className="rounded-2xl object-cover w-full h-80 md:h-96"
                                                    hoverEffect={true}
                                                />
                                            </div>
                                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
                                                <GlowEffect color="#6366f1" intensity={0}>
                                                    <div className="glass backdrop-blur-sm rounded-2xl p-4 border border-border/20 shadow-lg cursor-pointer transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-2 will-change-transform">
                                                        <div className="text-center space-y-2">
                                                            <h4 className="font-bold text-foreground text-lg">Salvin Jones</h4>
                                                            <p className="text-sm text-primary font-medium">Founder & CEO</p>
                                                            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                                <span>Available for consultation</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </GlowEffect>
                                            </div>
                                        </div>
                                    </FloatingElement>
                                    
                                    {/* Professional Stats */}
                                    <div className="mt-16 grid grid-cols-2 gap-4">
                                        <a href="https://www.linkedin.com/in/salvin-jones-3238899a" target="_blank" rel="noopener noreferrer nofollow">
                                        <div className="text-center bg-white/95 dark:bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border/20 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-white/20 hover:scale-105">
                                            <div className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-400">
                                                <ScrollCounter from={0} to={3200} suffix="+" duration={3.5} className="tabular-nums" />
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1 leading-tight">LinkedIn Followers</div>
                                        </div>
                                        </a>
                                        <a href="https://www.linkedin.com/in/salvin-jones-3238899a" target="_blank" rel="noopener noreferrer nofollow">
                                        <div className="text-center bg-white/95 dark:bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border/20 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-white/20 hover:scale-105">
                                            <div className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-400">
                                                <ScrollCounter from={0} to={500} suffix="+" duration={3.5} className="tabular-nums" />
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1 leading-tight">Professional Network</div>
                                        </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Core Expertise - Full Width Section */}
                            <div id="expertise" className="mt-12 md:mt-16 scroll-mt-20">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                                    Our <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Core Expertise</span>
                                </h2>
                                <div className="glass backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 border border-border/20 shadow-lg flex flex-col">
                                    <div className="mb-6 md:mb-8">
                                        <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 flex items-center text-foreground leading-tight">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-blue-600" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technical Specializations</span>
                                        </h3>
                                        <p className="text-muted-foreground text-base md:text-lg">What we do best. Our skills that help you succeed.</p>
                                    </div>
                                    
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">IoT-Based Asset & Condition Tracking</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">Embedded System Design & Sensor Integration</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">AI-Driven Automation & Predictive Analytics</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-purple-500 to-violet-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">Custom Hardware Prototyping & R&D</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">Cloud & Real-Time Data Sync</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-cyan-600 to-blue-600 animate-pulse" style={{ animationDelay: '1s' }}></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">Web & Mobile Dashboard Development</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">Smart Factory & Industry 4.0 Solutions</span>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/20 hover:bg-background/80 transition-colors duration-300">
                                            <div className="w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 bg-gradient-to-r from-violet-500 to-purple-600 animate-pulse" style={{ animationDelay: '1.4s' }}></div>
                                            <span className="text-sm md:text-base text-foreground leading-relaxed font-medium">Custom Client Solutions & Consulting</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </ScrollAnimation>
                
                {/* Values Section */}
                <ScrollAnimation direction="up" delay={1.2}>
                    <div className="mb-12 md:mb-20 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">Our <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Core</span> Values</h2>
                        <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 leading-relaxed">The principles that guide everything we do</p>

                        <ScrollStagger staggerDelay={0.15} childDelay={0.2}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                {companyValues.map(({ icon: Icon, ...val }, i) => (
                                    <GlowEffect key={i} color={val.glowColor} intensity={0}>
                                        <Link href={val.href} className="block h-full">
                                            <Card className={`${val.bgColor} border-2 ${val.borderColor} glass h-full flex flex-col cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl md:rounded-3xl`}>
                                                <CardHeader className="text-center space-y-4">
                                                    <FloatingElement intensity={5} speed={3}>
                                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-background/80 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                                            <Icon className={`h-6 w-6 md:h-8 md:w-8 ${val.color}`} />
                                                        </div>
                                                    </FloatingElement>
                                                    <CardTitle className="text-base md:text-lg font-bold leading-tight">{val.title}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex-grow flex items-center justify-center">
                                                    <p className="text-xs md:text-sm text-muted-foreground text-center leading-relaxed">{val.description}</p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </GlowEffect>
                                ))}
                            </div>
                        </ScrollStagger>
                    </div>
                </ScrollAnimation>

                {/* Achievements */}
                <ScrollAnimation direction="up" delay={1.4}>
                    <div className="mb-12 md:mb-20 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">Our <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Achievements</span></h2>
                        <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 leading-relaxed">Numbers that reflect our commitment to excellence</p>

                        <ScrollStagger staggerDelay={0.1} childDelay={0.2}>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                                {achievements.map((item, i) => {
                                    // Parse the number to extract value and suffix
                                    let toValue = 0;
                                    let suffix = "";
                                    
                                    if (item.number === "24/7") {
                                        // Keep 24/7 as static text
                                        return (
                                            <GlowEffect key={i} color="#6366f1" intensity={0}>
                                                <div className="text-center p-4 sm:p-6 glass rounded-2xl md:rounded-3xl border border-border/20">
                                                    <div className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.number}</div>
                                                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">{item.label}</div>
                                                </div>
                                            </GlowEffect>
                                        );
                                    } else if (item.number.endsWith("+")) {
                                        toValue = parseFloat(item.number.replace("+", ""));
                                        suffix = "+";
                                    } else if (item.number.endsWith("%")) {
                                        const numStr = item.number.replace("%", "");
                                        // Handle decimal percentages like 99.9%
                                        if (numStr.includes(".")) {
                                            // For 99.9%, animate to 100 then show 99.9%
                                            toValue = 100;
                                            suffix = "%";
                                            // Use a custom component that shows 99.9% at the end
                                            return (
                                                <GlowEffect key={i} color="#6366f1" intensity={0}>
                                                    <div className="text-center p-4 sm:p-6 glass rounded-2xl md:rounded-3xl border border-border/20">
                                                        <div className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                                            <ScrollCounter from={0} to={99} suffix=".9%" />
                                                        </div>
                                                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">{item.label}</div>
                                                    </div>
                                                </GlowEffect>
                                            );
                                        } else {
                                            toValue = parseFloat(numStr);
                                            suffix = "%";
                                        }
                                    } else {
                                        toValue = parseFloat(item.number);
                                    }
                                    
                                    return (
                                        <GlowEffect key={i} color="#6366f1" intensity={0}>
                                            <div className="text-center p-4 sm:p-6 glass rounded-2xl md:rounded-3xl border border-border/20">
                                                <div className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                                    <ScrollCounter from={0} to={toValue} suffix={suffix} />
                                                </div>
                                                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{item.label}</div>
                                            </div>
                                        </GlowEffect>
                                    );
                                })}
                            </div>
                        </ScrollStagger>
                    </div>
                </ScrollAnimation>

                {/* Call to Action */}
                <ScrollAnimation direction="up" delay={1.6}>
                    <div className="text-center">
                        <GlowEffect color="#6366f1" intensity={0}>
                            <div className="glass p-6 md:p-12 border border-border/20 rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl mx-auto space-y-6 md:space-y-8">
                                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Ready to Work with <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Us?</span></h2>
                                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Join our growing list of satisfied clients and experience the difference.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Magnetic>
                                        <GlowEffect color="#6366f1" intensity={0}>
                                            <Button size="lg" asChild className="w-full sm:w-auto group gradient-primary text-white px-8 py-6 text-lg">
                                                <Link href="/contact#get-in-touch" className="flex items-center justify-center">
                                                    Get Started Today <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>
                                        </GlowEffect>
                                    </Magnetic>
                                    <Magnetic>
                                        <Button size="lg" variant="outline" asChild className="w-full sm:w-auto group bg-white border-2 border-blue-800 text-blue-800 hover:bg-blue-50 rounded-lg px-8 py-6 text-lg">
                                            <Link href="/solutions" className="flex items-center justify-center">
                                                View Our Solutions <Zap className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                            </Link>
                                        </Button>
                                    </Magnetic>
                                </div>
                            </div>
                        </GlowEffect>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
