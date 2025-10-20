'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, User, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const confirmUpload = () => {
    if (preview) {
      onImageUpload(preview);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            dragActive
              ? 'border-accent bg-accent/5'
              : 'border-neutral hover:border-text-secondary'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />

          <div className="space-y-6">
            <motion.div
              className="mx-auto w-24 h-24 bg-neutral/10 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <User className="w-12 h-12 text-text-secondary" />
            </motion.div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Upload Your Photo
              </h3>
              <p className="text-text-secondary mb-6">
                Drag and drop your photo here or click to browse
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="md"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose Photo
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  // Camera functionality would go here
                  alert('Camera feature coming soon!');
                }}
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </Button>
            </div>

            <p className="text-xs text-text-muted">
              Supported formats: JPG, PNG, WEBP (Max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <motion.div
              className="aspect-square rounded-lg overflow-hidden shadow-lg bg-neutral/5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={preview}
                alt="Your uploaded photo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.button
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
              onClick={clearPreview}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-primary" />
            </motion.button>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={clearPreview}>
              Choose Different Photo
            </Button>
            <Button variant="primary" size="lg" onClick={confirmUpload}>
              Continue with This Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}