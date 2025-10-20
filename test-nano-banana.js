#!/usr/bin/env node

/**
 * Test script for Nano Banana (Gemini) API integration
 * Run with: node test-nano-banana.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testNanoBanana() {
  console.log('🍌 Testing Nano Banana (Gemini) Integration...\n');

  // Check environment variables
  console.log('📋 Checking configuration:');
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
  
  console.log(`   Gemini API Key: ${hasGeminiKey ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   Cloudinary: ${hasCloudinary ? '✅ Configured' : '❌ Missing'}\n`);

  if (!hasGeminiKey) {
    console.log('❌ ERROR: GEMINI_API_KEY not found in .env.local');
    console.log('   Please add your Gemini API key to .env.local file\n');
    return;
  }

  if (!hasCloudinary) {
    console.log('❌ ERROR: Cloudinary credentials not found in .env.local');
    console.log('   Please add Cloudinary credentials to .env.local file\n');
    return;
  }

  // Test API endpoint
  console.log('🔗 Testing Gemini API endpoint...');
  
  const testPayload = {
    contents: [{
      parts: [{
        text: 'Generate a simple test image of a red circle on white background'
      }]
    }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      temperature: 0.7
    }
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Gemini API is working!');
      console.log(`   Response status: ${response.status}`);
      console.log(`   Has candidates: ${!!result.candidates}`);
      
      if (result.candidates && result.candidates.length > 0) {
        const candidate = result.candidates[0];
        console.log(`   Finish reason: ${candidate.finishReason || 'N/A'}`);
        
        if (candidate.content && candidate.content.parts) {
          const imagePart = candidate.content.parts.find(part => part.inlineData);
          console.log(`   Generated image: ${!!imagePart ? '✅ Yes' : '❌ No'}`);
        }
      }
    } else {
      console.log('❌ Gemini API error:');
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${JSON.stringify(result, null, 2)}`);
    }

  } catch (error) {
    console.log('❌ Network error:', error.message);
  }

  console.log('\n🎯 Next steps:');
  console.log('   1. Make sure your .env.local file has all required keys');
  console.log('   2. Run your Next.js app: npm run dev');
  console.log('   3. Test the virtual try-on feature in your browser');
  console.log('   4. Check the browser console and terminal for any errors\n');
}

// Check if dotenv is available
try {
  require('dotenv');
  testNanoBanana();
} catch (error) {
  console.log('📦 Installing dotenv for environment variable loading...');
  console.log('   Run: npm install dotenv');
  console.log('   Then run this script again\n');
  
  // Run without dotenv
  testNanoBanana();
}
