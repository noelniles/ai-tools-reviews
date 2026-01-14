# AI Tools Reviews

An independent review site for AI tools, featuring comprehensive benchmarks, hands-on testing, and honest recommendations.

## 🌟 Features

- ✅ **20+ Comprehensive Reviews** - In-depth analysis of ChatGPT, Claude, Midjourney, and more
- ✅ **Interactive Comparison Tool** - Compare tools side-by-side with filtering
- ✅ **User Review Submission** - Community-driven reviews with spam protection
- ✅ **Analytics Tracking** - Google Analytics 4 with custom event tracking
- ✅ **Affiliate Monetization** - Ready-to-use affiliate link infrastructure
- ✅ **Charts & Visualizations** - Chart.js powered performance comparisons
- ✅ **SEO Optimized** - Meta tags, semantic HTML, fast loading
- ✅ **Responsive Design** - Mobile-first Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-tools-reviews.git
cd ai-tools-reviews

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev
```

Visit `http://localhost:4321` to see your site!

### Build for Production

```bash
npm run build
npm run preview
```

## 💰 Monetization Setup

This site is ready for monetization! Follow the **[QUICK_START.md](QUICK_START.md)** guide to:

1. Set up Google Analytics (5 minutes)
2. Apply to affiliate programs (1 hour)
3. Start making money! 🎉

See **[MONETIZATION_GUIDE.md](MONETIZATION_GUIDE.md)** for the complete strategy.

## 📊 Analytics

The site tracks:
- Page views and time on page
- Affiliate link clicks (by tool)
- Scroll depth
- Newsletter signups
- User review submissions
- Outbound link clicks

All configured in `/src/lib/analytics.ts`

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```bash
# Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX  # Your Google Analytics ID

# Forms
PUBLIC_FORMSPREE_NEWSLETTER_ID=your-form-id
PUBLIC_FORMSPREE_REVIEW_ID=your-form-id

# Optional: Privacy-focused alternatives
PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
PUBLIC_FATHOM_SITE_ID=your-site-id
```

### Affiliate Links

Update `/src/lib/affiliates.ts` with your affiliate links as you get approved for programs.

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Nav.astro
│   │   ├── ReviewCard.astro
│   │   ├── Chart.astro
│   │   └── ...
│   ├── content/         # MDX content
│   │   ├── config.ts    # Content collection schemas
│   │   └── reviews/     # Review content (20 files)
│   ├── layouts/         # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── ReviewLayout.astro
│   ├── lib/            # Utilities
│   │   ├── analytics.ts   # Analytics helpers
│   │   └── affiliates.ts  # Affiliate config
│   ├── pages/          # Routes
│   │   ├── index.astro        # Homepage
│   │   ├── compare.astro      # Comparison tool
│   │   ├── submit-review.astro # User reviews
│   │   └── reviews/
│   │       ├── [slug].astro   # Dynamic review pages
│   │       └── index.astro    # All reviews
│   └── styles/
│       └── base.css    # Global styles
├── .env.example        # Environment template
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
├── QUICK_START.md      # 5-minute setup guide
├── MONETIZATION_GUIDE.md  # Complete monetization strategy
└── REVIEW_SUBMISSIONS.md  # User review system docs
```

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |

## 📝 Adding New Reviews

1. Create a new MDX file in `/src/content/reviews/`:

```mdx
---
title: "Tool Name Review"
description: "Brief description"
date: "2026-01-13"
tags: ["AI", "Category"]
affiliate_links:
  primary: "https://tooltool.com/?ref=yourcode"
rating:
  overall: 8
  usability: 9
  quality: 8
  pricing: 7
---

Your review content here...
```

2. Include components:

```mdx
import MetricsGrid from '../../components/MetricsGrid.astro'
import ProsCons from '../../components/ProsCons.astro'

<MetricsGrid metrics={[...]} />
<ProsCons pros={[...]} cons={[...]} />
```

3. Build and deploy!

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs`:

```javascript
theme: {
  extend: {
    colors: {
      brand: '#0ea5e9',  // Change to your brand color
    }
  }
}
```

### Analytics Provider

The site supports multiple analytics providers. Configure in `.env`:

- Google Analytics 4 (free)
- Plausible Analytics (privacy-focused, paid)
- Fathom Analytics (privacy-focused, paid)

## 🚀 Deployment

### Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or connect your GitHub repo for auto-deployment.

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Other Hosts

Build the site:
```bash
npm run build
```

Upload the `dist/` folder to any static host (Cloudflare Pages, GitHub Pages, etc.)

## 📈 SEO & Performance

- ✅ Semantic HTML structure
- ✅ Meta tags for social sharing
- ✅ Fast page loads (< 1s)
- ✅ Mobile responsive
- ✅ Accessible (WCAG 2.1)
- ✅ Clean URLs (`/reviews/chatgpt-4`)

Add your sitemap to Google Search Console after deploying.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

Built with:
- [Astro](https://astro.build) - Static site framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Chart.js](https://www.chartjs.org) - Data visualization
- [MDX](https://mdxjs.com) - Markdown with components

## 📧 Support

Questions? Check out:
- [QUICK_START.md](QUICK_START.md) - Get started in 5 minutes
- [MONETIZATION_GUIDE.md](MONETIZATION_GUIDE.md) - Make money with your site
- [REVIEW_SUBMISSIONS.md](REVIEW_SUBMISSIONS.md) - User review system

---

**Ready to make money reviewing AI tools?** Follow the [QUICK_START.md](QUICK_START.md) guide! 🚀

