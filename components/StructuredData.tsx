'use client'

export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://desiplayground.com'

  // ========================================
  // 1. ORGANIZATION SCHEMA
  // ========================================
  // Comprehensive company information for Google Knowledge Graph
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'DesiPlayground',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 500,
      height: 500,
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    description:
      'The ultimate platform for playing traditional Indian and South Asian games online with friends and family. Features Tambola, Carrom, Ludo, Charades, and more multiplayer games.',
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      name: 'Global',
    },
    sameAs: [
      'https://facebook.com/desiplayground',
      'https://instagram.com/desiplayground',
      'https://twitter.com/desiplayground',
      'https://linkedin.com/company/desiplayground',
      'https://discord.com/invite/desiplayground',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'support@desiplayground.com',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Technical Support',
        email: 'tech@desiplayground.com',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Global',
      addressRegion: 'International',
    },
    knowsAbout: [
      'Multiplayer Games',
      'Indian Games',
      'Desi Culture',
      'Online Gaming',
      'Board Games',
      'Party Games',
    ],
    offersUrl: `${baseUrl}/#features`,
  }

  // ========================================
  // 2. WEBSITE SCHEMA
  // ========================================
  // Website metadata and search functionality
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'DesiPlayground',
    url: baseUrl,
    description:
      'Play the best desi games online - Tambola, Carrom, Ludo, Dumb Charades, Codenames, and traditional Indian party games with real-time multiplayer.',
    inLanguage: ['en', 'en-US'],
    isAccessibleForFree: true,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      query: 'required name=search_term_string',
    },
  }

  // ========================================
  // 3. FAQ SCHEMA
  // ========================================
  // Comprehensive FAQ content for Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${baseUrl}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is DesiPlayground completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All games on DesiPlayground are 100% free to play. We offer optional cosmetic purchases and premium features, but all core gameplay is completely free and accessible to everyone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I play on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! DesiPlayground is fully responsive and optimized for all devices – smartphones, tablets, and desktop computers. Experience the same smooth gameplay on any device.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I play against my friends?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Invite friends via a unique game code, or join multiplayer lobbies to find opponents in real-time. Our instant matchmaking ensures you find players quickly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data secure on DesiPlayground?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We use HTTPS encryption, industry-standard security protocols, and never share your personal data with third parties. Your privacy and security are our top priority.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I host a game?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sign up for free, select a game from our library, and create a new lobby. Share the game code with friends to invite them directly to your game.',
        },
      },
      {
        '@type': 'Question',
        name: 'What games are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer classic Desi games including Ludo, Tambola/Housie, Dumb Charades, Codenames, Carrom, and more. New games are added regularly based on community feedback.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Creating an account is optional for guest play, but we recommend signing up to track your stats, unlock achievements, and participate in tournaments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there tournaments with prizes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We host weekly and monthly tournaments with exciting prize pools. Join tournaments of varying difficulty levels to compete with players worldwide.',
        },
      },
    ],
  }

  // ========================================
  // 4. BREADCRUMB LIST SCHEMA
  // ========================================
  // Navigation hierarchy for rich snippets
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${baseUrl}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Games',
        item: `${baseUrl}/#games`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Features',
        item: `${baseUrl}/#features`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'FAQ',
        item: `${baseUrl}/#faq`,
      },
    ],
  }

  // ========================================
  // 5. SOFTWARE APPLICATION SCHEMA
  // ========================================
  // Platform information for app listings
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${baseUrl}/#application`,
    name: 'DesiPlayground',
    url: baseUrl,
    description:
      'Multiplayer platform for playing traditional Indian and South Asian games online including Tambola, Carrom, Ludo, Charades and more.',
    applicationCategory: 'GamesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to play with optional premium features',
    },
    operatingSystem: 'Windows, macOS, iOS, Android, Linux',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'DesiPlayground Team',
      url: baseUrl,
    },
    inLanguage: ['en', 'hi'],
    isAccessibleForFree: true,
    permissions: [
      'Requires internet connection',
      'Camera access for video-based games (optional)',
      'Microphone access for voice chat (optional)',
    ],
  }

  // ========================================
  // 6. INDIVIDUAL GAME SCHEMAS
  // ========================================
  // Structured data for each game
  const ludoSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    '@id': `${baseUrl}/#game-ludo`,
    name: 'Ludo Online',
    alternateName: 'Pachisi Online',
    url: `${baseUrl}/#games`,
    description: 'Play multiplayer Ludo online with friends on DesiPlayground. Real-time gameplay, instant matchmaking, and leaderboards.',
    genre: ['Board Game', 'Multiplayer Game', 'Traditional Game'],
    gamePlatform: ['Web Browser', 'Mobile Browser'],
    applicationCategory: 'GameApplication',
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '500',
    },
  }

  const tamboolaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    '@id': `${baseUrl}/#game-tambola`,
    name: 'Tambola Online',
    alternateName: 'Housie Online',
    url: `${baseUrl}/#games`,
    description:
      'Play Tambola/Housie online with friends and family on DesiPlayground. Traditional Indian number-based game with real-time multiplayer support.',
    genre: ['Board Game', 'Multiplayer Game', 'Party Game', 'Indian Game'],
    gamePlatform: ['Web Browser', 'Mobile Browser'],
    applicationCategory: 'GameApplication',
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '800',
    },
  }

  const charadeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    '@id': `${baseUrl}/#game-charades`,
    name: 'Dumb Charades Online',
    alternateName: 'Charades Game',
    url: `${baseUrl}/#games`,
    description: 'Play online dumb charades with friends on DesiPlayground. The classic party game adapted for real-time multiplayer online gameplay.',
    genre: ['Party Game', 'Multiplayer Game', 'Word Game', 'Social Game'],
    gamePlatform: ['Web Browser', 'Mobile Browser'],
    applicationCategory: 'GameApplication',
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      ratingCount: '600',
    },
  }

  const carromSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    '@id': `${baseUrl}/#game-carrom`,
    name: 'Carrom Online',
    alternateName: 'Carrom Board Game',
    url: `${baseUrl}/#games`,
    description: 'Play multiplayer Carrom online with realistic physics and real-time opponents on DesiPlayground.',
    genre: ['Board Game', 'Multiplayer Game', 'Skill Game', 'Indian Game'],
    gamePlatform: ['Web Browser', 'Mobile Browser'],
    applicationCategory: 'GameApplication',
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '650',
    },
  }

  // ========================================
  // RENDER STRUCTURED DATA
  // ========================================
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ludoSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tamboolaSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(charadeSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carromSchema) }}
        suppressHydrationWarning
      />
    </>
  )
}
