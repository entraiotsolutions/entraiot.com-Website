"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Wifi, 
  Activity, 
  Brain, 
  Settings, 
  Cloud, 
  MapPin, 
  Zap, 
  ArrowRight, 
  ChevronDown,
  Database,
  BarChart2,
  Cpu,
  TrendingUp,
  Monitor,
  Code2,
  Server,
  ShieldCheck,
  Users
} from "lucide-react";
import { ParticleField, FloatingElement, CursorConnector } from "@/components/ui/particle-effects";




// --- Data ---

const iotPortfolio = [
  {
    id: 1,
    title: "IoT Device Integration",
    desc: "Connecting physical devices — sensors, machines, and embedded systems — to the internet for seamless data collection and real-time communication.",
    image: "/portfolio/image2.jpeg",
    category: "Connectivity",
    icon: Wifi,
    iconColor: "#93c5fd",
    iconBg: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
    tags: ["Sensors", "Embedded", "M2M", "Protocols"]
  },
  {
    id: 2,
    title: "Real-Time Monitoring & Dashboards",
    desc: "Interactive live dashboards delivering instant business insights — monitor KPIs, operations, and performance in real time.",
    image: "/portfolio/image4.jpeg",
    category: "Analytics",
    icon: Activity,
    iconColor: "#34d399",
    iconBg: "linear-gradient(135deg,#065f46,#0f766e)",
    tags: ["Live Data", "Grafana", "KPIs", "Alerts"]
  },
  {
    id: 3,
    title: "AI-Based Predictive Maintenance",
    desc: "AI-driven analytics that predict equipment failures before they occur — minimizing downtime and slashing maintenance costs.",
    image: "/portfolio/image9.jpeg",
    category: "AI / ML",
    icon: Brain,
    iconColor: "#f472b6",
    iconBg: "linear-gradient(135deg,#701a75,#9f1239)",
    tags: ["Predictive AI", "ML Models", "Uptime", "Alerts"]
  },
  {
    id: 4,
    title: "Industrial Automation",
    desc: "Automating manual processes with IoT-enabled systems that improve efficiency, accuracy, and productivity across operations.",
    image: "/portfolio/image6.jpeg",
    category: "Automation",
    icon: Settings,
    iconColor: "#fb923c",
    iconBg: "linear-gradient(135deg,#78350f,#b45309)",
    tags: ["Robotics", "PLC", "SCADA", "OT/IT"]
  },
  {
    id: 5,
    title: "Cloud Integration & Data Management",
    desc: "Scalable cloud infrastructure for securely storing, managing, and analyzing IoT data — accessible from anywhere, anytime.",
    image: "/portfolio/image13.jpeg",
    category: "Cloud",
    icon: Cloud,
    iconColor: "#818cf8",
    iconBg: "linear-gradient(135deg,#1e1b4b,#4f46e5)",
    tags: ["AWS", "Azure", "Data Lake", "APIs"]
  },
  {
    id: 6,
    title: "Asset Tracking & Smart Logistics",
    desc: "Real-time GPS and IoT tracking of vehicles, goods, and assets — making logistics faster, smarter, and fully visible.",
    image: "/portfolio/image18.jpeg",
    category: "Logistics",
    icon: MapPin,
    iconColor: "#fbbf24",
    iconBg: "linear-gradient(135deg,#713f12,#92400e)",
    tags: ["GPS", "Fleet", "RFID", "Real-Time"]
  },
  {
    id: 7,
    title: "Smart Energy & Resource Management",
    desc: "Intelligent monitoring that optimizes energy consumption and resource usage — cutting costs while driving sustainability.",
    image: "/portfolio/image19.jpeg",
    category: "Sustainability",
    icon: Zap,
    iconColor: "#4ade80",
    iconBg: "linear-gradient(135deg,#14532d,#166534)",
    tags: ["Energy", "Sustainability", "Smart Grid", "Meters"]
  }
];

