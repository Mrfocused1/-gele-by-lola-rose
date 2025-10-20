const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Initialize Gemini
const genAI = new GoogleGenerativeAI('AIzaSyCp-RyOjFLhtoZ_o5XZZcL8oaFbm8DcftM');

async function generateSideImage() {
  console.log('\n🎨 Generating side perspective for Midnight Garden Gele');
  console.log('='.repeat(60));

  // Paths
  const inputImagePath = path.join(__dirname, '../public/images/mannequins/midnight-garden-gele-mannequin.png');
  const outputDir = path.join(__dirname, '../public/images/products');
  const productSlug = 'midnight-garden-gele';

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
      mimeType: 'image/png'
    }
  };

  try {
    // Generate side perspective shot
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
    console.log('   Side view response received');

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
          console.log(`   ✅ Saved side view to: ${productSlug}-side.jpg`);
          sideSaved = true;
        }
      }
    }

    if (!sideSaved) {
      console.log('   ⚠️  Failed to generate side view image');
      console.log('Response structure:', JSON.stringify(sideResponse, null, 2));
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ Image generation complete!');
    if (sideSaved) {
      console.log(`\nGenerated: ${productSlug}-side.jpg`);
    }
    console.log('='.repeat(60));

    return sideSaved;

  } catch (error) {
    console.error('\n❌ Error generating image:', error.message);
    throw error;
  }
}

// Run the generation
generateSideImage()
  .then((success) => {
    if (success) {
      console.log('\n✅ Side perspective image generated successfully!');
    } else {
      console.log('\n⚠️  Image generation completed with warnings');
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Generation failed:', error);
    process.exit(1);
  });
