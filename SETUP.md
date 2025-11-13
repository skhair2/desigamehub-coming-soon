# Setup Guide - DesiGameHub Coming Soon Page

This guide will walk you through setting up the DesiGameHub coming soon landing page from scratch.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] Supabase account (free tier works)
- [ ] Vercel account (for deployment)
- [ ] Git repository (GitHub recommended)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Supabase client
- React Hot Toast (notifications)

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to initialize (2-3 minutes)
4. Go to **SQL Editor** in your Supabase dashboard
5. Copy the contents of `supabase/migrations/001_create_subscribers_table.sql`
6. Paste and run the SQL in the SQL Editor
7. Verify the `subscribers` table was created in **Table Editor**

### 3. Get Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://desigamehub.com
```

**Important**: Never commit `.env.local` to Git (it's in `.gitignore`)

### 5. Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Test the subscription form:**
1. Scroll to the waitlist section
2. Enter an email address
3. Submit the form
4. Check your Supabase dashboard → **Table Editor** → `subscribers` table
5. You should see the new entry!

### 6. Prepare for Production

#### Add Open Graph Image

Create an image at `public/og-image.jpg`:
- Dimensions: 1200x630px
- Format: JPG or PNG
- Content: DesiGameHub branding with tagline

#### Update Social Links

Edit `components/Footer.tsx` and update the social media URLs:
- Replace `href="#"` with actual URLs
- Update icons if needed

#### Customize Content

Review and update:
- `app/layout.tsx` - Meta tags, site URL
- `components/Hero.tsx` - Headlines, CTAs
- `components/WaitlistSection.tsx` - Form fields, bonuses
- `components/Footer.tsx` - Links, copyright

### 7. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/desigamehub-coming-soon.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
6. Click **"Deploy"**

#### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

### 8. Post-Deployment Checklist

- [ ] Test subscription form on production URL
- [ ] Verify emails are being saved to Supabase
- [ ] Check mobile responsiveness
- [ ] Test all internal links (smooth scroll)
- [ ] Verify SEO meta tags (use [metatags.io](https://metatags.io))
- [ ] Test social sharing (Open Graph preview)
- [ ] Set up custom domain (if applicable)
- [ ] Configure Google Analytics (optional)
- [ ] Set up email notifications for new subscribers (optional)

## Troubleshooting

### "Missing Supabase environment variables" error

- Check `.env.local` file exists
- Verify variable names are correct (must start with `NEXT_PUBLIC_`)
- Restart dev server after adding env vars

### Subscription form not working

1. Check browser console for errors
2. Verify Supabase credentials are correct
3. Check Supabase logs: **Logs** → **API Logs**
4. Ensure RLS policies allow inserts

### Build errors on Vercel

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure Node.js version is 18+ (set in `package.json` if needed)

### Styling issues

- Clear browser cache
- Check Tailwind is compiling: `npm run build`
- Verify `tailwind.config.js` is correct

## Next Steps

1. **Email Automation**: Set up welcome emails via Supabase Edge Functions or external service
2. **Analytics**: Add Google Analytics or Plausible
3. **A/B Testing**: Test different headlines and CTAs
4. **Performance**: Monitor Core Web Vitals in Vercel Analytics
5. **Content Updates**: Keep content fresh as launch approaches

## Support

For issues or questions:
- Check [README.md](./README.md) for detailed documentation
- Review Supabase documentation for database issues
- Check Next.js documentation for framework questions

---

**Happy launching! 🚀**

