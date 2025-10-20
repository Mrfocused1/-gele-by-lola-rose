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
            }
            .glass-effect {
              background: rgba(255, 255, 255, 0.8);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
            }
          `
        }} />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
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
                  },
                  letterSpacing: {
                    'extra-wide': '0.2em',
                  }
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
