const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Initialize Gemini
const genAI = new GoogleGenerativeAI('AIzaSyCp-RyOjFLhtoZ_o5XZZcL8oaFbm8DcftM');

// Product list (3-9)
const products = [
  { id: 3, name: "Sapphire Shimmer Gele" },
  { id: 4, name: "Purple Majesty Gele" },
  { id: 5, name: "Bronze Elegance Gele" },
  { id: 6, name: "Rainbow Celebration Gele" },
  { id: 7, name: "Autumn Sunset Gele" },
  { id: 8, name: "Golden Emerald Stripe" },
  { id: 9, name: "Kente Pride Gele" }
];

async function generateImages(productId, productName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎨 Generating images for Product #${productId}: ${productName}`);
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
    console.log('   Mannequin response received');

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
          console.log(`   ✅ Saved mannequin to: ${productSlug}-mannequin.jpg`);
          mannequinSaved = true;
        }
      }
    }

    if (!mannequinSaved) {
      console.log('   ⚠️  Failed to generate mannequin image');
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
    }

    console.log(`\n✨ Completed Product #${productId}`);
    return { mannequinSaved, sideSaved, productSlug };

  } catch (error) {
    console.error(`\n❌ Error generating images for Product #${productId}:`, error.message);
    return { mannequinSaved: false, sideSaved: false, productSlug, error: error.message };
  }
}

async function generateAllImages() {
  console.log('\n🚀 Starting batch image generation for products 3-9');
  console.log('This will take several minutes...\n');

  const results = [];

  for (const product of products) {
    const result = await generateImages(product.id, product.name);
    results.push({ ...product, ...result });

    // Add a small delay between products to avoid rate limiting
    if (product.id < 9) {
      console.log('\n⏳ Waiting 2 seconds before next product...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(60));

  results.forEach(result => {
    const status = result.mannequinSaved && result.sideSaved ? '✅' : '⚠️';
    console.log(`${status} Product #${result.id}: ${result.name}`);
    if (result.mannequinSaved) console.log(`   - ${result.productSlug}-mannequin.jpg`);
    if (result.sideSaved) console.log(`   - ${result.productSlug}-side.jpg`);
    if (result.error) console.log(`   - Error: ${result.error}`);
  });

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Batch generation complete!');
  console.log('='.repeat(60));

  return results;
}

// Run the batch generation
generateAllImages()
  .then(() => {
    console.log('\n✅ All images generated successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Batch generation failed:', error);
    process.exit(1);
  });
