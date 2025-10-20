'use client';

import { motion } from 'framer-motion';
import { Download, Share2, RotateCcw, ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';
import { products } from '@/lib/products';
import Link from 'next/link';
import { Compare } from '@/components/ui/compare';

interface ResultDisplayProps {
  originalImage: string;
  resultImage: string;
  selectedStyle: string;
  onReset: () => void;
  onRetry?: () => void;
}

export default function ResultDisplay({
  originalImage,
  resultImage,
  selectedStyle,
  onReset,
  onRetry,
}: ResultDisplayProps) {
  const selectedProduct = products.find(p => p.id.toString() === selectedStyle);

  const handleDownload = () => {
    // Create download link for the result image
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'gele-try-on-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Gele Try-On',
          text: 'Check out how I look in this beautiful gele from Gele By Lola Rose!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('Share feature not supported on this browser');
    }
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-primary mb-2">Looking Fabulous!</h2>
        <p className="text-text-secondary">Here's how you look in your chosen gele</p>
      </motion.div>

      {/* Before/After Comparison with Interactive Slider */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-primary mb-6">See Your Transformation</h3>
        <Compare
          firstImage={originalImage}
          secondImage={resultImage}
          className="w-[300px] h-[400px] md:w-[500px] md:h-[600px] rounded-2xl shadow-2xl mx-auto"
          firstImageClassName="object-cover"
          secondImageClassname="object-cover"
          slideMode="hover"
          autoplay={true}
          autoplayDuration={3000}
        />
        <p className="text-sm text-text-secondary mt-4">Hover or drag to compare before and after</p>
      </motion.div>

      {/* Product Info */}
      {selectedProduct && (
        <motion.div
          className="bg-gradient-to-br from-accent/5 to-neutral/5 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-1">
                {selectedProduct.name}
              </h4>
              <p className="text-text-secondary mb-2">{selectedProduct.description}</p>
              <p className="text-2xl font-bold text-accent">{selectedProduct.price}</p>
            </div>
            <Link href={`/product/${selectedProduct.id}`}>
              <Button variant="primary" size="lg">
                Buy
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* AI Disclaimer */}
      <motion.div
        className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-amber-800">
          <strong>Result not quite right?</strong> AI generation can vary - if the gele didn't appear correctly or the result looks off, simply try again for a new generation!
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {onRetry && (
          <Button variant="primary" size="lg" onClick={onRetry}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        )}
        <Button variant="outline" size="lg" onClick={handleDownload}>
          <Download className="w-5 h-5 mr-2" />
          Download Image
        </Button>
        <Button variant="outline" size="lg" onClick={handleShare}>
          <Share2 className="w-5 h-5 mr-2" />
          Share Result
        </Button>
        <Button variant="outline" size="lg" onClick={onReset}>
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Another Style
        </Button>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        className="text-center text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-sm">Love this look? Share it with your friends or save it to your device!</p>
      </motion.div>
    </div>
  );
}