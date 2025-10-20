'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';
import AnimationWrapper from '@/components/ui/AnimationWrapper';
import Button from '@/components/ui/Button';

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimationWrapper animation="fadeUp" className="text-center mb-16">
          <p className="text-sm text-accent tracking-extra-wide uppercase mb-4">
            Curated Selection
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Featured Collection
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover our most sought-after pieces, each one a celebration of heritage and modern style
          </p>
        </AnimationWrapper>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <AnimationWrapper animation="fadeUp" delay={0.6} className="text-center">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              View All Products
            </Button>
          </Link>
        </AnimationWrapper>
      </div>
    </section>
  );
}