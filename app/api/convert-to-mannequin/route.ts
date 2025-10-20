import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { geleImage } = await request.json();

    if (!geleImage) {
      return NextResponse.json(
        { error: 'Gele image is required' },
        { status: 400 }
      );
    }

    // Step 1: Analyze the image to detect demographics
    const analyzeResponse = await fetch(process.env.SEEDREAM_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SEEDREAM_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'seededit-3-0-i2i-250628',
        prompt: 'Describe the person in this image in detail, including their ethnicity, skin tone, and any other visible characteristics. Be concise.',
        image: geleImage,
        response_format: 'url',
        size: 'adaptive',
        guidance_scale: 5.5,
        watermark: true,
      }),
    });

    if (!analyzeResponse.ok) {
      const errorData = await analyzeResponse.json();
      console.error('Analysis failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to analyze image', details: errorData },
        { status: 500 }
      );
    }

    const analyzeData = await analyzeResponse.json();

    // Extract demographic info from the analysis
    // For simplicity, we'll use a generic conversion prompt that works for all
    // The AI should be smart enough to maintain the person's characteristics

    // Step 2: Convert to mannequin using dynamic prompt
    const conversionPrompt = `Transform this portrait: Replace the woman in this image with a transparent glass mannequin head with a metallic black face, while keeping the gele headscarf EXACTLY the same - same pattern, same colors, same way it is tied, same folds and details. The background should be pure white with soft studio lighting. Maintain the same close-up perspective and high detail. The mannequin should have a sleek, modern appearance. Keep everything about the gele identical to the original.`;

    const convertResponse = await fetch(process.env.SEEDREAM_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SEEDREAM_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'seededit-3-0-i2i-250628',
        prompt: conversionPrompt,
        image: geleImage,
        response_format: 'url',
        size: 'adaptive',
        guidance_scale: 5.5,
        watermark: true,
      }),
    });

    if (!convertResponse.ok) {
      const errorData = await convertResponse.json();
      console.error('Conversion failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to convert to mannequin', details: errorData },
        { status: 500 }
      );
    }

    const convertData = await convertResponse.json();

    if (!convertData.data || convertData.data.length === 0) {
      return NextResponse.json(
        { error: 'No mannequin image generated' },
        { status: 500 }
      );
    }

    const mannequinImageUrl = convertData.data[0].url;

    // Upload to Cloudinary for persistence
    const uploadResult = await cloudinary.uploader.upload(mannequinImageUrl, {
      folder: 'gele-mannequins',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    return NextResponse.json({
      mannequinImage: uploadResult.secure_url,
      success: true,
    });

  } catch (error) {
    console.error('Error in mannequin conversion:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
