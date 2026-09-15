export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Entraiot Solutions Private Limited",
  "url": "https://entraiot.com",
  "logo": "https://entraiot.com/logo.webp",
  "image": "https://entraiot.com/logo.webp",
  "description": "Empowering industries with real-time IoT solutions that optimize operations, improve sustainability and bring intelligence to businesses and communities.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "W-126, 3rd Floor, 3rd Ave, Anna Nagar",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600040",
    "addressCountry": "IN"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-99444-42061",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    {
      "@type": "ContactPoint",
      "email": "info@entraiot.com",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "English"
    }
  ],
  "sameAs": [
    "https://lnkd.in/gJiVD6Pr"
  ],
  "founder": {
    "@type": "Person",
    "name": "Salvin Jones",
    "jobTitle": "Founder & CEO",
    "image": "https://entraiot.com/founder.jpg",
    "sameAs": "https://lnkd.in/gJiVD6Pr"
  },
  "foundingDate": "2025",
  "industry": "IoT & AI Solutions",
  "services": [
    "End-to-End IoT Deployment",
    "Real-Time Dashboards",
    "Predictive Maintenance",
    "Secure Network Integration",
    "Application Development",
    "Custom UI/UX Interfaces"
  ],
  "employees": [
    {
      "@type": "Person",
      "name": "Salvin Jones",
      "jobTitle": "Founder & CEO",
      "image": "https://entraiot.com/founder.jpg"
    }
  ]
};

export const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "IoT & AI Solutions",
  "description": "Comprehensive IoT and AI solutions including deployment, dashboards, predictive maintenance and secure integration.",
  "provider": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  },
  "serviceType": "Technology Services",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "End-to-End IoT Deployment",
      "description": "Comprehensive IoT deployments from sensor integration to cloud analytics"
    },
    {
      "@type": "Offer",
      "name": "Real-Time Dashboards",
      "description": "Interactive dashboards with instant insights from connected devices"
    },
    {
      "@type": "Offer",
      "name": "Predictive Maintenance",
      "description": "AI algorithms for pattern detection and equipment issue forecasting"
    }
  ]
};

export const breadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Homepage Schema
export const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Entraiot Solutions",
  "url": "https://entraiot.com",
  "description": "Empowering industries with real-time IoT solutions and AI solutions. Expert IoT deployment, predictive maintenance and smart automation.",
  "publisher": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://entraiot.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// About Page Schema
export const aboutPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Entraiot Solutions",
  "url": "https://entraiot.com/about",
  "description": "Learn about Entraiot Solutions' mission, vision and founder Salvin Jones. Discover our expertise in IoT, AI and smart automation solutions.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp",
    "description": "Empowering industries with real-time IoT solutions that optimize operations, improve sustainability and bring intelligence to businesses and communities.",
    "founder": {
      "@type": "Person",
      "name": "Salvin Jones",
      "jobTitle": "Founder & CEO",
      "image": "https://entraiot.com/CEO.jpg",
      "sameAs": "https://www.linkedin.com/in/salvin-jones-3238899a",
      "description": "B.E. in Electronics & Communication from St. Joseph's College of Engineering. Former Embedded Engineer at Nissi Software Systems with 1.8 years of experience."
    },
    "foundingDate": "2025",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "W-126, 3rd Floor, 3rd Ave, Anna Nagar",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600040",
      "addressCountry": "IN"
    }
  }
};

