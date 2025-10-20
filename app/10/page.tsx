'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Sparkles, ChevronRight, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimationWrapper from '@/components/ui/AnimationWrapper';
import GeleStyleSelector from '@/components/try-on/GeleStyleSelector';
import ImageUploader from '@/components/try-on/ImageUploader';
import ResultDisplay from '@/components/try-on/ResultDisplay';

export default function TryOnPage() {
  const [step, setStep] = useState(1);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUserImage(imageUrl);
    setStep(2);
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  const handleProcess = async () => {
    if (!userImage || !selectedStyle) return;

    setIsProcessing(true);

    try {
      // Get the selected product details to send the image URL
      const { products } = await import('@/lib/products');
      const selectedProduct = products.find(p => p.id.toString() === selectedStyle);

      const response = await fetch('/api/try-on-10', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImage,
          geleStyle: selectedProduct?.name || selectedStyle,
          geleImageUrl: selectedProduct?.image ? `${window.location.origin}${selectedProduct.image}` : null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResultImage(data.resultImage);
        setStep(3);
      }
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetProcess = () => {
    setStep(1);
    setUserImage(null);
    setSelectedStyle(null);
    setResultImage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/5 to-neutral/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimationWrapper animation="fadeUp">
            <p className="text-sm text-accent tracking-extra-wide uppercase mb-4">
              Virtual Try-On
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Variation 10
            </h1>
            <p className="text-lg text-text-secondary">
              Crown and hair area
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-neutral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Upload Photo' },
              { num: 2, label: 'Choose Style' },
              { num: 3, label: 'See Results' },
            ].map((item, index) => (
              <div key={item.num} className="flex items-center flex-1">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    step >= item.num
                      ? 'bg-primary text-white'
                      : 'bg-neutral/50 text-text-secondary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.num}
                </motion.div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    step >= item.num ? 'text-primary' : 'text-text-secondary'
                  }`}>
                    {item.label}
                  </p>
                </div>
                {index < 2 && (
                  <ChevronRight className={`w-5 h-5 mx-2 ${
                    step > item.num ? 'text-primary' : 'text-neutral'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 1 && (
            <AnimationWrapper animation="fadeUp">
              <ImageUploader onImageUpload={handleImageUpload} />
            </AnimationWrapper>
          )}

          {step === 2 && (
            <AnimationWrapper animation="fadeUp">
              <div className="space-y-8">
                {/* Selected Image Preview */}
                <div className="bg-neutral/10 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-primary">Your Photo</h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-text-secondary hover:text-primary transition-colors"
                    >
                      Change photo
                    </button>
                  </div>
                  <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden">
                    {userImage && (
                      <img
                        src={userImage}
                        alt="Your photo"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Style Selector */}
                <GeleStyleSelector
                  selectedStyle={selectedStyle}
                  onSelectStyle={handleStyleSelect}
                />

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleProcess}
                    disabled={!selectedStyle}
                    isLoading={isProcessing}
                  >
                    {!isProcessing && (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Apply Gele
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </AnimationWrapper>
          )}

          {step === 3 && resultImage && (
            <AnimationWrapper animation="fadeUp">
              <ResultDisplay
                originalImage={userImage!}
                resultImage={resultImage}
                selectedStyle={selectedStyle!}
                onReset={resetProcess}
              />
            </AnimationWrapper>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-gradient-to-br from-neutral/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationWrapper animation="fadeUp">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Tips for Best Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Good Lighting',
                  description: 'Use a well-lit photo with your face clearly visible',
                },
                {
                  title: 'Front Facing',
                  description: 'Upload a front-facing photo for the most accurate results',
                },
                {
                  title: 'Hair Pulled Back',
                  description: 'Photos with hair pulled back work best for gele placement',
                },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="font-semibold text-primary mb-2">{tip.title}</h3>
                  <p className="text-sm text-text-secondary">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
}