const itPortfolio = [
  {
    id: 1,
    title: "Web & Mobile App Development",
    desc: "Full-stack web and cross-platform mobile applications built with modern frameworks for seamless user experiences.",
    image: "/portfolio/image5.jpeg",
    icon: Monitor,
    iconBg: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    tags: ["React", "Flutter", "Node.js", "Next.js"]
  },
  {
    id: 2,
    title: "Custom Software Solutions",
    desc: "Tailor-made enterprise software, SaaS platforms, and API integrations designed to fit your exact business workflows.",
    image: "/portfolio/image14.jpeg",
    icon: Code2,
    iconBg: "linear-gradient(135deg,#6d28d9,#8b5cf6)",
    tags: ["Enterprise", "SaaS", "APIs", "Integration"]
  },
  {
    id: 3,
    title: "Cloud Infrastructure & DevOps",
    desc: "End-to-end cloud setup, CI/CD pipelines, containerization, and infrastructure automation for reliable deployments.",
    image: "/portfolio/image15.jpeg",
    icon: Server,
    iconBg: "linear-gradient(135deg,#0369a1,#0ea5e9)",
    tags: ["AWS", "Docker", "CI/CD", "Kubernetes"]
  },
  {
    id: 4,
    title: "Cybersecurity & Compliance",
    desc: "Comprehensive security audits, vulnerability assessments, and compliance frameworks to protect your digital assets.",
    image: "/portfolio/image12.jpeg",
    icon: ShieldCheck,
    iconBg: "linear-gradient(135deg,#1a1a3e,#2d1b69)",
    tags: ["ISO 27001", "VAPT", "Firewall", "Compliance"]
  },
  {
    id: 5,
    title: "AI & Data Analytics",
    desc: "Turning raw data into business intelligence using machine learning models, dashboards, and predictive analytics.",
    image: "/portfolio/image16.jpeg",
    icon: BarChart2,
    iconBg: "linear-gradient(135deg,#0f766e,#0d9488)",
    tags: ["ML", "Power BI", "Python", "Insights"]
  },
  {
    id: 6,
    title: "IT Consulting & 24/7 Support",
    desc: "Strategic IT consulting, digital transformation roadmaps, and round-the-clock support partnerships.",
    image: "/portfolio/image20.jpeg",
    icon: Users,
    iconBg: "linear-gradient(135deg,#334155,#475569)",
    tags: ["24/7 Support", "Strategy", "Digital Transformation"]
  }
];

const flowSteps = [
  { icon: Wifi, text: "Connect Devices" },
  { icon: Database, text: "Collect Data" },
  { icon: BarChart2, text: "Analyze" },
  { icon: Cpu, text: "Automate" },
  { icon: TrendingUp, text: "Improve Business" }
];

// --- Components ---

