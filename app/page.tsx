'use client';

import { useState } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HowItWorks from '@/components/home/HowItWorks';
import CTASection from '@/components/ui/CTASection';
import AnimationWrapper from '@/components/ui/AnimationWrapper';
import SiteLoadingScreen from '@/components/ui/SiteLoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideosReady = () => {
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <SiteLoadingScreen isLoading={isLoading} />
      <div className="overflow-x-hidden">
        {/* Hero Section */}
        <Hero onVideosReady={handleVideosReady} />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* How It Works - Virtual Try-On */}
      <HowItWorks />

      {/* Brand Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimationWrapper animation="slideIn">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/brand-story.jpg"
                  alt="Women celebrating together wearing beautiful Gele headwraps"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="fadeUp" delay={0.2}>
              <div className="space-y-6">
                <p className="text-sm text-accent tracking-extra-wide uppercase">
                  Our Heritage
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  Crafted with Love in London
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Gele By Lola Rose was born from a passion to celebrate African heritage through contemporary fashion. Each piece tells a story of tradition, elegance, and the modern woman who wears it with pride.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Our founder, Lola Rose, brings together traditional craftsmanship with London&apos;s fashion-forward sensibility, creating headwraps that are both timeless and trendsetting.
                </p>
                <div className="pt-4">
                  <a
                    href="/about"
                    className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors"
                  >
                    Learn Our Story
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Find Your Perfect Gele?"
        subtitle="Exclusive Collection"
        description="Join thousands of women who have discovered the confidence that comes with wearing Gele By Lola Rose"
        primaryButtonText="Shop Now"
        primaryButtonHref="/shop"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
        variant="accent"
      />
      </div>
    </>
  );
}
