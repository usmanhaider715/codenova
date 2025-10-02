#!/bin/bash

# 🚀 Update Frontend on VPS
echo "🔄 Updating CodeNova Frontend on VPS..."

# Build the frontend locally
echo "📦 Building frontend..."
cd frontend
npm run build

# Copy the built files to VPS
echo "📤 Uploading to VPS..."
scp -r dist/* root@72.60.181.84:/var/www/codenova/

echo "✅ Frontend updated successfully!"
echo "🌐 Test your website: http://72.60.181.84"
