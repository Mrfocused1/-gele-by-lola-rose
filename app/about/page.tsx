'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Globe, Users } from 'lucide-react';
import AnimationWrapper from '@/components/ui/AnimationWrapper';
import CTASection from '@/components/ui/CTASection';

const values = [
  {
    icon: Heart,
    title: 'Crafted with Love',
    description: 'Every gele is handcrafted with meticulous attention to detail and a passion for preserving African heritage.',
  },
  {
    icon: Globe,
    title: 'Cultural Bridge',
    description: 'We celebrate the rich traditions of Africa while embracing the contemporary style of London fashion.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest fabrics and materials are selected to ensure each piece meets our luxury standards.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We empower women to embrace their cultural identity with confidence and modern elegance.',
  },
];

const timeline = [
  {
    year: '2018',
    title: 'The Beginning',
    description: 'Lola Rose started creating geles for friends and family from her London apartment.',
  },
  {
    year: '2019',
    title: 'First Collection',
    description: 'Launched our first official collection at London Fashion Week Africa showcase.',
  },
  {
    year: '2020',
    title: 'Online Expansion',
    description: 'Took our brand online, reaching customers across the UK and beyond.',
  },
  {
    year: '2022',
    title: 'Award Recognition',
    description: 'Received the British Fashion Council Award for Cultural Heritage in Fashion.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    description: 'Now shipping to over 50 countries, spreading African elegance worldwide.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral/10 to-neutral/5 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimationWrapper animation="fadeUp">
            <p className="text-sm text-accent tracking-extra-wide uppercase mb-4">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              About Gele By Lola Rose
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Where African heritage meets London&apos;s contemporary elegance, creating headwraps that celebrate culture, beauty, and confidence.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimationWrapper animation="slideIn">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-text-muted">Founder Image</span>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="fadeUp" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  Meet Lola Rose
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Born in Lagos and raised in London, Lola Rose embodies the perfect fusion of traditional African values and modern British sensibilities. Her journey began when she noticed a gap in the market for luxury geles that could seamlessly transition from traditional ceremonies to contemporary events.
                  </p>
                  <p>
                    &ldquo;I wanted to create something that would make women feel connected to their heritage while feeling absolutely fabulous in any setting,&rdquo; says Lola. &ldquo;Each gele tells a story - of tradition, of elegance, of the modern African woman who wears many hats but never forgets her roots.&rdquo;
                  </p>
                  <p>
                    With a background in fashion design from Central Saint Martins and years of studying traditional African textile techniques, Lola brings a unique perspective to every piece she creates. Her vision is to make the gele a global fashion statement, one headwrap at a time.
                  </p>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-neutral/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationWrapper animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              The principles that guide every stitch, every design, and every interaction
            </p>
          </AnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimationWrapper key={index} animation="fadeUp" delay={index * 0.1}>
                <motion.div
                  className="text-center space-y-4"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <value.icon className="w-8 h-8 text-accent" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationWrapper animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-text-secondary">
              From a dream to a global movement
            </p>
          </AnimationWrapper>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <AnimationWrapper
                key={index}
                animation="fadeUp"
                delay={index * 0.1}
              >
                <motion.div
                  className="flex gap-6 md:gap-8"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-grow pb-8 border-b border-neutral last:border-0">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </motion.div>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Experience the Elegance"
        subtitle="Join Our Journey"
        description="Discover the perfect gele that celebrates your heritage and complements your style"
        primaryButtonText="Shop Collection"
        primaryButtonHref="/shop"
        secondaryButtonText="Get in Touch"
        secondaryButtonHref="/contact"
        variant="dark"
      />
    </div>
  );
}