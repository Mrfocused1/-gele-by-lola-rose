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
    const { userImage, geleStyle, geleImageUrl } = await request.json();
    if (!userImage || !geleStyle) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    if (!process.env.GEMINI_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) return NextResponse.json({ error: 'API configuration error' }, { status: 500 });

    const uploadResult = await cloudinary.uploader.upload(userImage, { folder: 'gele-try-on', resource_type: 'image', public_id: `try-on-${Date.now()}` });
    const userImageUrl = uploadResult.secure_url;

    let geleReferenceUrl = geleImageUrl;
    if (geleImageUrl?.startsWith('http://localhost')) {
      const urlPath = geleImageUrl.replace('http://localhost:3002', '');
      const filePath = path.join(process.cwd(), 'public', urlPath);
      const geleUpload = await cloudinary.uploader.upload(filePath, { folder: 'gele-try-on/references', resource_type: 'image' });
      geleReferenceUrl = geleUpload.secure_url;
    }

    const userImageResponse = await fetch(userImageUrl);
    const userImageBuffer = await userImageResponse.arrayBuffer();
    const userImageBase64 = Buffer.from(userImageBuffer).toString('base64');

    const geleImageResponse = await fetch(geleReferenceUrl);
    const geleImageBuffer = await geleImageResponse.arrayBuffer();
    const geleImageBase64 = Buffer.from(geleImageBuffer).toString('base64');

    const geminiRequest = {
      contents: [{
        parts: [
          { inline_data: { mime_type: "image/jpeg", data: userImageBase64 } },
          { inline_data: { mime_type: "image/jpeg", data: geleImageBase64 } },
          { text: `Modify the top half of the first image only. Apply the ${geleStyle} gele from the second image to completely cover and hide all hair. Not even a single hair strand should be visible. Bottom half stays completely unchanged. Total hair coverage is essential.` }
        ]
      }],
      generationConfig: { temperature: 0.4, topK: 32, topP: 1, maxOutputTokens: 4096 }
    };

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiRequest),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return NextResponse.json({ error: 'Gemini API failed', details: errorText }, { status: 500 });
    }

    const geminiResult = await geminiResponse.json();
    const candidate = geminiResult.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find((part: any) => part.inlineData);
    if (!imagePart?.inlineData?.data) return NextResponse.json({ error: 'No image generated', details: geminiResult }, { status: 500 });

    const resultBase64 = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    const resultUpload = await cloudinary.uploader.upload(resultBase64, { folder: 'gele-try-on/results', resource_type: 'image', public_id: `result-${Date.now()}` });

    return NextResponse.json({ resultImage: resultUpload.secure_url, message: 'Variation 9: Top half only' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to process image', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'working', variation: 'Variation 9: Top half only' });
}
