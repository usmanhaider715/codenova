#!/bin/bash

# CodeNova Portfolio Deployment Script for Hostinger VPS
# Run this script on your VPS after uploading the project files

echo "🚀 Starting CodeNova Portfolio Deployment..."

# Set project directory
PROJECT_DIR="/root/codenova-portfolio"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Project directory not found. Please upload your project files first."
    exit 1
fi

echo "📁 Project directory found: $PROJECT_DIR"

# Install dependencies
echo "📦 Installing dependencies..."
cd $PROJECT_DIR
npm install

cd $BACKEND_DIR
npm install

cd $FRONTEND_DIR
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Create environment file
echo "⚙️ Creating environment file..."
cat > $BACKEND_DIR/.env << EOF
PORT=3001
FRONTEND_URL=http://$(curl -s ifconfig.me)
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
EOF

echo "✅ Environment file created"

# Create PM2 ecosystem file
echo "🔧 Creating PM2 configuration..."
cat > $PROJECT_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'codenova-backend',
      script: './backend/server.js',
      cwd: '$PROJECT_DIR',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
EOF

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start $PROJECT_DIR/ecosystem.config.js
pm2 save
pm2 startup

# Create Nginx configuration
echo "🌐 Configuring Nginx..."
VPS_IP=$(curl -s ifconfig.me)

cat > /etc/nginx/sites-available/codenova << EOF
server {
    listen 80;
    server_name $VPS_IP;

    # Frontend (React build)
    location / {
        root $FRONTEND_DIR/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/codenova /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx

echo "✅ Deployment completed!"
echo "🌐 Your website should be accessible at: http://$VPS_IP"
echo "📧 Contact form will send emails to: usmanhaiderkhokhar715@gmail.com"
echo "📱 WhatsApp: https://wa.me/923197331383"

# Show status
echo "📊 Application Status:"
pm2 status

echo "🎉 CodeNova Portfolio is now live!"
