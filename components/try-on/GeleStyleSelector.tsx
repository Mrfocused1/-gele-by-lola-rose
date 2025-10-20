'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { products } from '@/lib/products';

interface GeleStyleSelectorProps {
  selectedStyle: string | null;
  onSelectStyle: (styleId: string) => void;
}

export default function GeleStyleSelector({ selectedStyle, onSelectStyle }: GeleStyleSelectorProps) {
  const geleStyles = products;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">Choose Your Gele Style</h3>
        <p className="text-text-secondary">Select from our collection</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {/* Product Cards */}
        {geleStyles.map((style) => (
          <motion.button
            key={style.id}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
              selectedStyle === style.id.toString()
                ? 'border-accent shadow-lg'
                : 'border-neutral hover:border-text-secondary'
            }`}
            onClick={() => onSelectStyle(style.id.toString())}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Style Image - Show mannequin for try-on selector */}
            <div className="aspect-square bg-gradient-to-br from-neutral/10 to-neutral/20 overflow-hidden">
              <img
                src={style.mannequin}
                alt={style.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Selected Indicator */}
            {selectedStyle === style.id.toString() && (
              <motion.div
                className="absolute top-3 right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            )}

            {/* Style Info */}
            <div className="p-3 bg-white">
              <p className="font-medium text-primary text-sm line-clamp-1">{style.name}</p>
              <p className="text-xs text-text-secondary">{style.color}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedStyle && (
        <motion.div
          className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-primary">
            <span className="font-semibold">Selected:</span>{' '}
            {geleStyles.find(s => s.id.toString() === selectedStyle)?.name}
          </p>
        </motion.div>
      )}
    </div>
  );
}
