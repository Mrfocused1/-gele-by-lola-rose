#!/bin/bash

# Gele By Lola Rose - One-Click Setup Script
echo "========================================="
echo "🌸 Gele By Lola Rose Setup Script"
echo "========================================="
echo ""

# Step 1: Fix npm permissions
echo "Step 1: Fixing npm permissions..."
echo "You'll need to enter your Mac password when prompted:"
sudo chown -R $(whoami) ~/.npm

# Step 2: Install dependencies
echo ""
echo "Step 2: Installing project dependencies..."
echo "This may take a few minutes..."
npm install

# Step 3: Start the development server
echo ""
echo "Step 3: Starting the development server..."
echo ""
echo "========================================="
echo "✅ Setup complete!"
echo "🌐 Opening http://localhost:3000 in your browser..."
echo "========================================="
echo ""
echo "Press Ctrl+C to stop the server when you're done."
echo ""

# Open browser
open http://localhost:3000

# Start the server
npm run dev