import { Globe, Heart, MessageCircle, Share2, Video } from 'lucide-react';
import Link from 'next/link';

const exploreLinks = [
  { label: 'Books', href: '/books' },
  { label: 'Reading Paths', href: '/reading-paths' },
  { label: 'For Kids', href: '/for-kids' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Support', href: '/support' },
];

const supportLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Community', href: '/community' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BluishBoy
            </h3>
            <p className="text-white/60 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Your sacred digital library for Bhakti, Vedic wisdom, and spiritual growth. Ancient wisdom for the modern minds.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, Globe, MessageCircle, Video].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#3AA7FF]/50 transition-all group">
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-[#3AA7FF] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white mb-4" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-[#3AA7FF] transition-colors text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white mb-4" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-[#3AA7FF] transition-colors text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Legal</h4>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-[#3AA7FF] transition-colors text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-white/60 text-xs mb-3" style={{ fontFamily: 'var(--font-body)' }}>Secure Payments</p>
              <div className="flex items-center gap-2 flex-wrap">
                {['VISA', 'MC', 'AMEX', 'PayPal'].map((p) => (
                  <div key={p} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/40 text-xs" style={{ fontFamily: 'var(--font-nav)' }}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            © 2026 BluishBoy. All rights reserved. Spreading wisdom with devotion.
          </p>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <span style={{ fontFamily: 'var(--font-body)' }}>Crafted with</span>
            <Heart className="w-4 h-4 text-[#F28C28] fill-current" />
            <span style={{ fontFamily: 'var(--font-body)' }}>for seekers worldwide</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3AA7FF]/30 to-transparent" />
    </footer>
  );
}
