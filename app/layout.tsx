import type { Metadata } from 'next'
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
  title: 'DesiPlayground - Play Best Desi Games Online | Tambola, Carrom & Indian Party Games',
  description: 'Discover the best desi games online at DesiPlayground. Play multiplayer Ludo, Carrom, Tambola, Charades & more. Free Indian online games for friends & family. Join tournaments, earn rewards. Mobile-friendly & secure.',
  keywords: [
    'desi games online',
    'play desi games online',
    'best desi games',
    'DesiPlayground',
    'tambola online lobby',
    'online dumb charades',
    'desi codenames game',
    'host tambola game',
    'join tambola lobby',
    'multiplayer desi games',
    'indian family party games online',
    'bollywood game night app',
    'real-time desi games',
    'friends lobby games',
    'online housie tambola',
    'desi games for NRIs',
    'free indian games',
    'online ludo game',
    'carrom online',
    'hindi party games app',
    'game night',
    'desi game night',
    'diwali game night',
  ],
  authors: [{ name: 'Desiplayground' }],
  creator: 'Desiplayground',
  publisher: 'Desiplayground',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://Desiplayground.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Desiplayground - Play Tambola Online with Friends | Indian Family Party Games',
    description: 'Play desi games online with friends and family. Join tambola online lobby, host tambola game, or play online dumb charades. Real-time multiplayer desi games for NRIs and families worldwide.',
    url: 'https://Desiplayground.com',
    siteName: 'Desiplayground',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Desiplayground - Play Desi Games Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desiplayground - Play Tambola Online with Friends',
    description: 'Play desi games online with friends and family. Real-time multiplayer desi games for NRIs and families worldwide.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
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

