'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface HeroProps {
  onVideosReady?: () => void;
}

export default function Hero({ onVideosReady }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isDimming, setIsDimming] = useState(false);
  const [firstVideoLoaded, setFirstVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    '/videos/hero-video.mp4',
    '/videos/hero-video-2.mp4'
  ];

  useEffect(() => {
    // Notify parent when first video is loaded
    if (firstVideoLoaded && onVideosReady) {
      onVideosReady();
    }
  }, [firstVideoLoaded, onVideosReady]);

  const handleVideoEnd = () => {
    // Start dim effect
    setIsDimming(true);

    // After dim completes, switch video
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      setIsDimming(false);
      // Play the new video
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 500); // 500ms dim duration
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Video/Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder Image */}
        <img
          src="/images/hero-image.jpg"
          alt="Gele By Lola Rose"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video Background */}
        <video
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          muted
          playsInline
          onLoadedData={() => {
            setVideoLoaded(true);
            if (!firstVideoLoaded) {
              setFirstVideoLoaded(true);
            }
          }}
          onEnded={handleVideoEnd}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded && !isDimming ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>

        {/* Dim transition overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isDimming ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: 'none' }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container - Bottom Left */}
      <div className="absolute bottom-20 left-0 z-10 px-6 sm:px-8 lg:px-12 max-w-2xl">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          Gele By Lola Rose
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-sm md:text-base text-white/90 mb-6 max-w-md leading-relaxed"
        >
          Luxury African headwraps crafted with love in London. Where tradition meets contemporary elegance for the modern woman.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-row items-start gap-3"
        >
          <Link href="/try-on">
            <button className="px-6 py-2 text-sm font-medium text-white border-2 border-white rounded-full hover:bg-white hover:text-primary transition-all duration-300">
              Try On
            </button>
          </Link>
          <Link href="/shop">
            <button className="px-6 py-2 text-sm font-medium text-white bg-accent border-2 border-accent rounded-full hover:bg-accent/90 transition-all duration-300 font-semibold">
              Shop
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
