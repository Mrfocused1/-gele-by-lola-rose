const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Initialize Gemini
const genAI = new GoogleGenerativeAI('AIzaSyCp-RyOjFLhtoZ_o5XZZcL8oaFbm8DcftM');

async function generateImages(productId, productName) {
  console.log(`\n🎨 Generating images for Product #${productId}: ${productName}`);
  console.log('='.repeat(60));

  // Paths
  const inputImagePath = path.join(__dirname, `../public/images/mannequins/gele-${productId}-mannequin.jpg`);
  const outputDir = path.join(__dirname, '../public/images/products');
  const productSlug = productName.toLowerCase().replace(/\s+/g, '-');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read input image
  console.log(`\n📖 Reading input image: ${inputImagePath}`);
  const imageBuffer = fs.readFileSync(inputImagePath);
  const base64Image = imageBuffer.toString('base64');

  // Prepare image for Gemini
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: 'image/jpeg'
    }
  };

  try {
    // 1. Generate glass mannequin image
    console.log('\n🔮 Generating glass mannequin image...');
    const mannequinPrompt = `Change the subject of the image from the woman to a transparent glass mannequin head with a metallic black face, while keeping the gele headscarf exactly the same in terms of pattern, color, and how it is tied. The background should be white, and the lighting should remain soft studio lighting. Maintain the close-up perspective and high detail.`;

    const mannequinModel = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-image'
    });

    const mannequinResult = await mannequinModel.generateContent([
      mannequinPrompt,
      imagePart
    ]);

    const mannequinResponse = mannequinResult.response;
    console.log('Mannequin response received');

    // Extract image from response structure
    let mannequinSaved = false;
    if (mannequinResponse.candidates && mannequinResponse.candidates.length > 0) {
      const candidate = mannequinResponse.candidates[0];
      if (candidate.content && candidate.content.parts) {
        const imagePart = candidate.content.parts.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
          const mannequinImageBase64 = imagePart.inlineData.data;
          const mannequinImageBuffer = Buffer.from(mannequinImageBase64, 'base64');
          const mannequinOutputPath = path.join(outputDir, `${productSlug}-mannequin.jpg`);
          fs.writeFileSync(mannequinOutputPath, mannequinImageBuffer);
          console.log(`✅ Saved mannequin to: ${mannequinOutputPath}`);
          mannequinSaved = true;
        }
      }
    }

    if (!mannequinSaved) {
      console.log('⚠️  Failed to generate mannequin image');
      console.log('Response structure:', JSON.stringify(mannequinResponse, null, 2));
    }

    // 2. Generate side perspective shot
    console.log('\n👤 Generating side perspective image...');
    const sidePrompt = `Create a side profile view (45-degree angle) of an elegant African woman wearing this exact gele headwrap with the same pattern, colors, and style. The woman should have a graceful pose, looking slightly to the side. She should be wearing elegant makeup and the gele should be prominently displayed. The background should be a soft, neutral gradient (cream to white). Studio lighting with soft shadows. Professional fashion photography style. High detail and photorealistic.`;

    const sideModel = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-image'
    });

    const sideResult = await sideModel.generateContent([
      sidePrompt,
      imagePart
    ]);

    const sideResponse = sideResult.response;
    console.log('Side view response received');

    // Extract image from response structure
    let sideSaved = false;
    if (sideResponse.candidates && sideResponse.candidates.length > 0) {
      const candidate = sideResponse.candidates[0];
      if (candidate.content && candidate.content.parts) {
        const imagePart = candidate.content.parts.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
          const sideImageBase64 = imagePart.inlineData.data;
          const sideImageBuffer = Buffer.from(sideImageBase64, 'base64');
          const sideOutputPath = path.join(outputDir, `${productSlug}-side.jpg`);
          fs.writeFileSync(sideOutputPath, sideImageBuffer);
          console.log(`✅ Saved side view to: ${sideOutputPath}`);
          sideSaved = true;
        }
      }
    }

    if (!sideSaved) {
      console.log('⚠️  Failed to generate side view image');
      console.log('Response structure:', JSON.stringify(sideResponse, null, 2));
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ Image generation complete!');
    console.log('\nGenerated files:');
    if (mannequinSaved) console.log(`  - ${productSlug}-mannequin.jpg`);
    if (sideSaved) console.log(`  - ${productSlug}-side.jpg`);
    console.log('\nMain image (front view woman):');
    console.log(`  - Use existing: /images/mannequins/gele-${productId}-mannequin.jpg`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ Error generating images:', error);
    throw error;
  }
}

// Run for Product #2 (Royal Heritage Wrap)
generateImages(2, 'Royal Heritage Wrap')
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
