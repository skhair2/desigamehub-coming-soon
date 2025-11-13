/**
 * Image Alt Tags & SEO Optimization Guide
 * 
 * This file contains recommended alt tags and image attributes for all images
 * used in DesiGameHub to maximize SEO value and accessibility.
 */

export const imageAltTags = {
  hero: {
    mainImage: 'Play desi games online with friends on DesiGameHub - Multiplayer Ludo, Tambola, and Charades platform',
    bgGradient: 'DesiGameHub gaming platform background',
    featurePills: {
      multiplayer: 'Multiplayer gaming feature icon',
      instant: 'Instant play without signup feature',
      rewards: 'Earn rewards and participate in tournaments',
    },
  },

  problemSection: {
    card1: 'Scattered family gaming experience - Problem with traditional desi games',
    card2: 'Lack of online multiplayer options for indian party games',
    card3: 'Need for trusted platform with desi games online',
  },

  solutionSection: {
    mainImage: 'DesiGameHub unified solution for playing desi games online with friends',
    storyImage: 'DesiGameHub community playing multiplayer games together',
  },

  howItWorks: {
    step1: 'Sign up on DesiGameHub - Play desi games online',
    step2: 'Create a game lobby for tambola or other desi games',
    step3: 'Invite friends and start playing instantly',
    icons: {
      signup: 'Sign up icon for DesiGameHub registration',
      create: 'Create game lobby icon',
      play: 'Start playing icon',
    },
  },

  features: {
    feature1: 'Real-time multiplayer games on DesiGameHub',
    feature2: 'Mobile-friendly desi games platform',
    feature3: 'Host private game lobbies for friends',
    feature4: 'Instant matchmaking for online games',
    feature5: 'Leaderboards and tournament participation',
    feature6: 'Secure cross-platform gaming',
  },

  gamesShowcase: {
    ludoCard: 'Play Ludo online on DesiGameHub - Classic Indian board game multiplayer',
    ludoIcon: 'Ludo board game icon',
    ludoFeatures: 'Ludo features: Real-time multiplayer, Quick matches, Ranking system',
    
    tambolaCard: 'Play Tambola online on DesiGameHub - Indian housie game multiplayer',
    tambolaIcon: 'Tambola housie game icon',
    tambolaFeatures: 'Tambola features: Quick rounds, Exciting prizes, Community play',
    
    charadeCard: 'Play Dumb Charades online on DesiGameHub - Bollywood themed games',
    charadeIcon: 'Dumb Charades game icon',
    charadeFeatures: 'Charades features: Instant fun, Friendship focused, No setup needed',

    statusBadges: {
      available: 'Available now on DesiGameHub',
      comingSoon: 'Coming soon to DesiGameHub',
    },
  },

  faqSection: {
    accordionIcons: 'Frequently asked questions about DesiGameHub - Expand for answers',
    supportButton: 'Contact DesiGameHub support team',
  },

  waitlistSection: {
    mainCTA: 'Join DesiGameHub waitlist - Get early access to play desi games online',
    bonusList: 'Early access benefits for DesiGameHub waitlist members',
    checkmarkIcon: 'Included benefit for waitlist members',
  },

  footer: {
    logo: 'DesiGameHub - Play desi games online',
    socialIcons: {
      facebook: 'DesiGameHub Facebook page',
      instagram: 'DesiGameHub Instagram profile',
      twitter: 'DesiGameHub Twitter account',
      discord: 'DesiGameHub Discord community',
    },
  },

  general: {
    brandLogo: 'DesiGameHub logo - Desi games online platform',
    favicon: 'DesiGameHub favicon',
    ogImage: 'DesiGameHub - Play the best desi games online with friends and family',
    twitterImage: 'DesiGameHub social media preview - Multiplayer desi games',
  },
};

/**
 * Image Optimization Recommendations
 */
export const imageOptimization = {
  formats: {
    hero: {
      filename: 'hero-background.webp',
      fallback: 'hero-background.jpg',
      width: 1920,
      height: 1080,
      quality: 80,
      description: 'Main hero section background image',
    },
    gameLudo: {
      filename: 'game-ludo.webp',
      fallback: 'game-ludo.jpg',
      width: 400,
      height: 300,
      quality: 75,
      description: 'Ludo game showcase card image',
    },
    gameTambola: {
      filename: 'game-tambola.webp',
      fallback: 'game-tambola.jpg',
      width: 400,
      height: 300,
      quality: 75,
      description: 'Tambola game showcase card image',
    },
    gameCharades: {
      filename: 'game-charades.webp',
      fallback: 'game-charades.jpg',
      width: 400,
      height: 300,
      quality: 75,
      description: 'Charades game showcase card image',
    },
    featureCards: {
      filename: 'feature-{number}.webp',
      fallback: 'feature-{number}.jpg',
      width: 300,
      height: 300,
      quality: 75,
      description: 'Feature showcase card image',
    },
  },

  bestPractices: [
    'Use WebP format for faster loading (with JPG fallback)',
    'Compress all images to under 100KB when possible',
    'Use responsive images with srcset for different device sizes',
    'Add descriptive alt tags with 50-125 characters',
    'Include primary keywords naturally in alt text',
    'Lazy load images below the fold for better performance',
    'Use descriptive filenames (e.g., ludo-game-thumbnail.webp)',
    'Optimize for different screen sizes (mobile: 400px, tablet: 800px, desktop: 1200px)',
  ],

  responsive: {
    mobile: {
      width: 400,
      quality: 70,
      description: 'Mobile device image sizes',
    },
    tablet: {
      width: 800,
      quality: 75,
      description: 'Tablet device image sizes',
    },
    desktop: {
      width: 1200,
      quality: 80,
      description: 'Desktop device image sizes',
    },
  },

  performanceTargets: {
    largestContentfulPaint: '< 2.5s',
    firstInputDelay: '< 100ms',
    cumulativeLayoutShift: '< 0.1',
    totalPageSize: '< 3MB (target: < 2MB)',
    imagesTotalSize: '< 1.5MB',
  },
};

/**
 * SEO-Optimized Image Naming Convention
 * 
 * Pattern: [context]-[type]-[keyword].extension
 * Example: hero-background-desi-games.webp
 */
export const imageNamingConvention = {
  pattern: '[context]-[type]-[keyword].[extension]',
  examples: [
    'hero-background-desi-games.webp',
    'feature-multiplayer-games.webp',
    'game-card-ludo-online.webp',
    'screenshot-tambola-gameplay.webp',
    'icon-tournament-rewards.webp',
  ],
  contexts: ['hero', 'feature', 'game', 'screenshot', 'icon'],
  types: ['background', 'card', 'icon', 'screenshot', 'banner'],
  extensions: ['webp', 'jpg', 'png', 'svg'],
};

/**
 * Structured Data for Images (Schema.org)
 */
export const imageSchemaMarkup = {
  example: {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    'name': 'DesiGameHub Ludo Online Game',
    'description': 'Play Ludo online with friends on DesiGameHub multiplayer platform',
    'url': 'https://desigamehub.com/images/game-ludo-online.webp',
    'creditText': 'DesiGameHub',
    'width': '400',
    'height': '300',
  },
  usage: 'Add to pages with important images for additional SEO benefit',
};

export default imageAltTags;
