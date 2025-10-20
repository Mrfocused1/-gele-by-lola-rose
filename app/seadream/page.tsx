'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SeaDreamTest() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!userImage) return;

    setIsProcessing(true);
    setResultImage(null);

    try {
      const response = await fetch('/api/try-on-seadream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        alert('Error: ' + (error.error || 'Failed to generate portrait'));
      }
    } catch (error) {
      alert('Error processing image');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SeaDream Virtual Try-On (Mannequin Approach)
          </h1>
          <p className="text-lg text-gray-600">
            Upload your photo to see yourself wearing the gele
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Your Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>

          {userImage && (
            <div className="flex justify-center mb-6">
              <div className="relative w-64 h-64">
                <Image
                  src={userImage}
                  alt="Your uploaded photo"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleProcess}
              disabled={!userImage || isProcessing}
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Generating Portrait...' : 'Generate Portrait'}
            </button>
          </div>
        </div>

        {resultImage && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Your Generated Portrait
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Original Photo
                </h3>
                <div className="relative w-full aspect-square">
                  <Image
                    src={userImage!}
                    alt="Original"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">
                  With Gele
                </h3>
                <div className="relative w-full aspect-square">
                  <Image
                    src={resultImage}
                    alt="With Gele"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setUserImage(null);
                  setResultImage(null);
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                Try Another Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
