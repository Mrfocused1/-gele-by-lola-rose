'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Creating your gele look...' }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress with a smooth animation
    const duration = 20000; // 20 seconds total
    const steps = 100;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;

      // Ease-out effect - slower as it approaches 100%
      const easedProgress = Math.min(
        100,
        Math.floor(currentStep + (100 - currentStep) * 0.05)
      );

      setProgress(easedProgress);

      if (currentStep >= 95) {
        clearInterval(interval);
        // Hold at 95-99% until actual completion
        setProgress(95 + Math.floor(Math.random() * 4));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="max-w-md w-full px-8 text-center">
        {/* Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-16 h-16 text-accent" strokeWidth={1.5} />
        </motion.div>

        {/* Progress Circle */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-neutral/20"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="text-accent"
              initial={{ strokeDasharray: "0 552" }}
              animate={{
                strokeDasharray: `${(progress / 100) * 552} 552`
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>

          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={progress}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-5xl font-bold text-primary">{progress}</span>
              <span className="text-2xl text-text-secondary">%</span>
            </motion.div>
          </div>
        </div>

        {/* Message */}
        <motion.p
          className="text-lg text-text-secondary mb-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>

        <p className="text-sm text-text-muted">
          This may take up to 30 seconds
        </p>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center gap-2 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
