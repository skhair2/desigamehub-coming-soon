import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DesiPlayground - Play Best Desi Games Online | Tambola, Carrom, Ludo & Indian Party Games',
  description: 'Play the best desi games online at DesiPlayground. Multiplayer Tambola, Carrom, Ludo, Charades & Indian party games. Free online games for friends & family. Real-time lobbies, tournaments, rewards. Mobile-optimized, secure gaming platform for NRIs & Indian families.',
  keywords: [
    'desi games online',
    'play desi games',
    'Indian online games',
    'tambola online',
    'carrom online game',
    'online ludo game',
    'dumb charades online',
    'multiplayer desi games',
    'party games online',
    'Indian family games',
    'NRI games',
    'desi game night',
    'online housie',
    'free Indian games',
    'Bollywood games',
    'real-time multiplayer games',
    'Hindi games online',
    'friends lobby games',
    'gaming platform India',
    'online gaming community',
    'South Asian games',
    'diwali party games',
    'family game night',
    'group games online',
    'traditional Indian games digital',
  ],
  authors: [{ name: 'DesiPlayground Team', url: 'https://desiplayground.com' }],
  creator: 'DesiPlayground',
  publisher: 'DesiPlayground',
  category: 'Entertainment',
  classification: 'Games',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://desiplayground.com'),
  alternates: {
    canonical: 'https://desiplayground.com',
    languages: {
      'en-US': 'https://desiplayground.com/en-US',
      'en-GB': 'https://desiplayground.com/en-GB',
      'hi': 'https://desiplayground.com/hi',
      'en': 'https://desiplayground.com',
      'x-default': 'https://desiplayground.com',
    },
  },
  openGraph: {
    title: 'DesiPlayground - Play Tambola, Carrom & Indian Games Online',
    description: 'Join DesiPlayground to play multiplayer desi games. Tambola lobbies, online carrom, ludo tournaments & more. Real-time gaming for friends & family.',
    url: 'https://desiplayground.com',
    siteName: 'DesiPlayground',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DesiPlayground - Online Desi Games Platform',
        type: 'image/jpeg',
        secureUrl: 'https://desiplayground.com/og-image.jpg',
      },
      {
        url: '/og-image-square.jpg',
        width: 800,
        height: 800,
        alt: 'DesiPlayground - Play Indian Games Online',
        type: 'image/jpeg',
        secureUrl: 'https://desiplayground.com/og-image-square.jpg',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['hi_IN', 'en_GB', 'en_AU'],
    type: 'website',
    determiner: 'auto',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@desiplayground',
    creator: '@desiplayground',
    title: 'DesiPlayground - Play Desi Games & Indian Party Games Online',
    description: 'Play tambola, carrom, ludo & more traditional desi games online with friends. Real-time multiplayer Indian gaming platform.',
    images: {
      url: '/og-image.jpg',
      alt: 'DesiPlayground Gaming Platform',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'noimageindex': false,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#FF6B35',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DesiPlayground',
    startupImage: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  referrer: 'strict-origin-when-cross-origin',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#FF6B35',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        {children}
        <Analytics />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1C2833',
              color: '#FFFAF0',
              borderRadius: '12px',
              padding: '16px',
              fontFamily: 'var(--font-inter)',
            },
            success: {
              iconTheme: {
                primary: '#20B2AA',
                secondary: '#FFFAF0',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF6B35',
                secondary: '#FFFAF0',
              },
            },
          }}
        />
      </body>
    </html>
  )
}


