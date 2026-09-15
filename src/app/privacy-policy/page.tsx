"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "company-information", title: "2. Company Information" },
  { id: "information-we-collect", title: "3. Information We Collect" },
  { id: "how-we-use", title: "4. How We Use Your Information" },
  { id: "legal-basis", title: "5. Legal Basis for Processing" },
  { id: "data-sharing", title: "6. Data Sharing and Disclosure" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "cookies", title: "8. Cookies and Tracking" },
  { id: "privacy-rights", title: "9. Your Privacy Rights" },
  { id: "marketing-opt-out", title: "10. Marketing Opt-Out" },
  { id: "data-security", title: "11. Data Security" },
  { id: "international-transfers", title: "12. International Data Transfers" },
  { id: "childrens-privacy", title: "13. Children's Privacy" },
  { id: "third-party-links", title: "14. Third-Party Links" },
  { id: "iot-privacy", title: "15. IoT-Specific Privacy" },
  { id: "changes", title: "16. Changes to This Policy" },
  { id: "contact-us", title: "17. Contact Us" },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState("introduction");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-indigo-50 border-b border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Privacy Policy</span>
          </div>
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Legal Document
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Contents</p>
              <nav className="space-y-1">
                {sections.map(({ id, title }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                      activeId === id
                        ? "bg-indigo-50 text-indigo-700 font-semibold border-l-2 border-indigo-600"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 prose prose-slate max-w-none">

            <Section id="introduction" title="1. Introduction">
              <p>Welcome to Entraiot Solution Company ("Entraiot," "we," "us," or "our"). We are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.entraiot.com" className="text-indigo-600 hover:underline">www.entraiot.com</a> and use our IoT solutions, products, and related services (collectively, the "Services").</p>
              <p>By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree with the practices described herein, please do not use our Services.</p>
            </Section>

            <Section id="company-information" title="2. Company Information">
              <p>Entraiot Solution Company is an Internet of Things (IoT) technology company that provides smart connectivity, automation, and data-driven solutions to businesses and individuals. Our registered office and primary data controller contact details are:</p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 not-prose text-sm space-y-1">
                <p className="font-semibold text-slate-800">Entraiot Solution Company</p>
                <p className="text-slate-600">Website: <a href="https://www.entraiot.com" className="text-indigo-600 hover:underline">www.entraiot.com</a></p>
                <p className="text-slate-600">Email: <a href="mailto:privacy@entraiot.com" className="text-indigo-600 hover:underline">privacy@entraiot.com</a></p>
                <p className="text-slate-600">Data Protection Officer: <a href="mailto:dpo@entraiot.com" className="text-indigo-600 hover:underline">dpo@entraiot.com</a></p>
              </div>
            </Section>

            <Section id="information-we-collect" title="3. Information We Collect">
              <p>We collect several types of information to provide and improve our Services:</p>
              <SubSection title="3.1 Personal Information You Provide">
                <ul>
                  <li>Name, email address, phone number, and job title when you register or contact us</li>
                  <li>Billing and payment information when you purchase our products or services</li>
                  <li>Company name, address, and industry details for business accounts</li>
                  <li>Login credentials (username and password) for account access</li>
                  <li>Communications you send us via email, contact forms, or support channels</li>
                </ul>
              </SubSection>
              <SubSection title="3.2 IoT Device and Usage Data">
                <ul>
                  <li>Device identifiers, sensor readings, and telemetry data from connected IoT devices</li>
                  <li>Device configuration settings and operational parameters</li>
                  <li>Network information including IP addresses, device MAC addresses, and connectivity logs</li>
                  <li>Real-time and historical performance data from your deployed IoT infrastructure</li>
                  <li>Alerts, events, and notifications generated by IoT devices</li>
                </ul>
              </SubSection>
              <SubSection title="3.3 Automatically Collected Information">
                <ul>
                  <li>Browser type, operating system, and device information</li>
                  <li>Pages visited, time spent on pages, and navigation patterns on our website</li>
                  <li>Referring URLs and search terms used to find our website</li>
                  <li>Log data including access times, error reports, and API usage statistics</li>
                  <li>Cookies, web beacons, and similar tracking technologies (see Section 8)</li>
                </ul>
              </SubSection>
              <SubSection title="3.4 Third-Party Information">
                <ul>
                  <li>Information from business partners, resellers, or system integrators who deploy our solutions</li>
                  <li>Publicly available business information used for lead generation or partnership evaluation</li>
                  <li>Data from third-party platforms integrated with our IoT management dashboard</li>
                </ul>
              </SubSection>
            </Section>

            <Section id="how-we-use" title="4. How We Use Your Information">
              <p>We use the collected information for the following purposes:</p>
              <SubSection title="4.1 Service Delivery and Operations">
                <ul>
                  <li>Provision, maintenance, and improvement of our IoT platform and related services</li>
                  <li>Managing device connectivity, data streams, and real-time monitoring dashboards</li>
                  <li>Processing transactions, invoices, and subscription billing</li>
                  <li>Authenticating user accounts and maintaining service security</li>
                </ul>
              </SubSection>
              <SubSection title="4.2 Customer Support and Communication">
                <ul>
                  <li>Responding to your inquiries, technical support requests, and service issues</li>
                  <li>Sending service-related notifications, including system alerts and maintenance updates</li>
                  <li>Providing product updates, release notes, and technical documentation</li>
                  <li>Communicating about your account status, renewals, or changes to our Services</li>
                </ul>
              </SubSection>
              <SubSection title="4.3 Analytics and Improvement">
                <ul>
                  <li>Analyzing usage patterns to improve product functionality and user experience</li>
                  <li>Conducting research and development of new IoT features and solutions</li>
                  <li>Generating anonymized and aggregated industry insights and reports</li>
                  <li>Troubleshooting technical issues and optimizing system performance</li>
                </ul>
              </SubSection>
              <SubSection title="4.4 Marketing and Business Development">
                <ul>
                  <li>Sending promotional materials and newsletters (with your consent where required)</li>
                  <li>Personalizing content and offers based on your preferences and usage history</li>
                  <li>Conducting surveys, webinars, and user feedback programs</li>
                  <li>You may opt out of marketing communications at any time (see Section 10)</li>
                </ul>
              </SubSection>
              <SubSection title="4.5 Legal and Compliance">
                <ul>
                  <li>Complying with applicable laws, regulations, and legal obligations</li>
                  <li>Enforcing our Terms of Service and other contractual agreements</li>
                  <li>Protecting the rights, property, and safety of Entraiot, our users, and third parties</li>
                  <li>Detecting, preventing, and investigating fraud, security incidents, or misuse</li>
                </ul>
              </SubSection>
            </Section>

            <Section id="legal-basis" title="5. Legal Basis for Processing Personal Data">
              <p>For users in jurisdictions with data protection laws (such as GDPR in the European Economic Area), our legal bases for processing your personal data include:</p>
              <ul>
                <li><strong>Contractual Necessity:</strong> Processing required to perform our contract with you and deliver the Services you have requested</li>
                <li><strong>Legitimate Interests:</strong> Processing in our legitimate business interests, such as improving our services, security monitoring, and fraud prevention, balanced against your rights</li>
                <li><strong>Consent:</strong> Processing based on your explicit consent, such as for marketing communications. You may withdraw consent at any time</li>
                <li><strong>Legal Obligation:</strong> Processing required to comply with applicable laws and regulations</li>
              </ul>
            </Section>

            <Section id="data-sharing" title="6. Data Sharing and Disclosure">
              <p>We do not sell your personal information. We may share your information in the following limited circumstances:</p>
              <SubSection title="6.1 Service Providers and Processors">
                <p>We engage trusted third-party vendors who assist us in operating our business and delivering Services, including cloud hosting providers, payment processors, analytics platforms, and customer support tools. These vendors are contractually bound to process data only on our instructions and in compliance with applicable data protection laws.</p>
              </SubSection>
              <SubSection title="6.2 Business Partners and Integrators">
                <p>With your consent or as necessary to deliver integrated solutions, we may share data with certified Entraiot solution partners, system integrators, or resellers who implement our IoT platform within your organization.</p>
              </SubSection>
              <SubSection title="6.3 Legal Requirements">
                <p>We may disclose your information when required by law, legal process, or government authority, or when we believe in good faith that disclosure is necessary to protect the rights, safety, or property of Entraiot, our users, or the public.</p>
              </SubSection>
              <SubSection title="6.4 Business Transfers">
                <p>In the event of a merger, acquisition, corporate restructuring, or sale of all or part of our business, your personal information may be transferred to the acquiring entity. We will provide notice and seek your consent as required by applicable law.</p>
              </SubSection>
              <SubSection title="6.5 Aggregated and Anonymized Data">
                <p>We may share aggregated, de-identified, or anonymized data that cannot reasonably be used to identify you, for industry analysis, research publications, or business development purposes.</p>
              </SubSection>
            </Section>

            <Section id="data-retention" title="7. Data Retention">
              <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Specific retention periods include:</p>
              <ul>
                <li><strong>Account and profile data:</strong> Retained for the duration of your account and up to 3 years after account closure</li>
                <li><strong>IoT device telemetry data:</strong> Retained according to your selected subscription plan (typically 90 days to 5 years), with options to archive or export</li>
                <li><strong>Transaction and billing records:</strong> Retained for a minimum of 7 years as required by financial regulations</li>
                <li><strong>Communication and support logs:</strong> Retained for 2 years after resolution</li>
                <li><strong>Website analytics data:</strong> Retained in anonymized form for up to 26 months</li>
              </ul>
              <p>Upon expiry of the applicable retention period, your personal data will be securely deleted or anonymized in accordance with our data disposal procedures.</p>
            </Section>

            <Section id="cookies" title="8. Cookies and Tracking Technologies">
              <p>Our website uses cookies and similar tracking technologies to enhance your experience, analyze site traffic, and support our marketing activities. The types of cookies we use include:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly, including authentication and session management. These cannot be disabled.</li>
                <li><strong>Performance & Analytics Cookies:</strong> Help us understand how visitors interact with our website (e.g., Google Analytics). Data collected is aggregated and anonymized.</li>
                <li><strong>Functional Cookies:</strong> Enable enhanced features such as remembering your preferences, language settings, and dashboard configurations.</li>
                <li><strong>Marketing & Targeting Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness across third-party platforms.</li>
              </ul>
              <p>You can manage or withdraw your cookie consent at any time through our Cookie Preference Center accessible on our website, or by adjusting your browser settings. Note that disabling certain cookies may affect the functionality of our website.</p>
            </Section>

            <Section id="privacy-rights" title="9. Your Privacy Rights">
              <p>Depending on your location and applicable data protection laws, you may have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain circumstances ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data in specific situations</li>
                <li><strong>Right to Data Portability:</strong> Receive your personal data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing of your data based on legitimate interests or for direct marketing purposes</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent, without affecting prior lawful processing</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
              </ul>
              <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@entraiot.com" className="text-indigo-600 hover:underline">privacy@entraiot.com</a>. We will respond to your request within 30 days. We may need to verify your identity before processing your request.</p>
            </Section>

            <Section id="marketing-opt-out" title="10. Marketing Opt-Out">
              <p>If you no longer wish to receive marketing communications from Entraiot, you may opt out by:</p>
              <ul>
                <li>Clicking the "Unsubscribe" link in any marketing email we send</li>
                <li>Logging into your account and updating your communication preferences</li>
                <li>Contacting us at <a href="mailto:privacy@entraiot.com" className="text-indigo-600 hover:underline">privacy@entraiot.com</a> with your opt-out request</li>
              </ul>
              <p>Please note that even after opting out of marketing communications, you may still receive transactional and service-related messages essential to your use of our Services.</p>
            </Section>

            <Section id="data-security" title="11. Data Security">
              <p>Entraiot implements industry-standard technical, administrative, and physical security measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction. Our security practices include:</p>
              <ul>
                <li>End-to-end encryption for data transmission using TLS/SSL protocols</li>
                <li>AES-256 encryption for data at rest in our cloud infrastructure</li>
                <li>Multi-factor authentication (MFA) for administrative and user account access</li>
                <li>Role-based access controls (RBAC) limiting data access to authorized personnel</li>
                <li>Regular security audits, vulnerability assessments, and penetration testing</li>
                <li>ISO 27001-aligned information security management practices</li>
                <li>24/7 security monitoring and incident response procedures</li>
              </ul>
              <p>While we take all reasonable precautions to protect your data, no security system is impenetrable. In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and relevant authorities as required by applicable law.</p>
            </Section>

            <Section id="international-transfers" title="12. International Data Transfers">
              <p>Entraiot operates globally, and your personal information may be processed and stored in countries other than your country of residence, including countries that may have different data protection laws. When transferring data internationally, we ensure appropriate safeguards are in place, including:</p>
              <ul>
                <li>Standard Contractual Clauses (SCCs) approved by relevant data protection authorities</li>
                <li>Adequacy decisions recognized by applicable regulatory frameworks</li>
                <li>Binding Corporate Rules (BCR) or other approved transfer mechanisms</li>
              </ul>
              <p>By using our Services, you acknowledge and consent to the transfer of your personal information to countries outside your jurisdiction, subject to the safeguards described above.</p>
            </Section>

            <Section id="childrens-privacy" title="13. Children's Privacy">
              <p>Our Services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a person under 16, we will take immediate steps to delete such information from our systems. If you believe a child has provided us with personal information, please contact us at <a href="mailto:privacy@entraiot.com" className="text-indigo-600 hover:underline">privacy@entraiot.com</a>.</p>
            </Section>

            <Section id="third-party-links" title="14. Third-Party Links and Services">
              <p>Our website and platform may contain links to third-party websites, applications, or services. This Privacy Policy does not apply to those third parties, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services you access through our platform.</p>
            </Section>

            <Section id="iot-privacy" title="15. IoT-Specific Privacy Considerations">
              <p>As an IoT solutions provider, we are particularly mindful of privacy considerations related to connected devices and data-intensive environments:</p>
              <ul>
                <li><strong>Device Data Minimization:</strong> We collect only the data necessary for the operation and improvement of your IoT deployments</li>
                <li><strong>Edge Processing:</strong> Where technically feasible, we support edge computing capabilities that process sensitive data locally on devices rather than transmitting to the cloud</li>
                <li><strong>Data Segregation:</strong> IoT data from enterprise clients is logically segregated to prevent cross-contamination between customers</li>
                <li><strong>Lifecycle Management:</strong> We provide tools to manage, export, or delete device data at the end of a device's lifecycle or upon contract termination</li>
                <li><strong>Third-Party Device Integration:</strong> When integrating with third-party IoT hardware or platforms, data handling is governed by the respective third party's policies alongside our own</li>
              </ul>
            </Section>

            <Section id="changes" title="16. Changes to This Privacy Policy">
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:</p>
              <ul>
                <li>Update the "Last Updated" date at the top of this Policy</li>
                <li>Notify registered users via email or in-platform notification</li>
                <li>Post a prominent notice on our website for a period following the change</li>
              </ul>
              <p>Your continued use of our Services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this Policy periodically.</p>
            </Section>

            <Section id="contact-us" title="17. Contact Us">
              <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:</p>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 not-prose text-sm space-y-2">
                <p className="font-semibold text-slate-800">Entraiot Solution Company</p>
                <p className="text-slate-600">Website: <a href="https://www.entraiot.com" className="text-indigo-600 hover:underline">www.entraiot.com</a></p>
                <p className="text-slate-600">Privacy Inquiries: <a href="mailto:privacy@entraiot.com" className="text-indigo-600 hover:underline">privacy@entraiot.com</a></p>
                <p className="text-slate-600">Data Protection Officer: <a href="mailto:dpo@entraiot.com" className="text-indigo-600 hover:underline">dpo@entraiot.com</a></p>
              </div>
              <p>We are committed to addressing your concerns promptly and transparently. You also have the right to lodge a complaint with your local data protection supervisory authority if you are not satisfied with our response.</p>
              <p className="text-sm text-slate-500 border-t border-slate-200 pt-4 mt-4">This Privacy Policy was prepared for Entraiot Solution Company. All rights reserved. © 2026 Entraiot Solution Company.</p>
            </Section>

          </main>
        </div>
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">{title}</h2>
      <div className="space-y-3 text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="text-base font-semibold text-slate-700 mb-2">{title}</h3>
      <div className="text-slate-600">{children}</div>
    </div>
  );
}