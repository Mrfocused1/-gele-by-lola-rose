'use client';

import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'modern', label: 'Modern' },
  { value: 'bridal', label: 'Bridal' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden md:flex items-center justify-between bg-white border-b border-neutral py-4 px-6 mb-8 rounded-lg">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-primary">Filter by:</span>
          <div className="flex gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white'
                    : 'bg-neutral/20 text-text-secondary hover:bg-neutral/30'
                }`}
                onClick={() => setSelectedCategory(category.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-primary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 text-sm font-medium bg-white border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          size="md"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <Filter className="w-4 h-4" />
          Filter & Sort
        </Button>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Filter Panel */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-primary">Filter & Sort</h3>
              <motion.button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-text-secondary hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-primary mb-3">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.value}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary text-white'
                        : 'bg-neutral/20 text-text-secondary'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      setIsMobileFilterOpen(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-primary mb-3">Sort By</h4>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    className={`w-full px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors ${
                      sortBy === option.value
                        ? 'bg-primary text-white'
                        : 'bg-neutral/20 text-text-secondary'
                    }`}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsMobileFilterOpen(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}