import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { userImage, geleStyle, geleImageUrl } = await request.json();

    // Validate inputs
    if (!userImage || !geleStyle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing Gemini API configuration');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary configuration');
      return NextResponse.json(
        { error: 'Image upload configuration error' },
        { status: 500 }
      );
    }

    console.log('Starting virtual try-on with Google Gemini...');

    // Step 1: Upload user's image to Cloudinary to get a public URL
    console.log('Uploading user photo to Cloudinary...');
    const uploadResult = await cloudinary.uploader.upload(userImage, {
      folder: 'gele-try-on',
      resource_type: 'image',
      public_id: `try-on-${Date.now()}`,
    });

    const userImageUrl = uploadResult.secure_url;
    console.log('User photo uploaded:', userImageUrl);

    // Step 2: Upload gele reference image to Cloudinary if needed
    let geleReferenceUrl = geleImageUrl;
    if (geleImageUrl && geleImageUrl.startsWith('http://localhost')) {
      console.log('Uploading gele reference to Cloudinary...');
      // Convert localhost URL to filesystem path
      const urlPath = geleImageUrl.replace('http://localhost:3002', '');
      const filePath = path.join(process.cwd(), 'public', urlPath);
      console.log('Reading gele image from:', filePath);

      const geleUpload = await cloudinary.uploader.upload(filePath, {
        folder: 'gele-try-on/references',
        resource_type: 'image',
      });
      geleReferenceUrl = geleUpload.secure_url;
      console.log('Gele reference uploaded:', geleReferenceUrl);
    }

    // Step 3: Create optimized prompt for Replicate
    // Enhanced prompt with specific color details for Royal Burgundy & Gold Gele
    const colorDetails = geleStyle.includes('Burgundy')
      ? 'with horizontal stripes in burnt orange (#CC5500), terracotta, burgundy red, and maroon colors blended together, plus metallic gold (#FFD700) threading'
      : '';

    const prompt = `Portrait of a woman wearing ${geleStyle} African gele headwrap ${colorDetails}. The gele COMPLETELY covers all hair - no hair visible at all. The face, skin tone, and background must remain exactly the same as the original photo. Professional headshot, photorealistic, high quality, detailed fabric texture`;

    console.log('Using prompt:', prompt);
    console.log('Gele reference uploaded:', geleReferenceUrl || 'none');

    // Step 4: Call Google Gemini API directly
    console.log('Calling Google Gemini API (Nano Banana)...');

    try {
      // Fetch images and convert to base64
      console.log('Fetching user image from Cloudinary...');
      const userImageResponse = await fetch(userImageUrl);
      const userImageBuffer = await userImageResponse.arrayBuffer();
      const userImageBase64 = Buffer.from(userImageBuffer).toString('base64');

      console.log('Fetching gele reference image from Cloudinary...');
      const geleImageResponse = await fetch(geleReferenceUrl);
      const geleImageBuffer = await geleImageResponse.arrayBuffer();
      const geleImageBase64 = Buffer.from(geleImageBuffer).toString('base64');

      // Create Gemini API request
      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${process.env.GEMINI_API_KEY}`;

      const geminiRequest = {
        contents: [{
          parts: [
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: userImageBase64
              }
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: geleImageBase64
              }
            },
            {
              text: `Edit this image: Add the ${geleStyle} African gele headwrap from the reference image to the person in the first image. The gele must COMPLETELY cover all hair - no hair should be visible at all. Match the EXACT colors and pattern from the reference image. CRITICAL: Keep the person's face, facial features, skin tone, expression, and background EXACTLY the same as in the original photo - do not change the person's identity or appearance in any way. Only add the gele headwrap. Professional photo, photorealistic, high quality.`
            }
          ]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 4096,
        }
      };

      console.log('Sending request to Gemini API...');
      const geminiResponse = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(geminiRequest),
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error('Gemini API error:', errorText);
        return NextResponse.json(
          { error: 'Gemini API request failed', details: errorText },
          { status: 500 }
        );
      }

      const geminiResult = await geminiResponse.json();
      console.log('Gemini API response received');
      console.log('Full Gemini response:', JSON.stringify(geminiResult, null, 2));

      // Extract image from response
      const candidate = geminiResult.candidates?.[0];
      const imagePart = candidate?.content?.parts?.find((part: any) => part.inlineData);

      if (!imagePart || !imagePart.inlineData?.data) {
        console.error('No image in Gemini response');
        return NextResponse.json(
          { error: 'No image generated by Gemini', details: geminiResult },
          { status: 500 }
        );
      }

      // Upload result to Cloudinary
      console.log('Uploading result to Cloudinary...');
      const resultBase64 = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
      const resultUpload = await cloudinary.uploader.upload(resultBase64, {
        folder: 'gele-try-on/results',
        resource_type: 'image',
        public_id: `result-${Date.now()}`,
      });

      const resultImageUrl = resultUpload.secure_url;
      console.log('Success! Result image:', resultImageUrl);

      return NextResponse.json({
        resultImage: resultImageUrl,
        message: 'Virtual try-on completed with Google Gemini (Nano Banana)',
      });

    } catch (geminiError: any) {
      console.error('Gemini API error:', geminiError);
      return NextResponse.json(
        { error: 'Failed to generate image with Gemini', details: geminiError.message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Try-on API error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'API route is working',
    note: 'Use POST method to submit try-on requests',
  });
}