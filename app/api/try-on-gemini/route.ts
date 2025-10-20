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

// Configure Google AI (Gemini for image editing)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { userImage, mannequinImagePath } = await request.json();

    if (!userImage) {
      return NextResponse.json({ error: 'Missing user image' }, { status: 400 });
    }

    console.log('[GEMINI IMAGE EDITING] Starting virtual try-on...');

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

    // Try using gemini-2.0-flash-exp-image-generation-001 model
    // This is an experimental image generation model
    console.log('Calling Gemini image generation API...');

    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

    const payload = {
      contents: [{
        parts: [
          {
            text: `Edit this image by adding an elaborate, traditional African gele headwrap. The gele should completely cover all hair with intricate folds and ties. Use the reference gele design shown in the second image. Keep the person's face, expression, and background exactly the same. Only add the headwrap.`
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: userImageBase64
            }
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: mannequinBase64
            }
          }
        ]
      }],
      generationConfig: {
        responseModalities: ['image'],
        temperature: 1.0,
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return NextResponse.json({
        error: 'Gemini API request failed',
        details: errorText,
        status: response.status
      }, { status: 500 });
    }

    const result = await response.json();
    console.log('Gemini response received');
    console.log('Response structure:', JSON.stringify(result, null, 2));

    // Check for image data in response
    if (!result.candidates || result.candidates.length === 0) {
      console.error('No candidates in response:', result);
      return NextResponse.json({
        error: 'No image generated',
        details: result
      }, { status: 500 });
    }

    const candidate = result.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      console.error('No content parts:', candidate);
      return NextResponse.json({
        error: 'No content in response',
        details: candidate
      }, { status: 500 });
    }

    // Find image part in response
    const imagePart = candidate.content.parts.find((part: any) => part.inlineData);

    if (!imagePart || !imagePart.inlineData || !imagePart.inlineData.data) {
      console.error('No image data in response:', candidate);
      return NextResponse.json({
        error: 'No image data generated',
        details: candidate
      }, { status: 500 });
    }

    const generatedImageBase64 = imagePart.inlineData.data;
    const generatedImageBuffer = Buffer.from(generatedImageBase64, 'base64');
    console.log('Generated image extracted from response');

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

    console.log('Success! Generated virtual try-on with Gemini');

    return NextResponse.json({
      resultImage: (resultUpload as any).secure_url,
      message: 'Virtual try-on generated with Google Gemini',
    });

  } catch (error: any) {
    console.error('Gemini API error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    return NextResponse.json({
      error: 'Failed to process image with Gemini',
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
