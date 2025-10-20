import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import * as fal from '@fal-ai/serverless-client';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure fal.ai
fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: Request) {
  try {
    const { userImage, mannequinImagePath } = await request.json();

    if (!userImage) {
      return NextResponse.json({ error: 'Missing user image' }, { status: 400 });
    }

    console.log('[FASHN TRY-ON] Starting virtual try-on...');

    // Upload user's image to Cloudinary (model_image)
    const uploadResult = await cloudinary.uploader.upload(userImage, {
      folder: 'gele-try-on',
      resource_type: 'image',
      public_id: `try-on-${Date.now()}`,
    });
    const modelImageUrl = uploadResult.secure_url;
    console.log('Model image uploaded:', modelImageUrl);

    // Upload mannequin/garment image (garment_image)
    const mannequinPath = path.join(process.cwd(), 'public', mannequinImagePath || '/images/mannequins/test-gele-mannequin.jpg');
    console.log('Loading garment from:', mannequinPath);

    const garmentUpload = await cloudinary.uploader.upload(mannequinPath, {
      folder: 'gele-try-on/garments',
      resource_type: 'image',
    });
    const garmentImageUrl = garmentUpload.secure_url;
    console.log('Garment image uploaded:', garmentImageUrl);

    console.log('Calling FASHN Virtual Try-On API v1.6...');

    // Call FASHN Virtual Try-On via fal.ai
    const result = await fal.subscribe('fal-ai/fashn/tryon/v1.6', {
      input: {
        model_image: modelImageUrl,
        garment_image: garmentImageUrl,
        category: 'tops', // FASHN expects garment category
        num_images: 1,
        guidance_scale: 2.0,
        num_inference_steps: 50, // Higher for better quality
        seed: Math.floor(Math.random() * 1000000),
        enable_safety_checks: true,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          console.log('FASHN progress:', update.logs?.map((log) => log.message));
        }
      },
    });

    console.log('FASHN response:', JSON.stringify(result));

    // Extract the generated image URL
    const generatedImageUrl = result.images?.[0]?.url;

    if (!generatedImageUrl) {
      console.error('No image URL in FASHN response:', result);
      return NextResponse.json({ error: 'No image generated', details: result }, { status: 500 });
    }

    console.log('Generated image URL:', generatedImageUrl);

    // Upload result to Cloudinary for permanent storage
    const resultUpload = await cloudinary.uploader.upload(generatedImageUrl, {
      folder: 'gele-try-on/results',
      resource_type: 'image',
      public_id: `result-fashn-${Date.now()}`,
    });

    console.log('Success! Generated virtual try-on with FASHN');

    return NextResponse.json({
      resultImage: resultUpload.secure_url,
      message: 'Virtual try-on generated with FASHN API',
    });

  } catch (error: any) {
    console.error('FASHN API error:', error);
    console.error('Error body:', error.body);
    console.error('Error status:', error.status);

    return NextResponse.json({
      error: 'Failed to process image',
      details: error.message,
      errorBody: error.body,
      status: error.status,
      stack: error.stack
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'API route is working',
    approach: 'FASHN Virtual Try-On v1.6 (fal.ai)',
    config: {
      model: 'fal-ai/fashn/tryon/v1.6',
      resolution: '864x1296',
      headwear_support: 'Maintains integrity of head coverings (hijabs)'
    }
  });
}
