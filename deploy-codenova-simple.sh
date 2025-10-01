#!/bin/bash

# CodeNova Portfolio - Simple Deployment Script
# This script deploys CodeNova to your VPS on port 3001

echo "🚀 CodeNova Portfolio - Simple Deployment"
echo "========================================"

# Set variables
PROJECT_DIR="/root/websites/codenova"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
VPS_IP=$(curl -s ifconfig.me)

echo "🌐 VPS IP: $VPS_IP"

# Create websites directory
mkdir -p /root/websites

# Remove existing directory if it exists
if [ -d "$PROJECT_DIR" ]; then
    echo "🗑️ Removing existing CodeNova directory..."
    rm -rf $PROJECT_DIR
fi

# Clone repository
echo "📥 Cloning CodeNova repository..."
git clone https://github.com/usmanhaider715/codenova.git $PROJECT_DIR

if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Failed to clone repository."
    exit 1
fi

cd $PROJECT_DIR

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd $BACKEND_DIR && npm install
cd $FRONTEND_DIR && npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Create environment file
echo "⚙️ Creating environment file..."
cat > $BACKEND_DIR/.env << EOF
PORT=3001
FRONTEND_URL=http://$VPS_IP
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
EOF

# Create PM2 ecosystem file
echo "🔧 Creating PM2 configuration..."
cat > $PROJECT_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'codenova',
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
echo "🚀 Starting CodeNova with PM2..."
pm2 start $PROJECT_DIR/ecosystem.config.js
pm2 save

# Create Nginx configuration
echo "🌐 Configuring Nginx..."
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

# Test and reload Nginx
nginx -t && systemctl reload nginx

echo ""
echo "✅ CodeNova deployment completed!"
echo "🌐 Your website is live at: http://$VPS_IP"
echo "📧 Contact form will send emails to: usmanhaiderkhokhar715@gmail.com"
echo "📱 WhatsApp: https://wa.me/923197331383"
echo ""
echo "📊 Status:"
pm2 status
echo ""
echo "📋 Useful Commands:"
echo "  - Check status: pm2 status"
echo "  - View logs: pm2 logs codenova"
echo "  - Restart: pm2 restart codenova"
echo "  - Update: cd $PROJECT_DIR && git pull && cd frontend && npm run build && pm2 restart codenova"
