#!/bin/bash

# Favicon Generator Script for CodeNova
# This script generates different favicon sizes from your favicon.png

echo "🎨 Generating Favicons for CodeNova..."

# Check if favicon.png exists in frontend/public/
if [ ! -f "frontend/public/favicon.png" ]; then
    echo "❌ favicon.png not found in frontend/public/"
    echo "Please copy your favicon.png to frontend/public/ first"
    exit 1
fi

# Create favicon directory
mkdir -p frontend/public/favicons

# Generate different sizes using ImageMagick (if available)
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found. Generating multiple favicon sizes..."
    
    # Generate different sizes
    convert frontend/public/favicon.png -resize 16x16 frontend/public/favicons/favicon-16x16.png
    convert frontend/public/favicon.png -resize 32x32 frontend/public/favicons/favicon-32x32.png
    convert frontend/public/favicon.png -resize 48x48 frontend/public/favicons/favicon-48x48.png
    convert frontend/public/favicon.png -resize 96x96 frontend/public/favicons/favicon-96x96.png
    convert frontend/public/favicon.png -resize 144x144 frontend/public/favicons/favicon-144x144.png
    convert frontend/public/favicon.png -resize 192x192 frontend/public/favicons/favicon-192x192.png
    convert frontend/public/favicon.png -resize 512x512 frontend/public/favicons/favicon-512x512.png
    
    # Generate ICO file
    convert frontend/public/favicon.png frontend/public/favicon.ico
    
    echo "✅ Generated all favicon sizes!"
    
else
    echo "⚠️  ImageMagick not found. Using original favicon.png only."
    echo "To generate multiple sizes, install ImageMagick: brew install imagemagick (Mac) or apt install imagemagick (Linux)"
fi

echo "🚀 Favicon setup complete!"
echo "📝 Don't forget to rebuild your frontend: npm run build"
