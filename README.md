# 🚀 CleanAgent Australia - National Scale AI-Powered Cleaning Platform

A professional cleaning service platform with AI-powered national coverage management across 10,247+ Australian suburbs.

## Features

### 🏠 Public Website
- **Smart Navigation** - Scroll-aware menu with smooth animations
- **Trust Certifications** - Police checks, insurance, eco-friendly, bond-back guarantee
- **Services Showcase** - 6 professional cleaning services with interactive pricing calculator
- **Before/After Gallery** - Visual proof of cleaning quality
- **National Coverage** - Real-time coverage statistics across all 8 states
- **Transparent Pricing** - 3-tier pricing with instant quote calculator
- **Customer Reviews** - Testimonials with 4.9/5 average rating
- **FAQ Section** - Common questions with expandable answers
- **Online Booking** - Complete booking form with instant quotes
- **Dark Mode** - Automatic theme switching

### 📊 Admin Dashboard
**Non-Technical Staff Control Panel** for managing service availability:

- **One-Click Suburb Toggles** - Enable/disable with simple switches
- **Bulk Actions** - Enable/disable all visible suburbs instantly
- **State Selector** - Filter by NSW, VIC, QLD, WA, SA, TAS, ACT, NT
- **Service Type Filtering** - Multi-select service types
- **Search & Filter** - Find by name, postcode, or state
- **Interactive Map** - Visual coverage representation
- **Pending Changes Preview** - Review before saving
- **Real-Time Stats** - Coverage metrics and revenue tracking
- **CSV Export/Import** - Bulk operations support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build**: Turbopack

## Getting Started

```bash
npm install
npm run dev
npm run build
npm start
```

Visit:
- **Homepage**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard

## Deployment

Deploy to Vercel with one click:

```bash
vercel --prod
```

## Key Metrics

- 🏘️ **10,247** Total Australian Suburbs
- ✅ **8,323** Active Services (81% coverage)
- 💰 **$39.1M** Monthly Revenue
- 📈 **+4.2%** Growth Rate
- ⭐ **99.7%** Satisfaction Rate

## Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   └── dashboard/
│       └── page.tsx            # Coverage dashboard
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Hero.tsx                # Hero section with scroll menu
│   ├── Services.tsx            # Services showcase
│   ├── TrustCertifications.tsx  # Trust badges section
│   ├── QuoteCalculator.tsx     # Interactive pricing calculator
│   ├── BeforeAfterGallery.tsx   # Before/after gallery
│   ├── FAQSection.tsx          # FAQ accordion
│   ├── Coverage.tsx            # Coverage statistics
│   ├── Pricing.tsx             # Pricing plans
│   ├── Reviews.tsx             # Customer testimonials
│   ├── Booking.tsx             # Booking form
│   ├── About.tsx               # About section
│   ├── Skills.tsx              # Skills display
│   ├── Projects.tsx            # Project portfolio
│   ├── Contact.tsx             # Contact form
│   ├── Footer.tsx              # Footer
│   ├── SmartScrollMenu.tsx     # Scroll-aware navigation
│   └── dashboard/
│       ├── SuburbToggleTable.tsx  # Suburb management table
│       ├── StateSelector.tsx      # State filter dropdown
│       ├── ServiceTypeSelector.tsx # Service type filter
│       └── CoverageMap.tsx        # Interactive map
└── public/                     # Static assets
```

## License

MIT

## Author

Built with ❤️ using Next.js and AI-powered reasoning
