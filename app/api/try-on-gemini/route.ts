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
    // Validate environment variables
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'GEMINI_API_KEY not configured',
        suggestion: 'Add your Gemini API key to .env.local file'
      }, { status: 500 });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ 
        error: 'Cloudinary configuration missing',
        suggestion: 'Add Cloudinary credentials to .env.local file'
      }, { status: 500 });
    }

    const { userImage, mannequinImagePath } = await request.json();

    if (!userImage) {
      return NextResponse.json({ error: 'Missing user image' }, { status: 400 });
    }

    console.log('[GEMINI IMAGE EDITING] Starting virtual try-on...');

    // For testing without Cloudinary, use the base64 image directly
    let userImageUrl;
    if (userImage.startsWith('data:image/')) {
      userImageUrl = userImage;
      console.log('Using base64 image directly for testing');
    } else {
      // Upload user's image to Cloudinary (when credentials are available)
      const uploadResult = await cloudinary.uploader.upload(userImage, {
        folder: 'gele-try-on',
        resource_type: 'image',
        public_id: `try-on-${Date.now()}`,
      });
      userImageUrl = uploadResult.secure_url;
      console.log('User image uploaded:', userImageUrl);
    }

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

    // Use Gemini 2.5 Flash Image (Nano Banana) model
    // This is Google's production image generation model
    console.log('Calling Nano Banana (Gemini 2.5 Flash Image) API...');

    // Use the correct Gemini model endpoint with API key in URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const payload = {
      contents: [{
        parts: [
          {
            text: `Edit this image by adding an elaborate, traditional African gele headwrap. The gele should completely cover all hair with intricate folds and ties. Use the reference gele design shown in the second image. Keep the person's face, expression, and background exactly the same. Only add the headwrap. Make it look natural and realistic.`
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: userImageBase64
            }
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: mannequinBase64
            }
          }
        ]
      }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        temperature: 0.7,
        maxOutputTokens: 8192,
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

    // Enhanced error checking
    if (!result.candidates || result.candidates.length === 0) {
      console.error('No candidates in response:', result);
      return NextResponse.json({
        error: 'No image generated - check your API key and model access',
        details: result,
        suggestion: 'Make sure your GEMINI_API_KEY is valid and you have access to gemini-2.5-flash-image'
      }, { status: 500 });
    }

    const candidate = result.candidates[0];
    
    // Check for safety ratings or blocking
    if (candidate.finishReason === 'SAFETY') {
      console.error('Content blocked by safety filters:', candidate);
      return NextResponse.json({
        error: 'Content was blocked by safety filters',
        details: 'Try with a different image or adjust the prompt',
        finishReason: candidate.finishReason
      }, { status: 400 });
    }

    if (candidate.finishReason === 'RECITATION') {
      console.error('Content blocked for recitation:', candidate);
      return NextResponse.json({
        error: 'Content was blocked for recitation concerns',
        details: 'Try with a different image',
        finishReason: candidate.finishReason
      }, { status: 400 });
    }

    if (!candidate.content || !candidate.content.parts) {
      console.error('No content parts:', candidate);
      return NextResponse.json({
        error: 'No content in Gemini response',
        details: candidate,
        suggestion: 'The model may have failed to generate content'
      }, { status: 500 });
    }

    // Find image part in response
    const imagePart = candidate.content.parts.find((part: any) => part.inlineData);

    if (!imagePart || !imagePart.inlineData || !imagePart.inlineData.data) {
      console.error('No image data in response:', candidate);
      return NextResponse.json({
        error: 'No image data generated by Gemini',
        details: candidate,
        suggestion: 'Try again with a clearer image or different prompt'
      }, { status: 500 });
    }

    const generatedImageBase64 = imagePart.inlineData.data;
    const generatedImageBuffer = Buffer.from(generatedImageBase64, 'base64');
    console.log('Generated image extracted from response');

    // For testing without Cloudinary, return the base64 image directly
    const resultImageUrl = `data:image/jpeg;base64,${generatedImageBase64}`;

    console.log('Success! Generated virtual try-on with Gemini');

    return NextResponse.json({
      resultImage: resultImageUrl,
      message: 'Virtual try-on generated with Google Gemini (testing mode)',
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
