'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Heart, Share2, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { getProductById, products } from '@/lib/products';
import { useCartContext } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/shop/ProductCard';
import AnimationWrapper from '@/components/ui/AnimationWrapper';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCartContext();

  if (!product) {
    notFound();
  }

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Build images array: main image + additional images if available
  const productImages = [
    product.image,
    ...(product.images || [])
  ];

  const features = [
    { icon: Truck, text: 'Free UK delivery on orders over £100' },
    { icon: Shield, text: 'Premium quality guaranteed' },
    { icon: RefreshCw, text: '30-day return policy' },
    { icon: Check, text: 'Handcrafted in London' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-text-muted">/</span>
            <Link href="/shop" className="text-text-secondary hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/shop">
            <motion.div
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
              whileHover={{ x: -4 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Shop</span>
            </motion.div>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <AnimationWrapper animation="fadeIn">
              <div className="space-y-4">
                {/* Main Image */}
                <motion.div
                  className="aspect-square bg-gradient-to-br from-neutral/10 to-neutral/20 rounded-lg overflow-hidden"
                  layoutId={`product-image-${product.id}`}
                >
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                  />
                </motion.div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((img, index) => (
                    <motion.button
                      key={index}
                      className={`aspect-square bg-gradient-to-br from-neutral/10 to-neutral/20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-neutral'
                      }`}
                      onClick={() => setSelectedImage(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimationWrapper>

            {/* Product Info */}
            <AnimationWrapper animation="fadeUp" delay={0.2}>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-accent uppercase tracking-wider mb-2">
                    {product.category}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-semibold text-primary">{product.price}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-text-secondary leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">Color:</span>
                    <span className="text-sm text-text-secondary">{product.color}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">Availability:</span>
                    <span className={`text-sm ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                      {isFavorite ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="border-t border-b border-neutral py-6 space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon className="w-5 h-5 text-accent" />
                      <span className="text-sm text-text-secondary">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Care Instructions */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">Care Instructions</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• Hand wash or gentle machine wash in cold water</li>
                    <li>• Air dry away from direct sunlight</li>
                    <li>• Iron on low heat if needed</li>
                    <li>• Store in a cool, dry place</li>
                  </ul>
                </div>
              </div>
            </AnimationWrapper>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <AnimationWrapper animation="fadeUp">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                  You May Also Like
                </h2>
              </AnimationWrapper>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <AnimationWrapper key={relatedProduct.id} animation="fadeUp" delay={index * 0.1}>
                    <ProductCard product={relatedProduct} />
                  </AnimationWrapper>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}