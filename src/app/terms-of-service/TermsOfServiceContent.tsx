"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUp, ShieldCheck, ChevronRight } from "lucide-react";

const sections = [
  { id: "acceptance-of-terms", label: "1. Acceptance of Terms" },
  { id: "services-description", label: "2. Description of Services" },
  { id: "user-accounts", label: "3. User Accounts and Registration" },
  { id: "acceptable-use", label: "4. Acceptable Use Policy" },
  { id: "intellectual-property", label: "5. Intellectual Property Rights" },
  { id: "payment-terms", label: "6. Payment and Billing Terms" },
  { id: "data-privacy", label: "7. Data Privacy and Security" },
  { id: "iot-specific-terms", label: "8. IoT-Specific Terms and Conditions" },
  { id: "third-party-services", label: "9. Third-Party Services and Integrations" },
  { id: "disclaimers", label: "10. Disclaimers and Warranties" },
  { id: "limitation-of-liability", label: "11. Limitation of Liability" },
  { id: "indemnification", label: "12. Indemnification" },
  { id: "termination", label: "13. Termination of Services" },
  { id: "governing-law", label: "14. Governing Law and Dispute Resolution" },
  { id: "changes-to-terms", label: "15. Changes to Terms of Service" },
  { id: "contact-us", label: "16. Contact Us" },
];

