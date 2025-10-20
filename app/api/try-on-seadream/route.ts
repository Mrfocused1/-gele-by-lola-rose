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

    console.log('[FLUX KONTEXT] Starting image-to-image transformation...');

    // Upload user's image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(userImage, {
      folder: 'gele-try-on',
      resource_type: 'image',
      public_id: `try-on-${Date.now()}`,
    });
    const userImageUrl = uploadResult.secure_url;
    console.log('User image uploaded:', userImageUrl);

    // Upload mannequin reference image (local file path)
    const mannequinPath = path.join(process.cwd(), 'public', mannequinImagePath || '/images/mannequins/test-gele-mannequin.jpg');
    console.log('Loading mannequin from:', mannequinPath);

    const mannequinUpload = await cloudinary.uploader.upload(mannequinPath, {
      folder: 'gele-try-on/mannequins',
      resource_type: 'image',
    });
    const mannequinImageUrl = mannequinUpload.secure_url;
    console.log('Mannequin image uploaded:', mannequinImageUrl);

    // Create simple prompt for FLUX Kontext (let the reference image guide the design)
    const promptText = `Add the gele headwrap from the reference image to this person. Cover all hair completely. Keep face, skin tone, and background unchanged.`;

    console.log('Calling FLUX Kontext API...');
    console.log('User image:', userImageUrl);
    console.log('Reference mannequin:', mannequinImageUrl);
    console.log('Prompt:', promptText);

    // Call FLUX Kontext Pro via fal.ai (better reference image support)
    const result = await fal.subscribe('fal-ai/flux-pro/kontext', {
      input: {
        prompt: promptText,
        image_url: userImageUrl,
        reference_images: [
          {
            image_url: mannequinImageUrl,
            weight: 3.0  // Increased weight to prioritize visual reference over text
          }
        ],
        num_inference_steps: 28,
        guidance_scale: 2.5,  // Lower guidance to rely more on reference image
        num_images: 1,
        output_format: 'jpeg',
        safety_tolerance: 2,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          console.log('FLUX Kontext progress:', update.logs?.map((log) => log.message));
        }
      },
    });

    console.log('FLUX Kontext response:', JSON.stringify(result));

    // Extract the generated image URL (fal.ai returns data directly, no .data wrapper)
    const generatedImageUrl = result.images?.[0]?.url;

    if (!generatedImageUrl) {
      console.error('No image URL in FLUX response:', result);
      return NextResponse.json({ error: 'No image generated', details: result }, { status: 500 });
    }

    console.log('Generated image URL:', generatedImageUrl);

    // Upload result to Cloudinary for permanent storage
    const resultUpload = await cloudinary.uploader.upload(generatedImageUrl, {
      folder: 'gele-try-on/results',
      resource_type: 'image',
      public_id: `result-flux-${Date.now()}`,
    });

    console.log('Success! Generated portrait with FLUX Kontext');

    return NextResponse.json({
      resultImage: resultUpload.secure_url,
      message: 'Portrait generated with FLUX Kontext image-to-image',
    });

  } catch (error: any) {
    console.error('FLUX Kontext API error:', error);
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
    approach: 'FLUX Kontext Pro (fal.ai/flux-pro/kontext)',
    config: {
      reference_weight: 3.0,
      guidance_scale: 2.5,
      model: 'flux-pro/kontext'
    }
  });
}
