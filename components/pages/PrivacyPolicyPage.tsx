"use client";

import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    content: `When you place an order, create an account, or contact us, we collect information you provide directly — including your name, email address, shipping address, phone number, and payment details.

We also collect information automatically when you use our website: your IP address, browser type, pages visited, and the time and date of your visit. This information is collected through cookies and similar technologies (see our Cookie Policy for details).`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Process and fulfil your orders, and communicate with you about them
• Provide customer support and respond to your enquiries
• Send you updates about your orders and, if you have opted in, marketing communications
• Personalise your experience and recommend books relevant to your interests
• Improve our website, products, and services
• Comply with legal obligations

We do not sell, rent, or trade your personal information to third parties for their marketing purposes.`,
  },
  {
    title: '3. How We Share Your Information',
    content: `We share your information only with third parties who help us operate our business and provide services to you:

• Shipping partners (to deliver your orders)
• Payment processors (to handle transactions securely)
• Email service providers (to send order confirmations and communications)
• Analytics providers (to understand how our website is used)

All third parties we work with are required to handle your data in accordance with applicable privacy laws and our data processing agreements.`,
  },
  {
    title: '4. Data Security',
    content: `We take the security of your personal information seriously. We use SSL encryption for all data transmitted through our website, and our payment processing is handled by PCI-DSS compliant providers who never store your full card details on our servers.

Despite our best efforts, no transmission over the internet or electronic storage is 100% secure. If you have reason to believe your interaction with us is no longer secure, please contact us immediately.`,
  },
  {
    title: '5. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• The right to access the personal information we hold about you
• The right to correct inaccurate or incomplete information
• The right to request deletion of your personal data
• The right to object to or restrict certain processing
• The right to data portability
• The right to withdraw consent at any time

To exercise any of these rights, please contact us at privacy@bluishboy.com. We will respond within 30 days.`,
  },
  {
    title: '6. Cookies',
    content: 'We use cookies to improve your browsing experience, remember your preferences, and understand how our website is used. Please see our Cookie Policy for full details on the cookies we use and how to control them.',
  },
  {
    title: '7. Data Retention',
    content: 'We retain your personal information for as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order data is typically retained for 7 years for tax and accounting purposes.',
  },
  {
    title: '8. Children\'s Privacy',
    content: 'Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us and we will delete it promptly.',
  },
  {
    title: '9. Changes to This Policy',
    content: "We may update this Privacy Policy from time to time. When we do, we will update the date at the top of this page and, where appropriate, notify you by email. We encourage you to review this policy periodically.",
  },
  {
    title: '10. Contact Us',
    content: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us:\n\nBluishBoy\nEmail: privacy@bluishboy.com\nAddress: 42 Vrindavan Lane, Mumbai 400001, India',
  },
];

export function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#3AA7FF]" />
            <span className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>Last updated: 1 June 2026</span>
          </div>
          <h1 className="text-5xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Privacy Policy</h1>
          <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            BluishBoy ("we", "us", "our") is committed to protecting your personal information. This policy explains what data we collect, how we use it, and the choices you have. Please read it carefully.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{section.title}</h2>
              <div className="text-white/60 leading-relaxed whitespace-pre-line" style={{ fontFamily: 'var(--font-body)' }}>
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
