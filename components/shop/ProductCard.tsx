'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cart = useCart();
  const canAddToCart = !!cart;
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cart) {
      cart.addToCart(product);
    }
  };

  // Get the side perspective image (first image in the images array)
  const sideImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const displayImage = isHovered && sideImage ? sideImage : product.image;

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-neutral/10 to-neutral/20 overflow-hidden">
          {/* Product Image */}
          <img
            src={displayImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-300"
          />

          {/* Stock Badge */}
          {product.stock < 10 && product.stock > 0 && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs rounded-full">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3">
          <h3 className="text-base font-medium text-primary mb-2 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">{product.price}</span>
            {canAddToCart && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddToCart}
                className="md:hidden"
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}