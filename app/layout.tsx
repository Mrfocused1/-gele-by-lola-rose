import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gele By Lola Rose | Luxury African Headwraps",
  description: "Luxury African headwraps crafted in London. Where tradition meets contemporary elegance. Shop our collection of premium geles for weddings, events, and special occasions.",
  keywords: "gele, african headwrap, luxury headwrap, london fashion, african fashion, wedding gele, traditional headwrap",
  openGraph: {
    title: "Gele By Lola Rose",
    description: "Luxury African headwraps crafted in London",
    type: "website",
    locale: "en_GB",
    url: "https://gelebylolarose.com",
    siteName: "Gele By Lola Rose",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gele By Lola Rose",
    description: "Luxury African headwraps crafted in London",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
              padding: 0;
              margin: 0;
            }
            html {
              scroll-behavior: smooth;
            }
            body {
              font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.5;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: #ffffff;
              color: #1a1a1a;
            }
            .glass-effect {
              background: rgba(255, 255, 255, 0.8);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
            }
            /* Ensure Tailwind classes work */
            .min-h-screen { min-height: 100vh; }
            .bg-white { background-color: #ffffff; }
            .text-primary { color: #1A1A1A; }
            .text-text-secondary { color: #6B6B6B; }
            .bg-primary { background-color: #1A1A1A; }
            .bg-accent { background-color: #FF5F6D; }
            .bg-neutral { background-color: #EAEAEA; }
            .text-white { color: #ffffff; }
            .text-accent { color: #FF5F6D; }
            .border-neutral { border-color: #EAEAEA; }
            .tracking-extra-wide { letter-spacing: 0.2em; }
            .text-4xl { font-size: 2.25rem; }
            .text-5xl { font-size: 3rem; }
            .text-lg { font-size: 1.125rem; }
            .text-sm { font-size: 0.875rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-medium { font-weight: 500; }
            .uppercase { text-transform: uppercase; }
            .text-center { text-align: center; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .flex-1 { flex: 1 1 0%; }
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .gap-6 { gap: 1.5rem; }
            .gap-4 { gap: 1rem; }
            .gap-2 { gap: 0.5rem; }
            .space-y-8 > * + * { margin-top: 2rem; }
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .p-6 { padding: 1.5rem; }
            .p-4 { padding: 1rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
            .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
            .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
            .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .ml-3 { margin-left: 0.75rem; }
            .mr-2 { margin-right: 0.5rem; }
            .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mt-16 { margin-top: 4rem; }
            .mt-20 { margin-top: 5rem; }
            .pt-16 { padding-top: 4rem; }
            .pt-20 { padding-top: 5rem; }
            .w-10 { width: 2.5rem; }
            .h-10 { height: 2.5rem; }
            .w-5 { width: 1.25rem; }
            .h-5 { height: 1.25rem; }
            .w-48 { width: 12rem; }
            .h-48 { height: 12rem; }
            .w-full { width: 100%; }
            .h-full { height: 100%; }
            .max-w-4xl { max-width: 56rem; }
            .max-w-6xl { max-width: 72rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-full { border-radius: 9999px; }
            .overflow-hidden { overflow: hidden; }
            .object-cover { object-fit: cover; }
            .border-b { border-bottom-width: 1px; }
            .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
            .shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
            .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
            .transition-shadow { transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
            .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
            .duration-200 { transition-duration: 200ms; }
            .hover\\:text-primary:hover { color: #1A1A1A; }
            .hover\\:bg-hover-dark:hover { background-color: #0D0D0D; }
            .hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
            .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
            .from-accent\\/5 { --tw-gradient-from: rgb(255 95 109 / 0.05); --tw-gradient-to: rgb(255 95 109 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-neutral\\/5 { --tw-gradient-to: rgb(234 234 234 / 0.05); }
            .from-neutral\\/5 { --tw-gradient-from: rgb(234 234 234 / 0.05); --tw-gradient-to: rgb(234 234 234 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-transparent { --tw-gradient-to: transparent; }
            .bg-neutral\\/10 { background-color: rgb(234 234 234 / 0.1); }
            .bg-neutral\\/50 { background-color: rgb(234 234 234 / 0.5); }
            .bg-neutral\\/20 { background-color: rgb(234 234 234 / 0.2); }
            .disabled\\:opacity-50:disabled { opacity: 0.5; }
            .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
            .cursor-wait { cursor: wait; }
            .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
            .focus-visible\\:ring-2:focus-visible { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
            .focus-visible\\:ring-accent:focus-visible { --tw-ring-color: #FF5F6D; }
            .focus-visible\\:ring-offset-2:focus-visible { --tw-ring-offset-width: 2px; }
            .inline-flex { display: inline-flex; }
            .relative { position: relative; }
            .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            @media (min-width: 768px) {
              .md\\:py-16 { padding-top: 4rem; padding-bottom: 4rem; }
              .md\\:text-5xl { font-size: 3rem; }
              .md\\:pt-20 { padding-top: 5rem; }
              .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }
            @media (min-width: 640px) {
              .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            }
            @media (min-width: 1024px) {
              .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
            }
          `
        }} />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Ensure Tailwind is available globally
            window.tailwind = window.tailwind || {};
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#1A1A1A',
                    background: '#FFFFFF',
                    accent: '#FF5F6D',
                    neutral: '#EAEAEA',
                    'text-primary': '#1A1A1A',
                    'text-secondary': '#6B6B6B',
                    'text-muted': '#9CA3AF',
                    'border-light': '#EAEAEA',
                    'hover-dark': '#0D0D0D',
                  },
                  fontFamily: {
                    sans: ['Inter', 'system-ui', 'sans-serif'],
                    heading: ['Inter', 'system-ui', 'sans-serif'],
                  },
                  fontSize: {
                    '2xs': '0.625rem',
                    'xs': '0.75rem',
                    'sm': '0.875rem',
                    'base': '1rem',
                    'lg': '1.125rem',
                    'xl': '1.25rem',
                    '2xl': '1.5rem',
                    '3xl': '1.875rem',
                    '4xl': '2.25rem',
                    '5xl': '3rem',
                    '6xl': '3.75rem',
                  },
                  spacing: {
                    '18': '4.5rem',
                    '22': '5.5rem',
                    '26': '6.5rem',
                    '30': '7.5rem',
                    '34': '8.5rem',
                    '38': '9.5rem',
                    '42': '10.5rem',
                  },
                  letterSpacing: {
                    'tighter': '-0.05em',
                    'tight': '-0.025em',
                    'normal': '0',
                    'wide': '0.025em',
                    'wider': '0.05em',
                    'widest': '0.1em',
                    'extra-wide': '0.2em',
                  },
                  lineHeight: {
                    'tight': '1.1',
                    'snug': '1.25',
                    'normal': '1.5',
                    'relaxed': '1.75',
                    'loose': '2',
                  },
                  borderRadius: {
                    'none': '0',
                    'sm': '0.25rem',
                    'DEFAULT': '0.375rem',
                    'md': '0.5rem',
                    'lg': '0.75rem',
                    'xl': '1rem',
                    '2xl': '1.5rem',
                    'full': '9999px',
                  },
                  animation: {
                    'fade-in': 'fadeIn 0.5s ease-in-out',
                    'fade-up': 'fadeUp 0.5s ease-out',
                    'slide-in': 'slideIn 0.3s ease-out',
                    'slide-up': 'slideUp 0.4s ease-out',
                    'scale-up': 'scaleUp 0.2s ease-out',
                    'shimmer': 'shimmer 2s linear infinite',
                  },
                  keyframes: {
                    fadeIn: {
                      '0%': { opacity: '0' },
                      '100%': { opacity: '1' },
                    },
                    fadeUp: {
                      '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                      },
                      '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                      },
                    },
                    slideIn: {
                      '0%': { transform: 'translateX(100%)' },
                      '100%': { transform: 'translateX(0)' },
                    },
                    slideUp: {
                      '0%': {
                        opacity: '0',
                        transform: 'translateY(100%)'
                      },
                      '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                      },
                    },
                    scaleUp: {
                      '0%': { transform: 'scale(0.95)' },
                      '100%': { transform: 'scale(1)' },
                    },
                    shimmer: {
                      '0%': { backgroundPosition: '200% 0' },
                      '100%': { backgroundPosition: '-200% 0' },
                    },
                  },
                  transitionDuration: {
                    '0': '0ms',
                    '200': '200ms',
                    '400': '400ms',
                    '600': '600ms',
                    '800': '800ms',
                    '1000': '1000ms',
                  },
                  backdropBlur: {
                    xs: '2px',
                    sm: '4px',
                    DEFAULT: '8px',
                    md: '12px',
                    lg: '16px',
                    xl: '24px',
                    '2xl': '40px',
                    '3xl': '64px',
                  },
                }
              }
            }
          `
        }} />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
