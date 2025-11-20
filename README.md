# DesiPlayground - Coming Soon Landing Page

A modern, SEO-optimized "Coming Soon" landing page for DesiPlayground, built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🎯 Features

- **Modern Design**: Beautiful, responsive landing page with smooth animations using Framer Motion
- **SEO Optimized**: Comprehensive meta tags, Open Graph data, sitemap, and robots.txt
- **Email Waitlist**: Supabase-powered subscription system with validation
- **Brand Compliant**: Follows DesiPlayground brand guidelines (colors, typography, tone)
- **Accessibility**: WCAG AAA compliant with proper focus states and semantic HTML
- **Performance**: Optimized for Core Web Vitals and fast loading

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Vercel account (for deployment)

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
```

3. **Set up Supabase database:**

Run the migration SQL file to create the subscribers table:

```bash
# Option 1: Using Supabase CLI
supabase migration up

# Option 2: Copy and paste the SQL from supabase/migrations/001_create_subscribers_table.sql
# into your Supabase SQL Editor and execute it
```

The migration creates:
- `subscribers` table with email, name, phone, country, and source fields
- Indexes for performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

4. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts          # API endpoint for email subscriptions
│   ├── layout.tsx                 # Root layout with metadata and fonts
│   ├── page.tsx                   # Main landing page
│   ├── globals.css                # Global styles and Tailwind config
│   ├── sitemap.ts                 # Dynamic sitemap generation
│   └── robots.ts                  # Robots.txt configuration
├── components/
│   ├── Hero.tsx                   # Hero section with animations
│   ├── ProblemSection.tsx         # Problem statement section
│   ├── SolutionSection.tsx        # Solution showcase
│   ├── HowItWorks.tsx             # 3-step process
│   ├── FeaturesShowcase.tsx        # Feature cards
│   ├── GamesShowcase.tsx          # Game preview cards
│   ├── WaitlistSection.tsx        # Email subscription form
│   └── Footer.tsx                 # Footer with links
├── lib/
│   └── supabase.ts                # Supabase client configuration
├── supabase/
│   └── migrations/
│       └── 001_create_subscribers_table.sql
├── public/                        # Static assets (add og-image.jpg here)
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind with brand colors
├── tsconfig.json                  # TypeScript configuration
├── vercel.json                    # Vercel deployment config
└── README.md                      # This file
```

## 🎨 Brand Colors

The project uses DesiPlayground brand colors defined in `tailwind.config.js`:

- **Saffron**: `#FF6B35` - Primary CTA color
- **Royal Purple**: `#8B2CA0` - Secondary accents
- **Peacock**: `#20B2AA` - Success states
- **Gold**: `#FFD700` - Premium elements
- **Charcoal**: `#1C2833` - Text and dark backgrounds
- **Cream**: `#FFFAF0` - Light backgrounds

## 🔍 SEO Optimization

### Meta Tags

- Comprehensive title and description with target keywords
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready

### Keywords Integrated

The following SEO keywords are naturally integrated throughout the page:

- Play desi games online
- Tambola online lobby
- Online dumb charades
- Desi CodeNames game
- Host tambola game
- Join tambola lobby
- Local multiplayer desi games
- Indian family party games online
- Bollywood game night app
- Real-time desi games
- Friends lobby games
- Online housie tambola
- Desi games for NRIs
- Cross-platform desi games
- Hindi party games app
- Game Night / Desi Game Night / Diwali Game Night

### Sitemap & Robots

- Dynamic sitemap generation at `/sitemap.xml`
- Robots.txt configured for search engine crawling
- All sections are crawlable and indexed

## 🗄️ Supabase Setup

### Database Schema

The `subscribers` table includes:

- `id` (UUID, primary key)
- `email` (TEXT, unique, required)
- `name` (TEXT, optional)
- `phone` (TEXT, optional)
- `country` (TEXT, optional)
- `source` (TEXT, default: 'coming-soon-page')
- `subscribed_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Security

- Row Level Security (RLS) enabled
- Public can insert (subscribe)
- Authenticated users can read (admin access)
- Email validation on both client and server

## 🚢 Vercel Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_GOOGLE_VERIFICATION` (optional)

5. Deploy!

### Step 3: Configure Custom Domain (Optional)

1. In Vercel project settings, add your custom domain
2. Update `NEXT_PUBLIC_SITE_URL` to your domain
3. Update DNS records as instructed by Vercel

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for SEO) | Recommended |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console code | Optional |

## 🎯 Next Steps

1. **Add Open Graph Image**: Create `public/og-image.jpg` (1200x630px) for social sharing
2. **Customize Content**: Update copy, links, and social media URLs in components
3. **Analytics**: Add Google Analytics or other tracking (recommended)
4. **Email Service**: Set up email service (SendGrid, Mailchimp) for welcome emails
5. **A/B Testing**: Test different CTAs and messaging
6. **Performance**: Monitor Core Web Vitals and optimize as needed

## 🐛 Troubleshooting

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure RLS policies allow inserts

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

### Email Subscription Not Working

- Check browser console for errors
- Verify API route is accessible: `/api/subscribe`
- Check Supabase logs for database errors
- Ensure email field is not empty and valid format

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🤝 Support

For questions or issues, contact the DesiPlayground development team.

---

**Made with ❤️ for families everywhere.**

