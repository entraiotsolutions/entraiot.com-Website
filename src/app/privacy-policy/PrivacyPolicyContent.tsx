"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUp, ShieldCheck, ChevronRight } from "lucide-react";

const sections = [
  { id: "introduction", label: "1. Introduction" },
  { id: "company-information", label: "2. Company Information" },
  { id: "information-we-collect", label: "3. Information We Collect" },
  { id: "how-we-use-your-information", label: "4. How We Use Your Information" },
  { id: "legal-basis", label: "5. Legal Basis for Processing Personal Data" },
  { id: "data-sharing-disclosure", label: "6. Data Sharing and Disclosure" },
  { id: "data-retention", label: "7. Data Retention" },
  { id: "cookies-and-tracking", label: "8. Cookies and Tracking Technologies" },
  { id: "your-privacy-rights", label: "9. Your Privacy Rights" },
  { id: "marketing-opt-out", label: "10. Marketing Opt-Out" },
  { id: "data-security", label: "11. Data Security" },
  { id: "international-data-transfers", label: "12. International Data Transfers" },
  { id: "childrens-privacy", label: "13. Children's Privacy" },
  { id: "third-party-links-services", label: "14. Third-Party Links and Services" },
  { id: "iot-specific-privacy-considerations", label: "15. IoT-Specific Privacy Considerations" },
  { id: "changes-to-this-privacy-policy", label: "16. Changes to This Privacy Policy" },
  { id: "contact-us", label: "17. Contact Us" },
];

