import type { Metadata } from 'next'
import PrivacyPolicyContent from './content'

// Metadata for Privacy Policy page
export const metadata: Metadata = {
  title: 'Privacy Policy | DesiPlayground - Your Data Protection',
  description: 'Read DesiPlayground\'s comprehensive privacy policy. Learn how we collect, use, and protect your personal data. We prioritize your privacy and security.',
  keywords: [
    'privacy policy',
    'data protection',
    'GDPR',
    'user privacy',
    'data security',
    'personal information',
    'privacy terms',
    'data collection',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | DesiPlayground',
    description: 'Understand how DesiPlayground protects your personal data and privacy.',
    url: 'https://desiplayground.com/privacy',
    siteName: 'DesiPlayground',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DesiPlayground Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@desiplayground',
    title: 'Privacy Policy | DesiPlayground',
    description: 'Learn about DesiPlayground\'s privacy practices and data protection.',
  },
  alternates: {
    canonical: 'https://desiplayground.com/privacy',
  },
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyContent />
}
