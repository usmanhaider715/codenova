#!/bin/bash

# CodeNova Portfolio - One-Command VPS Deployment
# Repository: https://github.com/usmanhaider715/codenova

echo "🚀 CodeNova Portfolio - VPS Deployment"
echo "Repository: https://github.com/usmanhaider715/codenova"
echo "=========================================="

# Set project directory
PROJECT_DIR="/root/codenova"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Get VPS IP
VPS_IP=$(curl -s ifconfig.me)
echo "🌐 VPS IP: $VPS_IP"

# Remove existing directory if it exists
if [ -d "$PROJECT_DIR" ]; then
    echo "🗑️ Removing existing project directory..."
    rm -rf $PROJECT_DIR
fi

# Clone repository
echo "📥 Cloning repository from GitHub..."
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

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    apt update
    apt install nginx -y
fi

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
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow ssh
ufw --force enable

echo ""
echo "✅ Deployment completed successfully!"
echo "🌐 Your website is now live at: http://$VPS_IP"
echo "📧 Contact form will send emails to: usmanhaiderkhokhar715@gmail.com"
echo "📱 WhatsApp: https://wa.me/923197331383"
echo ""
echo "📊 Application Status:"
pm2 status
echo ""
echo "🎉 CodeNova Portfolio is now live!"
echo ""
echo "📋 Useful Commands:"
echo "  - Check status: pm2 status"
echo "  - View logs: pm2 logs codenova-backend"
echo "  - Restart app: pm2 restart codenova-backend"
echo "  - Update from GitHub: cd $PROJECT_DIR && git pull && cd frontend && npm run build && pm2 restart codenova-backend"
