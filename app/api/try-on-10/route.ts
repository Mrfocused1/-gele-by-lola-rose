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
          { text: `Edit the crown and hair area of the first image (everything above the forehead). The ${geleStyle} gele from the second image must provide 100% hair coverage - absolutely zero hair visible. Forehead, face, and everything below must remain pixel-perfect identical to original.` }
        ]
      }],
      generationConfig: { temperature: 0.4, topK: 32, topP: 1, maxOutputTokens: 4096 }
    };

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${process.env.GEMINI_API_KEY}`, {
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

    return NextResponse.json({ resultImage: resultUpload.secure_url, message: 'Variation 10: Crown and hair area' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to process image', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'working', variation: 'Variation 10: Crown and hair area' });
}
