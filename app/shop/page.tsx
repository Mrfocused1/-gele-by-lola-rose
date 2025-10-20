'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import ProductGrid from '@/components/shop/ProductGrid';
import FilterBar from '@/components/shop/FilterBar';
import AnimationWrapper from '@/components/ui/AnimationWrapper';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('£', ''));
          const priceB = parseFloat(b.price.replace('£', ''));
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('£', ''));
          const priceB = parseFloat(b.price.replace('£', ''));
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Put featured items first
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-neutral/10 to-neutral/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationWrapper animation="fadeUp">
            <div className="text-center">
              <motion.p
                className="text-sm text-accent tracking-extra-wide uppercase mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Premium Collection
              </motion.p>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Shop All Geles
              </motion.h1>
              <motion.p
                className="text-lg text-text-secondary max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Explore our complete collection of luxury African headwraps, each piece crafted with care and designed to make you feel extraordinary
              </motion.p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Product Count */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-text-secondary">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
          </motion.div>

          {/* Product Grid */}
          <ProductGrid products={filteredAndSortedProducts} />
        </div>
      </section>
    </div>
  );
}