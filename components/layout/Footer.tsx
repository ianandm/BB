import Link from "next/link";
import { Globe, MessageCircle, Share2, Video } from "lucide-react";

const exploreLinks = [
  { label: "Books", href: "/books" },
  { label: "Reading Paths", href: "/#reading-paths" },
  { label: "For Kids", href: "/books?category=children" },
  { label: "Blogs", href: "/#wisdom-blogs" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

const supportLinks = ["Contact", "Shipping", "Returns", "FAQ", "Community"];
const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

const socialLinks = [
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Video, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading mb-4 bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] bg-clip-text text-2xl text-transparent">
              BluishBoy
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              Your sacred digital library for Bhakti, Vedic wisdom, and spiritual
              growth. Ancient wisdom for the modern minds.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#3AA7FF]/50 hover:bg-white/10"
                >
                  <social.icon className="h-5 w-5 text-white/60 transition-colors group-hover:text-[#3AA7FF]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading-secondary mb-4 text-white">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-[#3AA7FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading-secondary mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-[#3AA7FF]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading-secondary mb-4 text-white">Legal</h4>
            <ul className="mb-6 space-y-3">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-[#3AA7FF]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} BluishBoy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
