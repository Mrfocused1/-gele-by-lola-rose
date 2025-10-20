'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import AnimationWrapper from '@/components/ui/AnimationWrapper';

interface CTASectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  variant?: 'default' | 'accent' | 'dark';
}

export default function CTASection({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  variant = 'default',
}: CTASectionProps) {
  const backgrounds = {
    default: 'bg-neutral/5',
    accent: 'bg-gradient-to-br from-accent/10 to-accent/5',
    dark: 'bg-primary text-white',
  };

  const textColors = {
    default: {
      subtitle: 'text-accent',
      title: 'text-primary',
      description: 'text-text-secondary',
    },
    accent: {
      subtitle: 'text-accent',
      title: 'text-primary',
      description: 'text-text-secondary',
    },
    dark: {
      subtitle: 'text-accent',
      title: 'text-white',
      description: 'text-white/80',
    },
  };

  return (
    <section className={`py-20 md:py-28 ${backgrounds[variant]} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimationWrapper animation="fadeUp">
          {subtitle && (
            <p className={`text-sm ${textColors[variant].subtitle} tracking-extra-wide uppercase mb-4`}>
              {subtitle}
            </p>
          )}
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColors[variant].title} mb-6`}>
            {title}
          </h2>
          {description && (
            <p className={`text-lg ${textColors[variant].description} max-w-2xl mx-auto mb-10`}>
              {description}
            </p>
          )}

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link href={primaryButtonHref}>
              <Button
                variant={variant === 'dark' ? 'secondary' : 'primary'}
                size="lg"
                className="min-w-[200px]"
              >
                {primaryButtonText}
              </Button>
            </Link>
            {secondaryButtonText && secondaryButtonHref && (
              <Link href={secondaryButtonHref}>
                <Button
                  variant={variant === 'dark' ? 'outline' : 'outline'}
                  size="lg"
                  className={`min-w-[200px] ${
                    variant === 'dark' ? 'border-white text-white hover:bg-white hover:text-primary' : ''
                  }`}
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </motion.div>
        </AnimationWrapper>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}