const Card = ({ item, index, type }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white border border-slate-200 rounded-[20px] overflow-hidden transition-all duration-400 hover:-translate-y-[10px] hover:shadow-md hover:border-blue-300"
    >
      {/* Image Area */}
      {type === "iot" ? (
        <div className="relative w-full h-[220px] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

          {/* Icon Badge */}
          <div 
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: item.iconBg, boxShadow: `0 4px 15px ${item.iconColor}66` }}
          >
            <item.icon className="w-[18px] h-[18px] text-white" />
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            {item.category}
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[200px] overflow-hidden rounded-t-2xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          
          {/* Icon Badge */}
          <div 
            className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: item.iconBg }}
          >
            <item.icon size={20} className="text-white" />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-5 flex flex-col h-full">
        <h3 className={`font-bold text-slate-900 mb-2 transition-colors ${type === 'it' ? 'text-xl' : 'text-[1.1rem] group-hover:text-blue-600'}`}>
          {item.title}
        </h3>
        <p className="text-sm text-slate-600 leading-[1.6] mb-[14px] line-clamp-3">
          {item.desc}
        </p>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, i) => (
            <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[11px] text-slate-500 font-medium uppercase tracking-tight">
            {type === "iot" ? "IoT Service" : "IT Service"}
          </span>
          <button className="flex items-center gap-1 text-sm text-blue-600 font-semibold group/btn hover:text-blue-700 transition-colors">
            Explore 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("iot");
  const iotRef = useRef(null);
  const itRef = useRef(null);

  // Intersection Observer for Tab Highlighting
  useEffect(() => {
    const options = { threshold: 0.3 };
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id === "iot-section" ? "iot" : "it");
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    if (iotRef.current) observer.observe(iotRef.current);
    if (itRef.current) observer.observe(itRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden">
      <style jsx global>{`
        @keyframes flowPulse { 0%,100%{opacity:0.3;transform:translateX(0)} 50%{opacity:1;transform:translateX(4px)} }
        
        .animated-underline { width: 0; height: 3px; border-radius: 99px; background: linear-gradient(90deg, #2563eb, #7c3aed); transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .underline-active { width: 120px; }
      `}</style>

      {/* --- Hero Section --- */}
      <section className="relative min-h-[450px] flex flex-col items-center justify-center text-center pt-20 pb-32 overflow-hidden gradient-accent">
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

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
              🚀 Entraiot Solutions Portfolio
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-[900] leading-tight text-[#0f172a] mb-6">
              Our Work. <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Our Proof.</span>
            </h1>
            <p className="text-[#475569] max-w-[600px] mx-auto text-lg mb-10 leading-relaxed">
              Explore how Entraiot transforms businesses through <span className="text-[#2563eb] font-bold">IoT & AI innovation</span>
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection("iot-section")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeTab === "iot" 
                    ? "bg-blue-600 text-white border-transparent shadow-lg shadow-blue-200" 
                    : "bg-white/80 backdrop-blur-sm border-slate-200 text-slate-600 hover:border-blue-300"
                }`}
              >
                ⚡ IoT Services
              </button>
              <button
                onClick={() => scrollToSection("it-section")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeTab === "it" 
                    ? "bg-blue-600 text-white border-transparent shadow-lg shadow-blue-200" 
                    : "bg-white/80 backdrop-blur-sm border-slate-200 text-slate-600 hover:border-blue-300"
                }`}
              >
                💻 IT Services
              </button>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-16 text-blue-500/50"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </motion.div>
        </div>
      </section>

      <div className="container relative z-10 mx-auto px-4">

        {/* --- IoT Section --- */}
        <section id="iot-section" ref={iotRef} className="relative scroll-mt-24 mb-32 py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent dark:via-blue-950/10 pointer-events-none"></div>
          <div className="relative z-10">
          <div className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-4">
              IoT Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-4">
              IoT Service <span className="bg-gradient-to-r from-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <p className="text-[#475569] max-w-[500px]">Real-world intelligent systems powering smarter industries</p>
            <div className={`animated-underline mt-4 ${activeTab === "iot" ? "underline-active" : ""}`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iotPortfolio.map((item, i) => (
              <Card key={item.id} item={item} index={i} type="iot" />
            ))}
          </div>
          </div>
        </section>

        {/* --- Animated Flow Strip --- */}
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-blue-50 border-y border-blue-100 py-12 mb-32">
          <div className="container mx-auto px-4">
            <p className="text-slate-500 text-center text-xs font-bold uppercase tracking-[0.2em] mb-10">How our IoT solutions work end-to-end</p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 max-w-6xl mx-auto">
              {flowSteps.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-blue-200 text-slate-700 shadow-lg transition-transform hover:scale-105">
                    <step.icon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold whitespace-nowrap">{step.text}</span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div 
                      className="hidden lg:block text-blue-500/40 font-bold text-xl"
                      style={{ animation: `flowPulse 1.5s ease-in-out infinite ${i * 0.3}s` }}
                    >
                      →
                    </div>
                  )}
                  {i < flowSteps.length - 1 && (
                    <div className="lg:hidden text-blue-500/40 rotate-90 my-2">↓</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* --- IT Section --- */}
        <section id="it-section" ref={itRef} className="relative scroll-mt-24 pb-32 pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/10 to-transparent dark:via-emerald-950/5 pointer-events-none"></div>
          <div className="relative z-10">
          <div className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold uppercase tracking-wider mb-4">
              Enterprise Tech
            </div>
            <h2 className="text-3xl md:text-4xl font-[800] text-[#0f172a] mb-4">
              IT Service <span className="bg-gradient-to-r from-[#10b981] to-[#14b8a6] bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <p className="text-[#475569] max-w-[500px]">Enterprise-grade technology solutions built for scale</p>
            <div className={`animated-underline mt-4 ${activeTab === "it" ? "underline-active" : ""}`} style={{ background: 'linear-gradient(90deg, #10b981, #14b8a6)' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itPortfolio.map((item, i) => (
              <Card key={item.id} item={item} index={i} type="it" />
            ))}
          </div>
          </div>
        </section>

      </div>
    </div>
  );
}
