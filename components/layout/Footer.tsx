'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Instagram, Facebook, Twitter, ChevronDown } from 'lucide-react';

const footerLinks = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop?category=traditional', label: 'Traditional' },
    { href: '/shop?category=modern', label: 'Modern' },
    { href: '/shop?category=bridal', label: 'Bridal Collection' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/shipping', label: 'Shipping & Returns' },
    { href: '/size-guide', label: 'Size Guide' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
};

const socialLinks = [
  { href: 'https://instagram.com/gelebylolarose', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/gelebylolarose', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com/gelebylolarose', icon: Twitter, label: 'Twitter' },
];

function FooterSection({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral/30 md:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 md:cursor-default"
      >
        <h4 className="text-xs font-semibold text-primary tracking-wider">{title}</h4>
        <ChevronDown className={`w-4 h-4 text-primary transition-transform md:hidden ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <ul className={`space-y-2 pb-3 md:pb-0 ${isOpen ? 'block' : 'hidden'} md:block`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-text-secondary hover:text-primary text-xs transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div>
            <h3 className="text-base font-bold text-primary mb-3">Gele By Lola Rose</h3>
            <p className="text-text-secondary text-xs leading-relaxed mb-4">
              Luxury African headwraps crafted in London.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-text-secondary hover:text-accent transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <FooterSection title="SHOP" links={footerLinks.shop} />

          {/* Company Links */}
          <FooterSection title="COMPANY" links={footerLinks.company} />

          {/* Legal Links */}
          <FooterSection title="LEGAL" links={footerLinks.legal} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-neutral/30">
          <p className="text-text-secondary text-xs text-center">
            © {new Date().getFullYear()} Gele By Lola Rose. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}