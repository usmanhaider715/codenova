# 🚀 CodeNova Portfolio - VPS Deployment Guide

**Repository**: https://github.com/usmanhaider715/codenova  
**Your GitHub**: usmanhaider715

## 📋 Quick VPS Deployment Steps

### Step 1: Connect to Your VPS
```bash
ssh root@your-vps-ip-address
```

### Step 2: Clone Your Repository
```bash
# Navigate to root directory
cd /root

# Clone your repository
git clone https://github.com/usmanhaider715/codenova.git

# Navigate to project directory
cd codenova
```

### Step 3: Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 4: Build Frontend
```bash
# Build the React application
npm run build
```

### Step 5: Create Environment File
```bash
# Navigate to backend directory
cd ../backend

# Create environment file
cat > .env << EOF
PORT=3001
FRONTEND_URL=http://your-vps-ip-address
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
EOF
```

### Step 6: Install PM2 (if not already installed)
```bash
npm install -g pm2
```

### Step 7: Start Application with PM2
```bash
# Navigate to project root
cd /root/codenova

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Step 8: Configure Nginx
```bash
# Create Nginx configuration
cat > /etc/nginx/sites-available/codenova << EOF
server {
    listen 80;
    server_name your-vps-ip-address;

    # Frontend (React build)
    location / {
        root /root/codenova/frontend/dist;
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

# Enable the site
ln -s /etc/nginx/sites-available/codenova /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

### Step 9: Configure Firewall
```bash
# Allow HTTP and HTTPS traffic
ufw allow 'Nginx Full'
ufw allow ssh
ufw --force enable
```

## 🎉 Test Your Deployment

### Check Application Status
```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs codenova-backend

# Check Nginx status
systemctl status nginx
```

### Test Your Website
1. Open your browser
2. Go to `http://your-vps-ip-address`
3. Test the contact form at `http://your-vps-ip-address/contact`
4. Check your email for the form submission

## 🔄 Future Updates

When you make changes to your code:

```bash
# On your local machine
git add .
git commit -m "Update: description of changes"
git push origin main

# On your VPS
cd /root/codenova
git pull origin main
cd frontend
npm run build
pm2 restart codenova-backend
```

## 📊 Useful Commands

### Check Status
```bash
pm2 status
pm2 logs codenova-backend
systemctl status nginx
```

### Restart Services
```bash
pm2 restart codenova-backend
systemctl restart nginx
```

### Update from GitHub
```bash
cd /root/codenova
git pull origin main
cd frontend && npm run build
pm2 restart codenova-backend
```

## 🎯 Your Website Will Be Live At:
- **Frontend**: `http://your-vps-ip-address`
- **Contact Form**: `http://your-vps-ip-address/contact`
- **WhatsApp**: `https://wa.me/923197331383`

## 📧 Email Integration:
- Contact form submissions will be sent to: `usmanhaiderkhokhar715@gmail.com`
- Using your Gmail App Password: `jdqu rbvn irkc bofg`

---

**Your CodeNova portfolio is ready to go live! 🚀**