// Solutions Page Schema
export const solutionsPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "IoT & AI Solutions",
  "url": "https://entraiot.com/solutions",
  "description": "Comprehensive IoT and AI solutions including deployment, dashboards, predictive maintenance and secure integration.",
  "provider": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  },
  "serviceType": "Technology Services",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "End-to-End IoT Deployment",
      "description": "Comprehensive IoT deployments from sensor integration to cloud analytics, enabling smooth and scalable rollouts tailored to your business goals.",
      "itemOffered": {
        "@type": "Service",
        "name": "IoT Deployment Services"
      }
    },
    {
      "@type": "Offer",
      "name": "Real-Time Dashboards",
      "description": "Interactive dashboards deliver instant insights from connected devices, empowering faster, data-driven decision-making at all operational levels.",
      "itemOffered": {
        "@type": "Service",
        "name": "Real-Time Dashboard Development"
      }
    },
    {
      "@type": "Offer",
      "name": "Predictive Maintenance",
      "description": "Our AI algorithms detect patterns and forecast equipment issues before they happen, reducing downtime and extending asset life.",
      "itemOffered": {
        "@type": "Service",
        "name": "AI-Powered Predictive Maintenance"
      }
    },
    {
      "@type": "Offer",
      "name": "Secure Network Integration",
      "description": "Robust encryption and secure protocols ensure seamless, protected data flow across all IoT nodes, devices and cloud infrastructure.",
      "itemOffered": {
        "@type": "Service",
        "name": "Secure IoT Network Integration"
      }
    },
    {
      "@type": "Offer",
      "name": "Application Development",
      "description": "Custom-built applications leverage IoT and AI intelligence to streamline workflows and enhance user control over connected environments.",
      "itemOffered": {
        "@type": "Service",
        "name": "Custom IoT Application Development"
      }
    },
    {
      "@type": "Offer",
      "name": "Custom UI/UX Interfaces",
      "description": "We design intuitive interfaces that make IoT device interaction effortless, translating complex data into user-friendly visuals.",
      "itemOffered": {
        "@type": "Service",
        "name": "IoT UI/UX Design Services"
      }
    }
  ]
};

// Industries Page Schema
export const industriesPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Industries We Serve - IoT Solutions",
  "url": "https://entraiot.com/industries",
  "description": "Discover how Entraiot Solutions transforms industries with IoT intelligence. From logistics to healthcare, our IoT solutions are designed to meet unique challenges.",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Industries We Serve",
    "description": "Industries transformed by our IoT solutions",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Logistics",
        "description": "IoT-enabled fleet tracking and condition monitoring ensure goods are delivered on time and in optimal condition."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Manufacturing",
        "description": "Automate production lines, monitor machinery health and reduce operational inefficiencies with smart factory solutions."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Hospitality",
        "description": "Enhance guest experiences through personalized services, automated room controls and real-time feedback systems."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Energy Management",
        "description": "Optimize energy usage, predict load demands and reduce carbon footprint with smart energy monitoring systems."
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Smart Cities",
        "description": "From traffic flow optimization to smart lighting and waste management, we help cities become safer, cleaner and more efficient."
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Healthcare",
        "description": "Our IoT health modules enable remote patient monitoring, real-time alerts and predictive diagnostics to support better outcomes."
      },
      {
        "@type": "ListItem",
        "position": 7,
        "name": "Smart Retail",
        "description": "Track customer behavior, automate inventory and personalize shopping experiences with intelligent retail solutions."
      },
      {
        "@type": "ListItem",
        "position": 8,
        "name": "Agriculture",
        "description": "Precision farming through AI-powered sensors boosts yield, conserves water and monitors soil health in real time."
      }
    ]
  }
};

// Blog Page Schema
export const blogPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Entraiot Solutions Blog",
  "url": "https://entraiot.com/blog",
  "description": "Stay ahead with expert insights on IoT, AI and smart automation technologies that are transforming industries worldwide.",
  "publisher": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  },
  "blogPost": [
    {
      "@type": "BlogPosting",
      "headline": "Unlocking the Power of RFID with IoT and AI: How Entraiot is Enabling Intelligent Enterprise Transformation",
      "url": "https://entraiot.com/blog/rfid-iot-ai-enterprise-transformation",
      "datePublished": "2025-01-20",
      "dateModified": "2025-01-20",
      "author": {
        "@type": "Person",
        "name": "Salvin Jones",
        "jobTitle": "Founder & CEO",
        "image": "https://entraiot.com/CEO.jpg"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Entraiot Solutions Private Limited",
        "logo": "https://entraiot.com/logo.webp"
      },
      "image": "https://entraiot.com/RFID.webp",
      "description": "How RFID, combined with IoT and AI, delivers real-time visibility, automation and data-driven decision-making to modern enterprises across operations, assets and supply chains.",
      "keywords": ["RFID", "IoT", "AI", "Automation", "Enterprise"]
    },
    {
      "@type": "BlogPosting",
      "headline": "How NFC, IoT and AI Are Transforming Smart Connectivity",
      "url": "https://entraiot.com/blog/nfc-iot-ai-smart-connectivity",
      "datePublished": "2025-01-22",
      "dateModified": "2025-01-22",
      "author": {
        "@type": "Person",
        "name": "Salvin Jones",
        "jobTitle": "Founder & CEO",
        "image": "https://entraiot.com/CEO.jpg"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Entraiot Solutions Private Limited",
        "logo": "https://entraiot.com/logo.webp"
      },
      "image": "https://entraiot.com/NFC2.webp",
      "description": "NFC, IoT and AI integration is driving a new era of smart, connected solutions across smart homes, industrial automation, healthcare and retail personalization.",
      "keywords": ["NFC", "IoT", "AI", "Smart Connectivity", "Automation"]
    }
  ]
};

