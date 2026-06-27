"use client";

import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

const sections = [
  { title: '1. Acceptance of Terms', content: "By accessing or using the BluishBoy website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
  { title: '2. Products and Pricing', content: "We reserve the right to modify prices, descriptions, and availability at any time without prior notice. All prices are listed in Indian Rupees (₹) unless otherwise stated. We make every effort to ensure product descriptions are accurate, but we do not warrant that descriptions are error-free. In the event of a pricing error, we reserve the right to cancel orders placed at the incorrect price." },
  { title: '3. Orders and Payment', content: "By placing an order, you represent that you are of legal age to form a binding contract. Payment must be received in full before orders are processed. We accept major credit/debit cards, UPI, net banking, and digital wallets. We reserve the right to refuse or cancel any order at our discretion, including for suspicion of fraud or if items are out of stock." },
  { title: '4. Shipping and Delivery', content: "Delivery timelines are estimates and not guarantees. BluishBoy is not responsible for delays caused by third-party carriers, customs clearance, or circumstances beyond our control. Risk of loss and title for items pass to you upon delivery to the carrier. For international shipments, customs duties and import taxes are the sole responsibility of the recipient." },
  { title: '5. Returns and Refunds', content: "Please see our Returns & Refunds page for the full policy. In summary: eligible items may be returned within 30 days of delivery in original condition. Refunds are processed to the original payment method within 5–7 business days of receiving the returned item." },
  { title: '6. Intellectual Property', content: "All content on this website — including text, images, logos, and design — is the property of BluishBoy or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission." },
  { title: '7. User Accounts', content: "If you create an account, you are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use. We reserve the right to terminate accounts at our discretion." },
  { title: '8. Limitation of Liability', content: "To the fullest extent permitted by law, BluishBoy shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability for any claim arising from or relating to these terms shall not exceed the amount you paid us in the 30 days preceding the claim." },
  { title: '9. Governing Law', content: "These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra." },
  { title: '10. Changes to Terms', content: "We may modify these Terms at any time. Changes take effect when posted on this page. Continued use of our services after changes are posted constitutes acceptance of the revised Terms." },
  { title: '11. Contact', content: "For questions about these Terms, contact us at legal@bluishboy.com or write to us at: BluishBoy, 42 Vrindavan Lane, Mumbai 400001, India." },
];

export function TermsOfServicePage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[#F5B84B]" />
            <span className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>Last updated: 1 June 2026</span>
          </div>
          <h1 className="text-5xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Terms of Service</h1>
          <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Please read these terms carefully before using BluishBoy. They govern your use of our website and services.
          </p>
        </motion.div>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }}
              className="p-7 rounded-3xl bg-white/5 border border-white/10">
              <h2 className="text-lg text-white mb-3" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{s.title}</h2>
              <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{s.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
