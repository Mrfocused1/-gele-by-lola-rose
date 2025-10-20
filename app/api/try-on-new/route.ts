import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { userImage, geleStyle, mannequinImagePath } = await request.json();

    if (!userImage) {
      return NextResponse.json({ error: 'Missing user image' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    console.log('[NEW APPROACH] Dynamic portrait generation with mannequin reference...');

    // Upload user's image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(userImage, {
      folder: 'gele-try-on',
      resource_type: 'image',
      public_id: `try-on-${Date.now()}`,
    });
    const userImageUrl = uploadResult.secure_url;

    // Upload mannequin reference image
    const mannequinPath = path.join(process.cwd(), 'public', mannequinImagePath || '/images/mannequins/test-gele-mannequin.jpg');
    console.log('Loading mannequin from:', mannequinPath);

    const mannequinUpload = await cloudinary.uploader.upload(mannequinPath, {
      folder: 'gele-try-on/mannequins',
      resource_type: 'image',
    });
    const mannequinImageUrl = mannequinUpload.secure_url;

    try {
      // Fetch and convert both images to base64
      const userImageResponse = await fetch(userImageUrl);
      const userImageBuffer = await userImageResponse.arrayBuffer();
      const userImageBase64 = Buffer.from(userImageBuffer).toString('base64');

      const mannequinImageResponse = await fetch(mannequinImageUrl);
      const mannequinImageBuffer = await mannequinImageResponse.arrayBuffer();
      const mannequinImageBase64 = Buffer.from(mannequinImageBuffer).toString('base64');

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`;

      // Dynamic prompt generation
      const promptText = `Analyze the first image (the person's photo) and create a close-up portrait that matches their characteristics exactly:

ANALYZE FROM FIRST IMAGE:
- Skin tone (light, medium, brown, dark, etc.)
- Ethnicity and facial features
- Face shape and structure
- Background style (studio, outdoor, home, etc.)
- Lighting style (soft, bright, natural, etc.)
- Photo angle and composition

COPY FROM SECOND IMAGE (MANNEQUIN):
- The exact gele headwrap style, colors, and patterns
- How the gele is wrapped and positioned
- All the intricate details of the fabric

CRITICAL REQUIREMENTS:
- ZERO hair visible - the gele MUST completely cover ALL hair from root to tip
- The gele wraps around the entire head covering every strand of hair
- NO curls, NO edges, NO hairline visible
- The gele fabric extends down to cover where hair would normally show
- Treat this as if the person has their hair completely tucked inside the gele wrap

CREATE:
A professional close-up portrait photograph of a person wearing the gele from the second image, matching ALL characteristics from the first image. ABSOLUTELY NO HAIR VISIBLE ANYWHERE - the gele completely covers the entire head and all hair. The person's skin tone, facial features, ethnicity, background style, and lighting should match the first image exactly. High detail, photorealistic, professional photography.`;

      const geminiRequest = {
        contents: [{
          parts: [
            { inline_data: { mime_type: "image/jpeg", data: userImageBase64 } },
            { inline_data: { mime_type: "image/jpeg", data: mannequinImageBase64 } },
            { text: promptText }
          ]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 4096,
        }
      };

      console.log('Sending request to Gemini with dynamic prompt...');
      const geminiResponse = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiRequest),
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error('Gemini API error:', errorText);
        return NextResponse.json({ error: 'Gemini API failed', details: errorText }, { status: 500 });
      }

      const geminiResult = await geminiResponse.json();
      const candidate = geminiResult.candidates?.[0];
      const imagePart = candidate?.content?.parts?.find((part: any) => part.inlineData);

      if (!imagePart?.inlineData?.data) {
        console.error('No image in Gemini response');
        return NextResponse.json({ error: 'No image generated', details: geminiResult }, { status: 500 });
      }

      // Upload result to Cloudinary
      const resultBase64 = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
      const resultUpload = await cloudinary.uploader.upload(resultBase64, {
        folder: 'gele-try-on/results',
        resource_type: 'image',
        public_id: `result-${Date.now()}`,
      });

      console.log('Success! Generated portrait with mannequin reference');

      return NextResponse.json({
        resultImage: resultUpload.secure_url,
        message: 'Portrait generated with dynamic characteristics matching',
      });

    } catch (geminiError: any) {
      console.error('Gemini API error:', geminiError);
      return NextResponse.json({ error: 'Failed to generate portrait', details: geminiError.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Try-on API error:', error);
    return NextResponse.json({ error: 'Failed to process image', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'API route is working',
    approach: 'NEW: Dynamic portrait generation with mannequin reference',
  });
}
