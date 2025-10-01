#!/bin/bash

# CodeNova Portfolio - VPS Fix and Redeploy Script
# This script will clean up existing deployment and redeploy properly

echo "🔧 CodeNova Portfolio - VPS Fix and Redeploy"
echo "==========================================="

# Set project directory
PROJECT_DIR="/root/codenova"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Get VPS IP
VPS_IP=$(curl -s ifconfig.me)
echo "🌐 VPS IP: $VPS_IP"

# Step 1: Stop all existing processes
echo "🛑 Stopping existing processes..."

# Kill all PM2 processes
pm2 kill

# Stop any running Node.js processes
pkill -f "node.*server.js"
pkill -f "nodemon"

# Step 2: Clean up existing deployment
echo "🗑️ Cleaning up existing deployment..."

# Remove existing project directory
if [ -d "$PROJECT_DIR" ]; then
    echo "Removing existing project directory..."
    rm -rf $PROJECT_DIR
fi

# Remove existing Nginx configuration
if [ -f "/etc/nginx/sites-available/codenova" ]; then
    echo "Removing existing Nginx configuration..."
    rm -f /etc/nginx/sites-available/codenova
fi

# Remove Nginx site link
if [ -L "/etc/nginx/sites-enabled/codenova" ]; then
    echo "Removing Nginx site link..."
    rm -f /etc/nginx/sites-enabled/codenova
fi

# Step 3: Clone fresh repository
echo "📥 Cloning fresh repository from GitHub..."
git clone https://github.com/usmanhaider715/codenova.git $PROJECT_DIR

if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Failed to clone repository."
    exit 1
fi

cd $PROJECT_DIR

# Step 4: Install dependencies
echo "📦 Installing dependencies..."
npm install
cd $BACKEND_DIR && npm install
cd $FRONTEND_DIR && npm install

# Step 5: Build frontend
echo "🔨 Building frontend..."
npm run build

# Step 6: Create environment file
echo "⚙️ Creating environment file..."
cat > $BACKEND_DIR/.env << EOF
PORT=3001
FRONTEND_URL=http://$VPS_IP
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
EOF

# Step 7: Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Step 8: Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Step 9: Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    apt update
    apt install nginx -y
fi

# Step 10: Create Nginx configuration
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

# Step 11: Enable site
ln -sf /etc/nginx/sites-available/codenova /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Step 12: Test and reload Nginx
echo "🧪 Testing Nginx configuration..."
nginx -t
if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    systemctl reload nginx
else
    echo "❌ Nginx configuration has errors"
    exit 1
fi

# Step 13: Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow ssh
ufw --force enable

# Step 14: Final checks
echo "🔍 Final checks..."

# Check PM2 status
echo "📊 PM2 Status:"
pm2 status

# Check if backend is responding
echo "🧪 Testing backend API..."
sleep 5
curl -s http://localhost:3001/api/health

# Check Nginx status
echo "🌐 Nginx Status:"
systemctl status nginx --no-pager

echo ""
echo "✅ Fix and redeploy completed!"
echo "🌐 Your website should now be live at: http://$VPS_IP"
echo "📧 Contact form will send emails to: usmanhaiderkhokhar715@gmail.com"
echo "📱 WhatsApp: https://wa.me/923197331383"
echo ""
echo "📋 Useful Commands:"
echo "  - Check status: pm2 status"
echo "  - View logs: pm2 logs codenova-backend"
echo "  - Restart app: pm2 restart codenova-backend"
echo "  - Check Nginx: systemctl status nginx"
