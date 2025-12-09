import type { Metadata } from 'next'
import TermsOfServiceContent from './content'

// Metadata for Terms of Service page
export const metadata: Metadata = {
  title: 'Terms of Service | DesiPlayground - Legal Terms & Conditions',
  description: 'Read DesiPlayground\'s Terms of Service. Understand the rules, agreements, and conditions for using our gaming platform. Updated regularly to protect users.',
  keywords: [
    'terms of service',
    'terms of use',
    'user agreement',
    'legal terms',
    'conditions of use',
    'user rights',
    'service agreement',
    'acceptable use policy',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | DesiPlayground',
    description: 'Review DesiPlayground\'s Terms of Service and user agreement.',
    url: 'https://desiplayground.com/terms',
    siteName: 'DesiPlayground',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DesiPlayground Terms of Service',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@desiplayground',
    title: 'Terms of Service | DesiPlayground',
    description: 'Review our Terms of Service and user agreement for DesiPlayground.',
  },
  alternates: {
    canonical: 'https://desiplayground.com/terms',
  },
}

export default function TermsOfService() {
  return <TermsOfServiceContent />
}
