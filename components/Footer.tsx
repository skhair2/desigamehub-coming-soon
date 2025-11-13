'use client'

import { motion } from 'framer-motion'

const footerLinks = {
  about: [
    { label: 'About DesiGameHub', href: '#solution' },
    { label: 'Our Mission', href: '#solution' },
    { label: 'Press Kit', href: 'mailto:support@desigamehub.com' },
  ],
  games: [
    { label: 'Tambola', href: '#games' },
    { label: 'Charades', href: '#games' },
    { label: 'Codenames', href: '#games' },
    { label: 'Coming Soon', href: '#games' },
  ],
  community: [
    { label: 'Contact', href: 'mailto:support@desigamehub.com' },
    { label: 'Support', href: 'mailto:support@desigamehub.com' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: '📷', href: 'https://instagram.com/desigamehub' },
  { name: 'Facebook', icon: '👥', href: 'https://facebook.com/desigamehub' },
  { name: 'TikTok', icon: '🎵', href: 'https://tiktok.com/@desigamehub' },
  { name: 'YouTube', icon: '▶️', href: 'https://youtube.com/@desigamehub' },
  { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/desigamehub' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-cream py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Games</h3>
            <ul className="space-y-2">
              {footerLinks.games.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-cream/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="font-heading font-semibold text-xl mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="text-2xl hover:scale-110 transition-transform"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <motion.a
              href="#waitlist"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist Now
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cream/20 pt-8 text-center">
          <p className="font-body text-cream/60">
            © {new Date().getFullYear()} DesiGameHub. All rights reserved.
          </p>
          <p className="font-body text-cream/60 mt-2">
            Made with ❤️ for families everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}

