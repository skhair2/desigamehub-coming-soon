export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://desigamehub.com'

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DesiGameHub',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'The ultimate platform for playing Desi games online with friends and family',
    sameAs: [
      'https://facebook.com/desigamehub',
      'https://instagram.com/desigamehub',
      'https://twitter.com/desigamehub',
      'https://discord.com/invite/desigamehub',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'Customer Support',
      email: 'support@desigamehub.com',
    },
  }

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DesiGameHub',
    url: baseUrl,
    description: 'Play the best desi games online - Tambola, Carrom, Charades, Codenames & more',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
    },
  }

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is DesiGameHub completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All games on DesiGameHub are 100% free to play. We offer optional cosmetic purchases, but all gameplay is accessible without spending money.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I play on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! DesiGameHub is fully responsive and optimized for all devices – smartphones, tablets, and desktop computers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I play against my friends?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Invite friends via a unique code, or join multiplayer lobbies to find opponents in real-time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data secure on DesiGameHub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We use HTTPS encryption, industry-standard security protocols, and never share your personal data with third parties.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I host a game?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sign up for free, select a game from our library, and create a new lobby. Share the game code with friends to invite them.',
        },
      },
    ],
  }

  // Games Schema (for each game)
  const ludoSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Ludo Online',
    url: `${baseUrl}/#games`,
    description: 'Play multiplayer Ludo online with friends on DesiGameHub',
    genre: 'board game',
    gamePlatform: 'Web Browser',
    applicationCategory: 'GameApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const tamboolaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Tambola Online',
    url: `${baseUrl}/#games`,
    description: 'Play Tambola/Housie online with friends and family on DesiGameHub',
    genre: 'board game',
    gamePlatform: 'Web Browser',
    applicationCategory: 'GameApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const charadeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Dumb Charades Online',
    url: `${baseUrl}/#games`,
    description: 'Play online dumb charades with friends on DesiGameHub',
    genre: 'party game',
    gamePlatform: 'Web Browser',
    applicationCategory: 'GameApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ludoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tamboolaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(charadeSchema) }}
      />
    </>
  )
}
