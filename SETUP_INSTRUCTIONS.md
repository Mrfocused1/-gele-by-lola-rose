# Setup Instructions for Gele By Lola Rose Website

## Important: NPM Permissions Fix Required

Before you can run this project, you need to fix the npm permissions issue on your system. Run this command in your terminal:

```bash
sudo chown -R $(whoami) ~/.npm
```

You'll be prompted for your password. This will fix the npm cache permissions issue.

## Installation Steps

1. **Navigate to the project directory:**
```bash
cd ~/Desktop/"Gele by Lola Rose"/gele-by-lola-rose
```

2. **Install dependencies:**
```bash
npm install
```

This will install:
- Next.js 14
- React and React DOM
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- And other development dependencies

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

Once the server is running, you'll have access to:

- **Homepage** - Hero section with call-to-action buttons
- **Shop** - Browse all products with filtering options
- **Product Details** - Individual product pages (click any product)
- **About** - Brand story and founder information
- **Contact** - Contact form and business information
- **Shopping Cart** - Click the cart icon to see the slide-in drawer

## Features to Test

1. **Add to Cart**: Click on any product and add it to cart
2. **Cart Persistence**: Items remain in cart even after page refresh
3. **Filtering**: On the Shop page, filter by category (Traditional, Modern, Bridal)
4. **Sorting**: Sort products by price or name
5. **Responsive Design**: Resize your browser to see mobile/tablet layouts
6. **Animations**: Notice the smooth animations throughout the site
7. **Contact Form**: Fill out and submit the contact form (mock submission)

## Production Build

To test the production build:

```bash
npm run build
npm run start
```

## Troubleshooting

If you encounter issues:

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Delete node_modules and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check Node version:**
Make sure you have Node.js 18+ installed:
```bash
node --version
```

## Project Structure Overview

- All page components are in the `/app` directory
- Reusable components are in `/components`
- Product data is in `/lib/products.ts`
- Cart state management is in `/context/CartContext.tsx`
- Styling uses Tailwind CSS with custom configuration
- Animations powered by Framer Motion

## Note About Images

The project currently uses placeholder divs for product images. In production, you would:
1. Add actual product images to `/public/images/`
2. Update the product data in `/lib/products.ts` with real image paths
3. Replace placeholder divs with Next.js Image components

---

Ready to experience luxury African headwraps with modern London elegance!