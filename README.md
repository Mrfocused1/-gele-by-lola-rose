# Gele By Lola Rose - Luxury E-Commerce Website

A sleek, professional e-commerce website for a London-based African headwrap (Gele) brand, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

### Pages
- **Home**: Hero section, featured products, brand story teaser
- **Shop**: Product grid with filtering and sorting capabilities
- **Product Detail**: Individual product pages with image gallery and related products
- **About**: Brand story, founder profile, values, and journey timeline
- **Contact**: Contact form, FAQs, business information

### Core Functionality
- 🛒 **Shopping Cart**: Fully functional cart with local storage persistence
- 🎨 **Design System**: Treatwell-inspired minimal aesthetic with custom components
- 📱 **Responsive Design**: Mobile-first approach with seamless desktop experience
- ✨ **Animations**: Smooth Framer Motion animations throughout
- 🔍 **Product Filtering**: Filter by category and sort by price/name
- 📝 **Contact Form**: Validated form with error handling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Storage**: Local Storage for cart persistence
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. Navigate to the project directory:
```bash
cd gele-by-lola-rose
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
gele-by-lola-rose/
├── app/                    # Next.js 14 app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop page
│   ├── product/[id]/      # Dynamic product pages
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── layout/           # Navbar, Footer
│   ├── home/             # Hero, FeaturedProducts
│   ├── shop/             # ProductCard, ProductGrid, FilterBar
│   ├── cart/             # CartDrawer
│   ├── contact/          # ContactForm
│   └── ui/               # Button, CTASection, AnimationWrapper
├── context/              # Cart context provider
├── lib/                  # Utilities and data
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Design System

### Color Palette

- **Primary**: #1A1A1A (Dark text/buttons)
- **Background**: #FFFFFF (White)
- **Accent**: #FF5F6D (Pink/coral highlights)
- **Neutral**: #EAEAEA (Borders/dividers)

### Typography

- Font: Inter (sans-serif)
- Sizes: Responsive scale from xs to 6xl
- Line heights: Optimized for readability

## Features in Detail

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent storage across sessions
- Slide-in drawer with animations
- Real-time total calculation

### Product Management
- 9 sample products with categories
- Featured products system
- Stock tracking
- Price formatting

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized navigation for all devices

## Deployment

This project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

## License

© 2024 Gele By Lola Rose. All rights reserved.

---

Built with ❤️ in London
