'use client';

import { motion } from 'framer-motion';
import { Upload, Sparkles, Download, Camera } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import AnimationWrapper from '@/components/ui/AnimationWrapper';
import { Compare } from '@/components/ui/compare';

const steps = [
  {
    number: 1,
    icon: Camera,
    title: 'Upload Your Photo',
    description: 'Take or upload a clear headshot photo to get started',
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'Choose a Gele Style',
    description: 'Select from our luxury collection of gele designs',
  },
  {
    number: 3,
    icon: Download,
    title: 'See & Share Results',
    description: 'View your look instantly and share with friends',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-accent/5 to-neutral/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimationWrapper animation="fadeUp" className="text-center mb-16">
          <p className="text-sm text-accent tracking-extra-wide uppercase mb-4">
            Virtual Try-On
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Try Before You Buy
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See how different gele styles look on you with our AI-powered virtual try-on technology
          </p>
        </AnimationWrapper>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {steps.map((step, index) => (
            <AnimationWrapper
              key={step.number}
              animation="fadeUp"
              delay={index * 0.1}
            >
              <motion.div
                className="relative text-center px-4"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Simple Icon */}
                <div className="inline-flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>

                {/* Step Info */}
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {step.description}
                </p>
              </motion.div>
            </AnimationWrapper>
          ))}
        </div>

        {/* Before/After Compare Demo */}
        <AnimationWrapper animation="fadeUp" delay={0.4} className="flex justify-center my-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-primary mb-6">See the Transformation</h3>
            <Compare
              firstImage="/images/before-gele.jpg"
              secondImage="/images/after-gele.jpg"
              className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-2xl shadow-2xl mx-auto"
              firstImageClassName="object-cover"
              secondImageClassname="object-cover"
              slideMode="hover"
              autoplay={true}
              autoplayDuration={3000}
            />
            <p className="text-sm text-text-secondary mt-4">Hover to compare before and after</p>
          </div>
        </AnimationWrapper>

        {/* CTA Button */}
        <AnimationWrapper animation="fadeUp" delay={0.6} className="text-center">
          <Link href="/try-on">
            <Button variant="primary" size="lg" className="min-w-[250px]">
              <Sparkles className="w-5 h-5 mr-2" />
              Try It On Now
            </Button>
          </Link>
          <p className="mt-4 text-sm text-text-muted">
            Free to use • No registration required • Instant results
          </p>
        </AnimationWrapper>
      </div>
    </section>
  );
}