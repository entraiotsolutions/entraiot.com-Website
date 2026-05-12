"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Users,
  Shield,
  TrendingUp,
  MessageSquare
} from "lucide-react";

void Phone;
void MapPin;
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollAnimation, ScrollStagger } from "@/components/ui/scroll-animations";

import { ParticleField, FloatingElement, GlowEffect, Magnetic, CursorConnector } from "@/components/ui/particle-effects";

// EmailJS configuration from environment (must be prefixed with NEXT_PUBLIC_ for client components)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const contactFormSchema = z.object({
  fullname: z.string().min(2, { message: "Your Name must be at least 4 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  company: z.string().min(2, { message: "Company name must be at least 4 characters." }),
  industry: z.string().min(2, { message: "Please select your industry." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;


 const contactMethods = [
  {
    icon: Mail,
    title: "Business Inquiries",
    value: "bde@entraiot.com",
    description: "Place orders, business inquiries & partnerships",
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-500/20",
    glowColor: "#8b5cf6",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=bde@entraiot.com&su=Business Inquiry",
    type: "email",
  },   // ✅ comma here is IMPORTANT

  {
    icon: Mail,
    title: "Customer Service",
    value: "info@entraiot.com",
    description: "Queries or product/service support",
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-500/20",
    glowColor: "#3b82f6",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=info@entraiot.com",
    type: "email",
  }  // ❌ no comma here (last item)
];


const industries = [
  "Logistics",
  "Manufacturing",
  "Hospitality",
  "Energy Management",
  "Smart Cities",
  "Healthcare",
  "Smart Retail",
  "Agriculture",
  "Other",
];

const features = [
  { icon: CheckCircle, text: "Free Consultation", gradient: "from-emerald-500 to-green-600" },
  { icon: Shield, text: "Secure & Private", gradient: "from-blue-500 to-blue-600" },
  { icon: Clock, text: "24/7 Support", gradient: "from-purple-500 to-indigo-600" },
  { icon: Users, text: "Expert Team", gradient: "from-orange-500 to-red-600" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      message: "",
    },
  });

  // Handle both clean URL route params and query parameters to pre-fill form
  useEffect(() => {
    // Extract params from clean URLs (e.g., /contact/industry/logistics, /contact/service/iot-consulting/demo)
    let service: string | null = null;
    let industry: string | null = null;
    let product: string | null = null;
    let demo: string | null = null;

    // Check clean URL format: /contact/[type]/[value] or /contact/[type]/[value]/[action]
    const pathParts = pathname?.split("/").filter(Boolean) || [];
    if (pathParts.length >= 3 && pathParts[0] === "contact") {
      const type = pathParts[1]; // industry, service, or product
      const value = pathParts[2]; // the actual value
      const action = pathParts[3]; // demo or undefined

      if (type === "industry" && value) {
        industry = value;
        if (action === "demo") {
          demo = "true";
        }
      } else if (type === "service" && value) {
        service = value;
        if (action === "demo") {
          demo = "true";
        }
      } else if (type === "product" && value) {
        product = value;
      }
    }

    // Fallback to query params if not in clean URL format
    if (!service && !industry && !product) {
      service = searchParams.get("service");
      industry = searchParams.get("industry");
      product = searchParams.get("product");
      demo = searchParams.get("demo");
    } else {
      // If we have clean URL params, also check query params for demo flag
      if (!demo) {
        demo = searchParams.get("demo");
      }
    }

    if (industry && industries.includes(industry)) {
      form.setValue("industry", industry);
    }

    if (service || product || demo) {
      let messagePrefix = "";
      if (demo === "true") {
        messagePrefix = "I would like to request a demo for ";
      } else {
        messagePrefix = "I'm interested in ";
      }

      if (service) {
        messagePrefix += `the ${service} service. `;
      } else if (product) {
        messagePrefix += `the ${product} product. `;
      }

      if (messagePrefix) {
        const currentMessage = form.getValues("message");
        form.setValue("message", messagePrefix + (currentMessage || "Please provide more information."));
      }
    }
  }, [searchParams, pathname, form]);

  // Handle hash navigation to scroll to "Get In Touch" section
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToSection = () => {
      const hash = window.location.hash;
      if (hash === "#get-in-touch" || hash === "#contact-form") {
        // Longer delay to ensure the component is fully rendered and page is loaded
        setTimeout(() => {
          const element = document.getElementById("get-in-touch");
          if (element) {
            // Calculate offset for fixed header (64px header + 20px padding)
            const headerOffset = 84;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 500); // Increased delay for better reliability
      }
    };

    // Scroll on initial load if hash is present
    scrollToSection();

    // Listen for hash changes (when clicking links on the same page)
    const handleHashChange = () => {
      scrollToSection();
    };

    window.addEventListener("hashchange", handleHashChange);

    // Also handle Next.js client-side navigation
    // Check hash after a short delay when pathname changes
    const timeoutId = setTimeout(() => {
      const hash = window.location.hash;
      if (hash === "#get-in-touch" || hash === "#contact-form") {
        scrollToSection();
      }
    }, 600);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

 const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Guard against missing configuration
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.error("EmailJS config missing:", {
          hasService: Boolean(EMAILJS_SERVICE_ID),
          hasTemplate: Boolean(EMAILJS_TEMPLATE_ID),
          hasPublicKey: Boolean(EMAILJS_PUBLIC_KEY),
        });
        alert("Contact form is temporarily unavailable. Please use email or phone from the left panel.");
        setIsSubmitting(false);
        return;
      }
      
      // Validate that IDs are not just whitespace
      if (!EMAILJS_SERVICE_ID.trim() || !EMAILJS_TEMPLATE_ID.trim() || !EMAILJS_PUBLIC_KEY.trim()) {
        console.error("EmailJS config has empty values");
        alert("Contact form configuration error. Please contact us directly at bde@entraiot.com or call +91 99444 42061.");
        setIsSubmitting(false);
        return;
      }

      // Prepare template parameters with proper formatting
      const templateParams = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        company: data.company,
        industry: data.industry,
        message: data.message,
        // Add additional fields for better template compatibility
        from_name: data.fullname,
        from_email: data.email,
        to_name: "Entraiot Solutions",
        reply_to: data.email,
      };

      // Initialize EmailJS if not already initialized (for v4+)
      if (!emailjs.init) {
        // For EmailJS v4+, we need to initialize with public key
        // But the send method should work without explicit init if using publicKey option
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { 
          publicKey: EMAILJS_PUBLIC_KEY
        }
      );

      console.log("EmailJS success:", result);
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error("EmailJS error:", error);
      
      // Extract detailed error information from EmailJS response
      let errorMessage = "Failed to send message. Please contact us directly at bde@entraiot.com or call +91 99444 42061.";
      
      const errorObj = error as { text?: string; status?: number };
      
      if (errorObj?.text) {
        console.error("EmailJS error text:", errorObj.text);
      }
      
      if (errorObj?.status) {
        console.error("EmailJS error status:", errorObj.status);
      }
      
      // Handle specific error codes
      if (errorObj?.status === 400) {
        if (errorObj?.text?.toLowerCase().includes('service id')) {
          errorMessage = "EmailJS Service ID is missing or invalid. Please check your EmailJS configuration. For now, please contact us directly at bde@entraiot.com or call +91 99444 42061.";
          console.error("EmailJS Service ID Error:", {
            serviceId: EMAILJS_SERVICE_ID ? `${EMAILJS_SERVICE_ID.substring(0, 4)}...` : 'MISSING',
            hint: "Check your .env.local file for NEXT_PUBLIC_EMAILJS_SERVICE_ID"
          });
        } else if (errorObj?.text?.toLowerCase().includes('template')) {
          errorMessage = "EmailJS Template ID is missing or invalid. Please check your EmailJS configuration. For now, please contact us directly at bde@entraiot.com or call +91 99444 42061.";
          console.error("EmailJS Template ID Error:", {
            templateId: EMAILJS_TEMPLATE_ID ? `${EMAILJS_TEMPLATE_ID.substring(0, 4)}...` : 'MISSING',
            hint: "Check your .env.local file for NEXT_PUBLIC_EMAILJS_TEMPLATE_ID"
          });
        } else if (errorObj?.text?.toLowerCase().includes('public key')) {
          errorMessage = "EmailJS Public Key is missing or invalid. Please check your EmailJS configuration. For now, please contact us directly at bde@entraiot.com or call +91 99444 42061.";
          console.error("EmailJS Public Key Error:", {
            hasPublicKey: Boolean(EMAILJS_PUBLIC_KEY),
            hint: "Check your .env.local file for NEXT_PUBLIC_EMAILJS_PUBLIC_KEY"
          });
        } else if (errorObj?.text?.includes('service') || errorObj?.text?.includes('Service')) {
          errorMessage = "Email service configuration error. Please contact us directly at bde@entraiot.com or call +91 99444 42061.";
        } else {
          errorMessage = `Email service error (400): ${errorObj?.text || 'Bad request'}. Please contact us directly at bde@entraiot.com or call +91 99444 42061.`;
        }
      } else if (errorObj?.status === 412) {
        // Check for specific authentication errors (Zoho, Gmail, etc.)
        const errorText = errorObj?.text || '';
        if (errorText.toLowerCase().includes('zoho') || errorText.toLowerCase().includes('authentication failed')) {
          errorMessage = "Email service authentication failed. Please contact us directly at bde@entraiot.com or call +91 99444 42061.";
          console.error("EmailJS Zoho Authentication Error:", {
            status: errorObj?.status,
            text: errorObj?.text,
            hint: "The Zoho email service credentials in EmailJS dashboard are invalid or expired. Please re-authenticate the Zoho service in EmailJS dashboard."
          });
        } else {
          errorMessage = "Email service authentication expired. Please contact us directly at bde@entraiot.com or call +91 99444 42061.";
          console.error("EmailJS Authentication Error:", {
            status: errorObj?.status,
            text: errorObj?.text,
            hint: "Re-verify your email service in EmailJS dashboard"
          });
        }
      } else if (errorObj?.status === 401 || errorObj?.status === 403) {
        errorMessage = "Email service authentication failed. Please contact us directly at info@entraiot.com or call +91 99444 42061.";
      } else if (error instanceof Error) {
        if (error.message.includes('412')) {
          errorMessage = "Email service authentication expired. Please contact us directly at bde@entraiot.com or call +91 99444 42061.";
        } else if (error.message.includes('Invalid template')) {
          errorMessage = "Email template configuration error. Please contact us directly at bde@entraiot.com or call +91 99444 42061.";
        } else {
          errorMessage = `Failed to send message: ${error.message}. Please contact us directly at bde@entraiot.com or call +91 99444 42061.`;
        }
      }
      
      // Log full error details for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.error("Full EmailJS error details:", {
          error,
          status: errorObj?.status,
          text: errorObj?.text,
          serviceId: EMAILJS_SERVICE_ID ? `${EMAILJS_SERVICE_ID.substring(0, 4)}...` : 'missing',
          templateId: EMAILJS_TEMPLATE_ID ? `${EMAILJS_TEMPLATE_ID.substring(0, 4)}...` : 'missing',
          hasPublicKey: Boolean(EMAILJS_PUBLIC_KEY)
        });
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const onSubmit = async (data: ContactFormValues) => {
  //   setIsSubmitting(true);
    
  //   // Simulate form submission
  //   await new Promise(resolve => setTimeout(resolve, 2000));
    
  //   console.log(data);
  //   setIsSubmitted(true);
  //   setIsSubmitting(false);
  // };

  if (isSubmitted) {
    return (
      <section className="relative section-padding gradient-accent overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <ParticleField 
            count={30}
            colors={["#10b981", "#3b82f6", "#8b5cf6"]}
            size={5}
            speed={20}
            opacity={0.4}
          />
          <FloatingElement intensity={12} speed={1} className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl">
            <div></div>
          </FloatingElement>
          <FloatingElement intensity={15} speed={3} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl">
            <div></div>
          </FloatingElement>
          <FloatingElement intensity={15} speed={2} className="absolute center-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl">
            <div></div>
          </FloatingElement>
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
          <div className="max-w-2xl mx-auto text-center">
            <ScrollAnimation direction="scale" delay={0.2}>
              <GlowEffect color="#10b981" intensity={0}>
                <div className="glass backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/20 shadow-2xl">
                  <FloatingElement intensity={8} speed={3}>
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                  </FloatingElement>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Thank You for Your <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Message!</span>
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    We & apos;ve received your inquiry and will get back to you within <span className="text-primary font-semibold">24 hours</span>. 
                    Our team is excited to discuss how we can help transform your business with IoT solutions.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <GlowEffect color="#6366f1" intensity={15}>
                      <div className="flex items-center space-x-3 p-4 glass backdrop-blur-sm rounded-2xl border border-border/20">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Response within 24 hours</span>
                      </div>
                    </GlowEffect>
                    <GlowEffect color="#10b981" intensity={15}>
                      <div className="flex items-center space-x-3 p-4 glass backdrop-blur-sm rounded-2xl border border-border/20">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Expert consultation team</span>
                      </div>
                    </GlowEffect>
                  </div>
                  
                  <Magnetic strength={0.1}>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="glass backdrop-blur-sm border-border/50 hover:bg-accent">
                      Send Another Message
                    </Button>
                  </Magnetic>
                </div>
              </GlowEffect>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative section-padding gradient-secondary overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField 
          count={35}
          colors={["#6366f1", "#8b5cf6", "#3b82f6", "#10b981"]}
          size={4}
          speed={5}
          opacity={1}
        />
        <FloatingElement intensity={10} speed={3} className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl">
          <div></div>
        </FloatingElement>
        <FloatingElement intensity={12} speed={2} className="absolute bottom-1/2 right-1/4 transform -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl">
          <div></div>
        </FloatingElement>
        <FloatingElement intensity={8} speed={0.5} className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl">
          <div></div>
        </FloatingElement>
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
        {/* Enhanced Header */}
        <div id="get-in-touch" className="text-center mb-12">
          <ScrollAnimation direction="up" delay={0.2}>
            <Badge variant="outline" className="mb-6 glass backdrop-blur-sm border-primary/30 text-lg px-4 py-1.5 rounded-full">
              <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Get In Touch</span>
            </Badge>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.4}>
            <h2 className="text-5xl md:text-6xl font-[900] text-[#0f172a] max-w-3xl mx-auto text-center" style={{ lineHeight: '1.15' }}>
              Let&apos;s Build Something <br />
              <span className="bg-gradient-to-r from-[#2563eb] to-[#2563eb] bg-clip-text text-transparent">Amazing</span> Together
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.6}>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto text-center mt-6">
              Ready to transform your business with <span className="text-[#2563eb] font-semibold">IoT solutions?</span> We&apos;re here to help you 
              every step of the way. Get in touch for a free consultation.
            </p>
          </ScrollAnimation>
        </div>

        {/* Enhanced Features */}
        <ScrollStagger staggerDelay={0.1} childDelay={0.8}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </ScrollStagger>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Enhanced Contact Methods */}
          <div className="space-y-8">
            <ScrollAnimation direction="left" delay={0.4}>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">
                  <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Multiple Ways</span> to Connect
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Choose the method that works best for you. Our team is ready to discuss your IoT needs and provide expert guidance.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollStagger staggerDelay={0.15} childDelay={0.8}>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <GlowEffect key={index} color={method.glowColor} intensity={0}>
                      <a
                        href={method.link}
                        target={method.type === "address" ? "_blank" : undefined}
                        rel={method.type === "address" ? "noopener noreferrer" : undefined}
                        
                        className="block"
                      >
                        <Card className={`${method.bgColor} border-2 ${method.borderColor} py-0 backdrop-blur-sm hover:border-opacity-40 transition-all duration-300 cursor-pointer hover:shadow-lg`}>
                          <CardContent className="p-2">
                            <div className="space-y-2">
                              <h4 className="text-lg font-semibold text-foreground mb-0 pl-1 pb-1">{method.title}</h4>
                              <div className="flex items-center space-x-3 mt-2">
                                <Magnetic strength={0.1}>
                                  <div className="w-12 h-12 bg-background/80 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Icon className={`h-6 w-6 ${method.color}`} />
                                  </div>
                                </Magnetic>
                                <p className="text-foreground font-medium mb-0 mt-1">{method.value}</p>
                              </div>
                              <p className="text-sm text-muted-foreground pl-1">{method.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    </GlowEffect>
                  );
                })}
              </div>
            </ScrollStagger>

            {/* Enhanced Business Hours */}
            <ScrollAnimation direction="left" delay={1.0}>
              <GlowEffect color="#6366f1" intensity={0}>
                <a href="https://g.co/kgs/pCTcZm9" target="_blank" rel="noopener noreferrer nofollow">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold text-foreground">Business Hours</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                        9:00 AM - 6:00 PM IST
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-500/30">
                        10:00 AM - 4:00 PM IST
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <Badge variant="outline" className="border-border/50 bg-red-500/20 text-red-700">
                        Closed
                      </Badge>
                    </div>
                  </div>
                </div>
                </a>
              </GlowEffect>
            </ScrollAnimation>
          </div>

          {/* Enhanced Contact Form */}
          <ScrollAnimation direction="right" delay={0.6}>
            <GlowEffect color="#6366f1" intensity={0}>
              <div id="contact-form" className="bg-white rounded-3xl p-9 shadow-sm border border-slate-200">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">
                      Send us a <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Message</span>
                    </h2>
                    <p className="text-slate-600">
                      Fill out the form below and we&apos;ll get back to you within 24 hours
                    </p>
                  </div>

                  <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-11 w-full max-w-2xl mx-auto">
                      <div className="grid grid-cols-1">
                        <FormField
                          control={form.control}
                          name="fullname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John" 
                                  {...field} 
                                  className="glass backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                     
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="john@example.com" 
                                  {...field} 
                                  className="glass backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel"
                                  placeholder="+1 (555) 123-4567" 
                                  {...field} 
                                  className="glass backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Company</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Company Name" 
                                {...field} 
                                className="glass backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Industry</FormLabel>
                            <FormControl>
                              <select 
                                suppressHydrationWarning
                                {...field} 
                                className="w-full px-3 py-2 text-sm rounded-lg glass backdrop-blur-sm border border-border/50 focus:border-primary/50 transition-colors bg-background/80 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                <option value="" className="bg-background text-foreground">Select your industry</option>
                                {industries.map((industry) => (
                                  <option key={industry} value={industry} className="bg-background text-foreground">
                                    {industry}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your IoT needs and how we can help..."
                                className="min-h-[240px] glass backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Magnetic strength={0.2}>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity group"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </Magnetic>
                    </form>
                  </Form>
                </div>
              </div>
            </GlowEffect>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}