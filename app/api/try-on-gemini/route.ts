import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Google AI (Gemini/Nano Banana)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { userImage, mannequinImagePath } = await request.json();

    if (!userImage) {
      return NextResponse.json({ error: 'Missing user image' }, { status: 400 });
    }

    console.log('[GEMINI NANO BANANA] Starting virtual try-on...');

    // Upload user's image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(userImage, {
      folder: 'gele-try-on',
      resource_type: 'image',
      public_id: `try-on-${Date.now()}`,
    });
    const userImageUrl = uploadResult.secure_url;
    console.log('User image uploaded:', userImageUrl);

    // Get mannequin image path
    const mannequinPath = path.join(process.cwd(), 'public', mannequinImagePath || '/images/mannequins/test-gele-mannequin.jpg');
    console.log('Loading mannequin from:', mannequinPath);

    // Read mannequin image as base64
    const mannequinBuffer = fs.readFileSync(mannequinPath);
    const mannequinBase64 = mannequinBuffer.toString('base64');

    // Fetch user image and convert to base64
    const userImageResponse = await fetch(userImageUrl);
    const userImageBuffer = await userImageResponse.arrayBuffer();
    const userImageBase64 = Buffer.from(userImageBuffer).toString('base64');

    // Get the model (gemini-2.5-flash-image for Nano Banana)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });

    console.log('Calling Gemini Nano Banana API...');

    // Create prompt for image GENERATION (not editing)
    // Using the user's photo and mannequin as references, generate a NEW portrait
    const prompt = `A close-up portrait of a beautiful Black woman with a vibrant, intricately tied gele headscarf that COMPLETELY covers ALL of her hair - no hair visible at all, not even edges or curls. The gele is wrapped in traditional African style matching the exact pattern, colors, and design shown in the mannequin reference image. The wrapping style should be identical to the mannequin. Her facial features, skin tone, and expression match the person shown in the reference photo. She has a warm smile and is looking directly at the camera. Soft studio lighting, realistic, high detail, professional portrait photography. The gele must cover the entire head with no hair showing anywhere.`;

    // Generate NEW image based on text prompt + reference images
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: userImageBase64,
        },
      },
      {
        inlineData: {
          mimeType: 'image/png',
          data: mannequinBase64,
        },
      },
    ]);

    const response = await result.response;
    console.log('Gemini response received');
    console.log('Full response structure:', JSON.stringify(response, null, 2));

    // Check if response has image data
    if (!response.candidates || response.candidates.length === 0) {
      console.error('No candidates in Gemini response:', response);
      return NextResponse.json({ error: 'No image generated', details: response }, { status: 500 });
    }

    const candidate = response.candidates[0];
    console.log('Candidate structure:', JSON.stringify(candidate, null, 2));

    // Check if content exists
    if (!candidate.content) {
      console.error('No content in candidate:', candidate);
      return NextResponse.json({
        error: 'No content in Gemini response',
        details: candidate,
        note: 'Gemini may have rejected the request or returned an error'
      }, { status: 500 });
    }

    // Extract image from response
    // Gemini returns base64 image data in the response
    const imagePart = candidate.content.parts?.find((part: any) => part.inlineData);

    if (!imagePart || !imagePart.inlineData) {
      console.error('No image data in Gemini response:', candidate);
      return NextResponse.json({ error: 'No image data generated', details: candidate }, { status: 500 });
    }

    const generatedImageBase64 = imagePart.inlineData.data;
    const generatedImageBuffer = Buffer.from(generatedImageBase64, 'base64');

    console.log('Generated image extracted from Gemini response');

    // Upload result to Cloudinary for permanent storage
    const resultUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'gele-try-on/results',
          resource_type: 'image',
          public_id: `result-gemini-${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(generatedImageBuffer);
    });

    console.log('Success! Generated virtual try-on with Gemini Nano Banana');

    return NextResponse.json({
      resultImage: (resultUpload as any).secure_url,
      message: 'Virtual try-on generated with Google Gemini (Nano Banana)',
    });

  } catch (error: any) {
    console.error('Gemini API error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    return NextResponse.json({
      error: 'Failed to process image',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'API route is working',
    approach: 'Google Gemini 2.5 Flash Image (Nano Banana)',
    config: {
      model: 'gemini-2.5-flash-image',
      features: 'Character-preserving image editing',
      pricing: '~$0.039 per image'
    }
  });
}