// Contact Page Schema
export const contactPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Entraiot Solutions",
  "url": "https://entraiot.com/contact",
  "description": "Get in touch with Entraiot Solutions for IoT and AI solutions. Free consultation available for your business transformation needs.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "W-126, 3rd Floor, 3rd Ave, Anna Nagar",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600040",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-99444-42061",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-81245-45524",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "email": "info@entraiot.com",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English"
      }
    ]
  }
};

// FAQ Schema
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What IoT solutions does Entraiot Solutions provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entraiot Solutions provides comprehensive IoT solutions including end-to-end deployment, real-time dashboards, predictive maintenance, secure network integration, custom application development and UI/UX interfaces for IoT devices."
      }
    },
    {
      "@type": "Question",
      "name": "Which industries do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve multiple industries including logistics, manufacturing, hospitality, energy management, smart cities, healthcare, smart retail and agriculture with tailored IoT solutions."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Entraiot Solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact us via phone at +91-99444-42061 or +91-81245-45524, email at bde@entraiot.com, or visit our office at 1&1A, UR Nagar Extn, Anna Nagar W Ext St, Chennai, Tamil Nadu 600101."
      }
    },
    {
      "@type": "Question",
      "name": "What is the response time for inquiries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We respond to all inquiries within 24 hours and provide free consultations for your IoT and AI solution needs."
      }
    }
  ]
};

// Product Schema
export const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Entraiot IoT Solutions",
  "description": "Comprehensive IoT and AI solutions for enterprise transformation",
  "brand": {
    "@type": "Brand",
    "name": "Entraiot Solutions"
  },
  "offers": {
    "@type": "Offer",
    "price": "Contact for pricing",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Entraiot Solutions Private Limited"
    }
  }
};

// IoT Consulting Service Schema
export const iotConsultingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "IoT Consulting Services",
  "description": "Expert IoT consulting for enterprise digital transformation",
  "provider": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  },
  "serviceType": "Technology Consulting",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "offers": {
    "@type": "Offer",
    "name": "IoT Consulting",
    "description": "Strategic IoT consulting for digital transformation"
  }
};

// AI Solutions Service Schema
export const aiSolutionsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Solutions",
  "description": "Artificial Intelligence solutions for predictive analytics and automation",
  "provider": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  },
  "serviceType": "AI Services",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "offers": {
    "@type": "Offer",
    "name": "AI Solutions",
    "description": "AI-powered solutions for predictive maintenance and automation"
  }
};

// Smart Automation Service Schema
export const smartAutomationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Smart Automation",
  "description": "Intelligent automation solutions for industrial and commercial applications",
  "provider": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  },
  "serviceType": "Automation Services",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "offers": {
    "@type": "Offer",
    "name": "Smart Automation",
    "description": "Intelligent automation for enhanced operational efficiency"
  }
};

// Resources Page Schema
export const resourcesStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Resources - IoT & AI Case Studies, Whitepapers & Documentation",
  "url": "https://entraiot.com/resources",
  "description": "Explore Entraiot's comprehensive resources including IoT case studies, AI whitepapers, technical documentation and implementation guides for smart automation solutions.",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Entraiot Resources",
    "description": "Comprehensive resources for IoT and AI solutions",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Case Studies",
        "description": "Real-world examples of IoT and AI implementations across different industries",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Smart Manufacturing Optimization",
            "description": "35% reduction in unplanned downtime through IoT-enabled predictive maintenance"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Fleet & Cargo Intelligence",
            "description": "20% improvement in delivery time accuracy with live GPS tracking and analytics"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Smart Energy Management",
            "description": "30% cost reduction through AI-based load prediction and energy analytics"
          }
        ]
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Whitepapers & Technical Insights",
        "description": "Expert-authored papers covering IoT trends, architectures and implementation best practices",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Building Scalable IoT Solutions: From Sensors to Insights",
            "description": "Complete IoT ecosystem guide from hardware integration to cloud analytics"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI-Driven Predictive Maintenance: The Future of Industrial Efficiency",
            "description": "How AI algorithms and sensor networks reduce downtime and optimize performance"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Secure IoT Infrastructure: Building Trust in Connected Environments",
            "description": "Encryption, authentication and compliance in enterprise-level IoT deployments"
          }
        ]
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Documentation & Product Guides",
        "description": "Technical documentation, API references and integration manuals",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Solution Implementation Manuals",
            "description": "Step-by-step guides for implementing IoT solutions"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Hardware & Sensor Configuration Guides",
            "description": "Complete hardware setup and configuration documentation"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Cloud & API Integration Documentation",
            "description": "API references and cloud integration guides"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Platform Release Notes",
            "description": "Latest updates and feature releases"
          }
        ]
      }
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  }
};