export default function TermsOfServiceContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [showTopButton, setShowTopButton] = useState(false);

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

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/95 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900">Terms of Service</h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  Entraiot Solution Company’s Terms of Service for www.entraiot.com and our IoT solutions, smart connectivity, automation, real-time dashboards, UHF RFID readers, NFC modules, BLE devices, predictive maintenance, and smart automation.
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

            <section id="acceptance-of-terms" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
              <p className="mt-4 text-slate-700 leading-8">
                By accessing or using Entraiot Solution Company’s website and services, you agree to be bound by these Terms of Service. If you do not agree with these terms, do not use our Services or website.
              </p>
              <p className="mt-4 text-slate-700 leading-8">
                These Terms apply to our IoT solutions, smart connectivity, automation, real-time dashboards, UHF RFID readers, NFC modules, BLE devices, predictive maintenance, and smart automation offerings.
              </p>
            </section>

            <section id="services-description" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">2. Description of Services</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Entraiot Solution Company provides IoT solutions and services that enable smart connectivity, automation, real-time dashboards, device management, and analytics. Our Services may include hardware, software, cloud hosting, integration support, and professional services.
              </p>
              <p className="mt-4 text-slate-700 leading-8">
                Services may encompass UHF RFID readers, NFC modules, BLE devices, predictive maintenance systems, smart automation, and all related monitoring, reporting, and support capabilities.
              </p>
            </section>

            <section id="user-accounts" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">3. User Accounts and Registration</h2>
              <p className="mt-4 text-slate-700 leading-8">
                To access certain Services, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.
              </p>
              <p className="mt-4 text-slate-700 leading-8">
                You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately if you suspect unauthorized use of your account.
              </p>
            </section>

            <section id="acceptable-use" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">4. Acceptable Use Policy</h2>
              <p className="mt-4 text-slate-700 leading-8">
                You agree not to use our Services for any unlawful, abusive, or harmful activity. Prohibited conduct includes unauthorized access, disruption of Services, transmitting malicious code, and violating applicable laws or third-party rights.
              </p>
              <p className="mt-4 text-slate-700 leading-8">
                We reserve the right to suspend or terminate access for users who violate these Terms or engage in conduct that harms our platform, other users, or third parties.
              </p>
            </section>

            <section id="intellectual-property" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">5. Intellectual Property Rights</h2>
              <p className="mt-4 text-slate-700 leading-8">
                All intellectual property rights in our website, Services, content, software, and documentation are owned by or licensed to Entraiot Solution Company. You may not copy, modify, or distribute any of our intellectual property without our prior written consent.
              </p>
              <p className="mt-4 text-slate-700 leading-8">
                You retain ownership of the data you provide through our Services, subject to our limited rights to use the data as described in these Terms.
              </p>
            </section>

            <section id="payment-terms" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">6. Payment and Billing Terms</h2>
              <p className="mt-4 text-slate-700 leading-8">
                You agree to pay all fees associated with your use of the Services in accordance with the pricing and billing terms presented at the time of purchase. Fees are non-refundable unless otherwise stated in a written agreement.
              </p>
              <p className="mt-4 text-slate-700 leading-8">
                We may suspend or terminate your access to the Services if payments are late or declined. You are responsible for all taxes, duties, and fees related to your use of the Services.
              </p>
            </section>

            <section id="data-privacy" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">7. Data Privacy and Security</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Entraiot Solution Company is committed to protecting your data. We maintain administrative, technical, and physical safeguards designed to protect data privacy and security.</p>
              <p className="mt-4 text-slate-700 leading-8">
                We do not sell user data. Any processing of personal information is performed in accordance with applicable privacy laws and our privacy practices.</p>
            </section>

            <section id="iot-specific-terms" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">8. IoT-Specific Terms and Conditions</h2>
              <p className="mt-4 text-slate-700 leading-8">
                For IoT devices and deployments, data generated by your devices is owned by the client. Entraiot has the right to anonymize and aggregate data for research, analytics, and product improvement.</p>
              <p className="mt-4 text-slate-700 leading-8">
                Clients are responsible for the physical security of their devices and any network connectivity used to access the Services. Entraiot is not responsible for losses arising from insecure hardware or unauthorized physical access.</p>
            </section>

            <section id="third-party-services" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">9. Third-Party Services and Integrations</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Our Services may integrate with third-party platforms, hardware, or software. Your use of those third-party services is subject to their own terms and privacy policies.</p>
              <p className="mt-4 text-slate-700 leading-8">
                Entraiot is not responsible for the content, security, or availability of third-party services, and third-party integrations may require separate agreements.</p>
            </section>

            <section id="disclaimers" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">10. Disclaimers and Warranties</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Except as expressly stated in these Terms, Entraiot makes no warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p className="mt-4 text-slate-700 leading-8">
                We do not guarantee that the Services will be uninterrupted, error-free, or secure, and use of the Services is at your own risk.</p>
            </section>

            <section id="limitation-of-liability" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">11. Limitation of Liability</h2>
              <p className="mt-4 text-slate-700 leading-8">
                To the maximum extent permitted by law, Entraiot’s liability for any claim arising from these Terms or the Services is limited to the amount you paid for the Services in the 12 months preceding the claim.</p>
              <p className="mt-4 text-slate-700 leading-8">
                Entraiot is not liable for indirect, incidental, special, punitive, or consequential damages, including loss of profits, data, or business opportunities.</p>
            </section>

            <section id="indemnification" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">12. Indemnification</h2>
              <p className="mt-4 text-slate-700 leading-8">
                You agree to indemnify and hold Entraiot Solution Company and its affiliates harmless from any claims, losses, damages, liabilities, costs, and expenses arising from your use of the Services, violation of these Terms, or infringement of third-party rights.</p>
            </section>

            <section id="termination" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">13. Termination of Services</h2>
              <p className="mt-4 text-slate-700 leading-8">
                We may suspend or terminate your access to the Services if you breach these Terms, fail to pay fees, or engage in prohibited conduct. Termination does not relieve you of any payment obligations incurred prior to termination.</p>
              <p className="mt-4 text-slate-700 leading-8">
                Upon termination, you must stop using the Services and return or destroy any confidential information provided by Entraiot.</p>
            </section>

            <section id="governing-law" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">14. Governing Law and Dispute Resolution</h2>
              <p className="mt-4 text-slate-700 leading-8">
                These Terms are governed by applicable laws. Any disputes arising from these Terms or your use of the Services will be resolved through arbitration to the fullest extent permitted by law.</p>
              <p className="mt-4 text-slate-700 leading-8">
                Arbitration provides a faster, more cost-effective way to resolve disputes than litigation, although this may vary depending on your jurisdiction.</p>
            </section>

            <section id="changes-to-terms" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">15. Changes to Terms of Service</h2>
              <p className="mt-4 text-slate-700 leading-8">
                We may update these Terms from time to time. When we make material changes, we will post the updated Terms on our website and update the effective date above.</p>
              <p className="mt-4 text-slate-700 leading-8">
                Continued use of the Services after changes become effective constitutes acceptance of the updated Terms.</p>
            </section>

            <section id="contact-us" className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-semibold text-slate-900">16. Contact Us</h2>
              <p className="mt-4 text-slate-700 leading-8">
                If you have questions about these Terms, please contact us at:</p>
              <div className="mt-4 space-y-2 rounded-3xl border border-slate-100 bg-slate-50 p-5 text-slate-700">
                <p>Entraiot Solution Company</p>
                <p>Website: www.entraiot.com</p>
                <p>Email: <a href="mailto:legal@entraiot.com" className="text-indigo-600 hover:underline">legal@entraiot.com</a></p>
              </div>
              <p className="mt-4 text-sm text-slate-500 border-t border-slate-200 pt-4">These Terms of Service were prepared for Entraiot Solution Company. All rights reserved. © 2026 Entraiot Solution Company.</p>
            </section>
          </div>
        </div>
      </div>

      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