export default function PrivacyPolicyContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [showTopButton, setShowTopButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sidebarLinks = useMemo(
    () =>
      sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`group block rounded-3xl border px-4 py-3 transition-all duration-200 ${
            activeSection === section.id
              ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
              : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold">{section.label}</span>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
          </div>
        </a>
      )),
    [activeSection]
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].target.id);
      }
    }, options);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/95 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                Effective: May 14, 2026
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900">Privacy Policy</h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  Entraiot Solution Company's privacy practices for our website and IoT services are described below. This policy explains how we collect, use, and protect your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-10">
          <aside className="hidden lg:block sticky top-28 self-start h-fit">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">On this page</div>
              <div className="space-y-3">{sidebarLinks}</div>
            </div>
          </aside>

          <div className="space-y-10">
            <div className="lg:hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">On this page</div>
              <div className="grid gap-2">{sidebarLinks}</div>
            </div>

            <section id="introduction" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">1. Introduction</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Welcome to Entraiot Solution Company ("Entraiot," "we," "us," or "our"). We are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.entraiot.com and use our IoT solutions, products, and related services (collectively, the "Services").
              </p>
              <p className="mt-4 text-slate-700 leading-8">
                By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree with the practices described herein, please do not use our Services.
              </p>
            </section>

            <section id="company-information" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">2. Company Information</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Entraiot Solution Company is an Internet of Things (IoT) technology company that provides smart connectivity, automation, and data-driven solutions to businesses and individuals. Our registered office and primary data controller contact details are:
              </p>
              <div className="mt-4 space-y-2 rounded-3xl border border-slate-100 bg-slate-50 p-5 text-slate-700">
                <p>Entraiot Solution Company</p>
                <p>Website: www.entraiot.com</p>
                <p>Email: privacy@entraiot.com</p>
              </div>
              <p className="mt-4 text-slate-700 leading-8">
                For privacy-related inquiries, please contact our Data Privacy Officer at: dpo@entraiot.com
              </p>
            </section>

            <section id="information-we-collect" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">3. Information We Collect</h2>
              <p className="mt-4 text-slate-700 leading-8">
                We collect several types of information to provide and improve our Services:
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">3.1 Personal Information You Provide</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Name, email address, phone number, and job title when you register or contact us</li>
                    <li>Billing and payment information when you purchase our products or services</li>
                    <li>Company name, address, and industry details for business accounts</li>
                    <li>Login credentials (username and password) for account access</li>
                    <li>Communications you send us via email, contact forms, or support channels</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">3.2 IoT Device and Usage Data</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Device identifiers, sensor readings, and telemetry data from connected IoT devices</li>
                    <li>Device configuration settings and operational parameters</li>
                    <li>Network information including IP addresses, device MAC addresses, and connectivity logs</li>
                    <li>Real-time and historical performance data from your deployed IoT infrastructure</li>
                    <li>Alerts, events, and notifications generated by IoT devices</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">3.3 Automatically Collected Information</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Browser type, operating system, and device information</li>
                    <li>Pages visited, time spent on pages, and navigation patterns on our website</li>
                    <li>Referring URLs and search terms used to find our website</li>
                    <li>Log data including access times, error reports, and API usage statistics</li>
                    <li>Cookies, web beacons, and similar tracking technologies (see Section 8)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">3.4 Third-Party Information</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Information from business partners, resellers, or system integrators who deploy our solutions</li>
                    <li>Publicly available business information used for lead generation or partnership evaluation</li>
                    <li>Data from third-party platforms integrated with our IoT management dashboard</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="how-we-use-your-information" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">4. How We Use Your Information</h2>
              <p className="mt-4 text-slate-700 leading-8">
                We use the collected information for the following purposes:
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">4.1 Service Delivery and Operations</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Provision, maintenance, and improvement of our IoT platform and related services</li>
                    <li>Managing device connectivity, data streams, and real-time monitoring dashboards</li>
                    <li>Processing transactions, invoices, and subscription billing</li>
                    <li>Authenticating user accounts and maintaining service security</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">4.2 Customer Support and Communication</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Responding to your inquiries, technical support requests, and service issues</li>
                    <li>Sending service-related notifications, including system alerts and maintenance updates</li>
                    <li>Providing product updates, release notes, and technical documentation</li>
                    <li>Communicating about your account status, renewals, or changes to our Services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">4.3 Analytics and Improvement</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Analyzing usage patterns to improve product functionality and user experience</li>
                    <li>Conducting research and development of new IoT features and solutions</li>
                    <li>Generating anonymized and aggregated industry insights and reports</li>
                    <li>Troubleshooting technical issues and optimizing system performance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">4.4 Marketing and Business Development</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Sending promotional materials and newsletters (with your consent where required)</li>
                    <li>Personalizing content and offers based on your preferences and usage history</li>
                    <li>Conducting surveys, webinars, and user feedback programs</li>
                    <li>You may opt out of marketing communications at any time (see Section 10)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">4.5 Legal and Compliance</h3>
                  <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                    <li>Complying with applicable laws, regulations, and legal obligations</li>
                    <li>Enforcing our Terms of Service and other contractual agreements</li>
                    <li>Protecting the rights, property, and safety of Entraiot, our users, and third parties</li>
                    <li>Detecting, preventing, and investigating fraud, security incidents, or misuse</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="legal-basis" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">5. Legal Basis for Processing Personal Data</h2>
              <p className="mt-4 text-slate-700 leading-8">
                For users in jurisdictions with data protection laws (such as GDPR in the European Economic Area), our legal bases for processing your personal data include:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>Contractual Necessity: Processing required to perform our contract with you and deliver the Services you have requested</li>
                <li>Legitimate Interests: Processing in our legitimate business interests, such as improving our services, security monitoring, and fraud prevention, balanced against your rights</li>
                <li>Consent: Processing based on your explicit consent, such as for marketing communications. You may withdraw consent at any time</li>
                <li>Legal Obligation: Processing required to comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section id="data-sharing-disclosure" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">6. Data Sharing and Disclosure</h2>
              <p className="mt-4 text-slate-700 leading-8">
                We do not sell your personal information. We may share your information in the following limited circumstances:
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">6.1 Service Providers and Processors</h3>
                  <p className="mt-4 text-slate-700 leading-8">
                    We engage trusted third-party vendors who assist us in operating our business and delivering Services, including cloud hosting providers, payment processors, analytics platforms, and customer support tools. These vendors are contractually bound to process data only on our instructions and in compliance with applicable data protection laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">6.2 Business Partners and Integrators</h3>
                  <p className="mt-4 text-slate-700 leading-8">
                    With your consent or as necessary to deliver integrated solutions, we may share data with certified Entraiot solution partners, system integrators, or resellers who implement our IoT platform within your organization.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">6.3 Legal Requirements</h3>
                  <p className="mt-4 text-slate-700 leading-8">
                    We may disclose your information when required by law, legal process, or government authority, or when we believe in good faith that disclosure is necessary to protect the rights, safety, or property of Entraiot, our users, or the public.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">6.4 Business Transfers</h3>
                  <p className="mt-4 text-slate-700 leading-8">
                    In the event of a merger, acquisition, corporate restructuring, or sale of all or part of our business, your personal information may be transferred to the acquiring entity. We will provide notice and seek your consent as required by applicable law.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">6.5 Aggregated and Anonymized Data</h3>
                  <p className="mt-4 text-slate-700 leading-8">
                    We may share aggregated, de-identified, or anonymized data that cannot reasonably be used to identify you, for industry analysis, research publications, or business development purposes.
                  </p>
                </div>
              </div>
            </section>

            <section id="data-retention" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">7. Data Retention</h2>
              <p className="mt-4 text-slate-700 leading-8">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Specific retention periods include:
              </p>
              <div className="mt-4 space-y-3 text-slate-700 leading-8 list-disc list-inside">
                <div>• Account and profile data: Retained for the duration of your account and up to 3 years after account closure</div>
                <div>• IoT device telemetry data: Retained according to your selected subscription plan (typically 90 days to 5 years), with options to archive or export</div>
                <div>• Transaction and billing records: Retained for a minimum of 7 years as required by financial regulations</div>
                <div>• Communication and support logs: Retained for 2 years after resolution</div>
                <div>• Website analytics data: Retained in anonymized form for up to 26 months</div>
              </div>
              <p className="mt-4 text-slate-700 leading-8">
                Upon expiry of the applicable retention period, your personal data will be securely deleted or anonymized in accordance with our data disposal procedures.
              </p>
            </section>

            <section id="cookies-and-tracking" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">8. Cookies and Tracking Technologies</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Our website uses cookies and similar tracking technologies to enhance your experience, analyze site traffic, and support our marketing activities. The types of cookies we use include:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>Essential Cookies: Necessary for the website to function properly, including authentication and session management. These cannot be disabled.</li>
                <li>Performance &amp; Analytics Cookies: Help us understand how visitors interact with our website (e.g., Google Analytics). Data collected is aggregated and anonymized.</li>
                <li>Functional Cookies: Enable enhanced features such as remembering your preferences, language settings, and dashboard configurations.</li>
                <li>Marketing &amp; Targeting Cookies: Used to deliver relevant advertisements and track campaign effectiveness across third-party platforms.</li>
              </ul>
              <p className="mt-4 text-slate-700 leading-8">
                You can manage or withdraw your cookie consent at any time through our Cookie Preference Center accessible on our website, or by adjusting your browser settings. Note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section id="your-privacy-rights" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">9. Your Privacy Rights</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Depending on your location and applicable data protection laws, you may have the following rights regarding your personal information:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>Right of Access: Request a copy of the personal data we hold about you</li>
                <li>Right to Rectification: Request correction of inaccurate or incomplete personal data</li>
                <li>Right to Erasure: Request deletion of your personal data under certain circumstances ("right to be forgotten")</li>
                <li>Right to Restrict Processing: Request that we limit how we use your data in specific situations</li>
                <li>Right to Data Portability: Receive your personal data in a structured, machine-readable format</li>
                <li>Right to Object: Object to processing of your data based on legitimate interests or for direct marketing purposes</li>
                <li>Right to Withdraw Consent: Withdraw consent at any time where processing is based on consent, without affecting prior lawful processing</li>
                <li>Right to Lodge a Complaint: File a complaint with your local data protection authority if you are not satisfied with our response</li>
              </ul>
              <p className="mt-4 text-slate-700 leading-8">
                To exercise any of these rights, please contact us at privacy@entraiot.com. We will respond to your request within 30 days. We may need to verify your identity before processing your request.
              </p>
            </section>

            <section id="marketing-opt-out" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">10. Marketing Opt-Out</h2>
              <p className="mt-4 text-slate-700 leading-8">
                If you no longer wish to receive marketing communications from Entraiot, you may opt out by:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>Clicking the "Unsubscribe" link in any marketing email we send</li>
                <li>Logging into your account and updating your communication preferences</li>
                <li>Contacting us at privacy@entraiot.com with your opt-out request</li>
              </ul>
              <p className="mt-4 text-slate-700 leading-8">
                Please note that even after opting out of marketing communications, you may still receive transactional and service-related messages essential to your use of our Services.
              </p>
            </section>

            <section id="data-security" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">11. Data Security</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Entraiot implements industry-standard technical, administrative, and physical security measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction. Our security practices include:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>End-to-end encryption for data transmission using TLS/SSL protocols</li>
                <li>AES-256 encryption for data at rest in our cloud infrastructure</li>
                <li>Multi-factor authentication (MFA) for administrative and user account access</li>
                <li>Role-based access controls (RBAC) limiting data access to authorized personnel</li>
                <li>Regular security audits, vulnerability assessments, and penetration testing</li>
                <li>ISO 27001-aligned information security management practices</li>
                <li>24/7 security monitoring and incident response procedures</li>
              </ul>
              <p className="mt-4 text-slate-700 leading-8">
                While we take all reasonable precautions to protect your data, no security system is impenetrable. In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and relevant authorities as required by applicable law.
              </p>
            </section>

            <section id="international-data-transfers" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">12. International Data Transfers</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Entraiot operates globally, and your personal information may be processed and stored in countries other than your country of residence, including countries that may have different data protection laws. When transferring data internationally, we ensure appropriate safeguards are in place, including:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>Standard Contractual Clauses (SCCs) approved by relevant data protection authorities</li>
                <li>Adequacy decisions recognized by applicable regulatory frameworks</li>
                <li>Binding Corporate Rules (BCR) or other approved transfer mechanisms</li>
              </ul>
              <p className="mt-4 text-slate-700 leading-8">
                By using our Services, you acknowledge and consent to the transfer of your personal information to countries outside your jurisdiction, subject to the safeguards described above.
              </p>
            </section>

            <section id="childrens-privacy" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">13. Children's Privacy</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Our Services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a person under 16, we will take immediate steps to delete such information from our systems. If you believe a child has provided us with personal information, please contact us at privacy@entraiot.com.
              </p>
            </section>

            <section id="third-party-links-services" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">14. Third-Party Links and Services</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Our website and platform may contain links to third-party websites, applications, or services. This Privacy Policy does not apply to those third parties, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services you access through our platform.
              </p>
            </section>

            <section id="iot-specific-privacy-considerations" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">15. IoT-Specific Privacy Considerations</h2>
              <p className="mt-4 text-slate-700 leading-8">
                As an IoT solutions provider, we are particularly mindful of privacy considerations related to connected devices and data-intensive environments:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>Device Data Minimization: We collect only the data necessary for the operation and improvement of your IoT deployments</li>
                <li>Edge Processing: Where technically feasible, we support edge computing capabilities that process sensitive data locally on devices rather than transmitting to the cloud</li>
                <li>Data Segregation: IoT data from enterprise clients is logically segregated to prevent cross-contamination between customers</li>
                <li>Lifecycle Management: We provide tools to manage, export, or delete device data at the end of a device's lifecycle or upon contract termination</li>
                <li>Third-Party Device Integration: When integrating with third-party IoT hardware or platforms, data handling is governed by the respective third party's policies alongside our own</li>
              </ul>
            </section>

            <section id="changes-to-this-privacy-policy" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">16. Changes to This Privacy Policy</h2>
              <p className="mt-4 text-slate-700 leading-8">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:
              </p>
              <ul className="mt-4 space-y-2 text-slate-700 leading-8 list-disc list-inside">
                <li>Update the "Last Updated" date at the top of this Policy</li>
                <li>Notify registered users via email or in-platform notification</li>
                <li>Post a prominent notice on our website for a period following the change</li>
              </ul>
              <p className="mt-4 text-slate-700 leading-8">
                Your continued use of our Services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this Policy periodically.
              </p>
            </section>

            <section id="contact-us" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">17. Contact Us</h2>
              <p className="mt-4 text-slate-700 leading-8">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:
              </p>
              <div className="mt-4 space-y-2 rounded-3xl border border-slate-100 bg-slate-50 p-5 text-slate-700">
                <p>Entraiot Solution Company</p>
                <p>Website: www.entraiot.com</p>
                <p>Privacy Inquiries: privacy@entraiot.com</p>
                <p>Data Protection Officer: dpo@entraiot.com</p>
              </div>
              <p className="mt-4 text-slate-700 leading-8">
                We are committed to addressing your concerns promptly and transparently. You also have the right to lodge a complaint with your local data protection supervisory authority if you are not satisfied with our response.
              </p>
              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-slate-400">© 2026 Entraiot Solution Company. All rights reserved.</p>
            </section>
          </div>
        </div>
      </div>

      {showTopButton && (
        <button
          type="button"
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <ArrowUp className="h-4 w-4" />
          Back to top
        </button>
      )}
    </div>
  );
}