// Products Page Schema
export const productsStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Products - UHF RFID, NFC & BLE Hardware",
  "url": "https://entraiot.com/products",
  "description": "Explore Entraiot's comprehensive range of IoT hardware including UHF RFID readers, NFC modules and BLE devices for enterprise applications.",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Entraiot Hardware Products",
    "description": "Comprehensive range of IoT hardware solutions",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "UHF RFID Readers",
        "description": "High-performance UHF RFID readers for enterprise applications",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "EntraIoT UHF Active Reader Model-A1",
            "description": "Advanced active RFID reader with long-range capabilities"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "EntraIoT UHF Passive Fixed Reader Model-P1",
            "description": "Fixed installation passive RFID reader for asset tracking"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "EntraIoT UHF 4-Port Ethernet Reader Model-P4E",
            "description": "Multi-port Ethernet RFID reader for high-volume applications"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "EntraIoT UHF 2-Port USB Reader Model-P2U",
            "description": "Compact USB RFID reader with dual antenna support"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "EntraIoT UHF Handheld Reader Model-H1 (C72)",
            "description": "Portable handheld RFID reader for mobile applications"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "EntraIoT UHF Chip Reader Model-C1 (PR920)",
            "description": "Compact chip-based RFID reader for embedded applications"
          }
        ]
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "NFC Readers & Modules",
        "description": "Near Field Communication readers and modules for contactless applications",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "EntraIoT NFC USB Reader Model-N1 (ACR122U)",
            "description": "USB NFC reader for desktop and embedded applications"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "EntraIoT NFC Bluetooth Reader Model-N2 (ACR1255U-J1)",
            "description": "Bluetooth-enabled NFC reader for mobile applications"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "EntraIoT NFC Bluetooth Reader Model-N3 (ACR1311U-N2)",
            "description": "Advanced Bluetooth NFC reader with enhanced features"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "EntraIoT NFC Tag IC Model-T1 (Panasonic MN63Y1213)",
            "description": "High-performance NFC tag IC for various applications"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "EntraIoT NFC DESFire Module Model-M1 (M890)",
            "description": "DESFire EV2 compliant NFC module for secure applications"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "EntraIoT NFC IC Model-I1 (ST Electronics M24LR04E-RDW6T/2)",
            "description": "Dual interface NFC IC with RF and I2C communication"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "EntraIoT NFC Dynamic Tag Module Model-D1 (DTAG100)",
            "description": "Dynamic NFC tag module with programmable content"
          }
        ]
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "BLE (Bluetooth Low Energy) Devices",
        "description": "Bluetooth Low Energy devices for IoT and healthcare applications",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "EntraIoT BLE Access Controller Model-B1 (CBox Access)",
            "description": "BLE-based access control system for secure entry management"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "EntraIoT BLE BP Monitor Model-BP1 (iHealth Cuff)",
            "description": "Bluetooth blood pressure monitor for healthcare applications"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "EntraIoT BLE Weigh Scale Model-WS1 (iHealth)",
            "description": "Smart weighing scale with Bluetooth connectivity"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "EntraIoT BLE Glucose Meter Model-G1 (iHealth)",
            "description": "Bluetooth glucose meter for diabetes management"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "EntraIoT BLE Fitness Integration Model-F1 (Fitbit Ionic)",
            "description": "Fitness tracker with comprehensive health monitoring"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "EntraIoT BLE Custom NFC Reader Model-CN1",
            "description": "Custom BLE NFC reader for specialized applications"
          }
        ]
      }
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Entraiot Solutions Private Limited",
    "url": "https://entraiot.com",
    "logo": "https://entraiot.com/logo.webp"
  }
}; 