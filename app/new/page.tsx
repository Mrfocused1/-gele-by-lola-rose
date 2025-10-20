'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimationWrapper from '@/components/ui/AnimationWrapper';
import ImageUploader from '@/components/try-on/ImageUploader';

export default function NewApproachTestPage() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUserImage(imageUrl);
  };

  const handleProcess = async () => {
    if (!userImage) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/try-on-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImage,
          mannequinImagePath: '/images/mannequins/test-gele-mannequin.jpg',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResultImage(data.resultImage);
      } else {
        const error = await response.json();
        console.error('API Error:', error);
        alert('Error: ' + (error.error || 'Failed to generate portrait'));
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetProcess = () => {
    setUserImage(null);
    setResultImage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/5 to-neutral/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimationWrapper animation="fadeUp">
            <p className="text-sm text-accent tracking-extra-wide uppercase mb-4">
              NEW APPROACH TEST
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Dynamic Portrait Generation
            </h1>
            <p className="text-lg text-text-secondary">
              AI analyzes your photo and creates a new portrait matching your characteristics with the mannequin gele
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!resultImage ? (
            <AnimationWrapper animation="fadeUp">
              <div className="space-y-8">
                <ImageUploader onImageUpload={handleImageUpload} />

                {userImage && (
                  <div className="space-y-6">
                    <div className="bg-neutral/10 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-primary mb-4">Your Uploaded Photo</h3>
                      <div className="relative w-64 h-64 mx-auto rounded-lg overflow-hidden">
                        <img
                          src={userImage}
                          alt="Your photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setUserImage(null)}
                      >
                        Change Photo
                      </Button>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleProcess}
                        isLoading={isProcessing}
                      >
                        {!isProcessing && (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate Portrait
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </AnimationWrapper>
          ) : (
            <AnimationWrapper animation="fadeUp">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-primary text-center">
                  Your Generated Portrait
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Original */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary text-center">
                      Original Photo
                    </h3>
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-neutral">
                      <img
                        src={userImage!}
                        alt="Original"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Generated Result */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary text-center">
                      With Gele
                    </h3>
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-primary">
                      <img
                        src={resultImage}
                        alt="Result"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={resetProcess}
                  >
                    Try Another Photo
                  </Button>
                </div>
              </div>
            </AnimationWrapper>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gradient-to-br from-neutral/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimationWrapper animation="fadeUp">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Analyze Your Photo',
                  description: 'AI analyzes your skin tone, facial features, lighting, and background style',
                },
                {
                  title: 'Reference Mannequin',
                  description: 'AI examines the mannequin to learn the exact gele colors, patterns, and wrapping style',
                },
                {
                  title: 'Generate Portrait',
                  description: 'Creates a new portrait matching your characteristics with the authentic gele style',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-accent mb-3">{index + 1}</div>
                  <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
}
