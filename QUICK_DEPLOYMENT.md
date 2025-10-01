# 🚀 Simplified Hostinger VPS Deployment Guide for CodeNova Portfolio

Since you already have Node.js and other dependencies installed, here's a streamlined deployment process.

## 📋 Prerequisites (Already Done ✅)
- Hostinger VPS with Node.js installed
- SSH access to your VPS
- Existing Node.js website running

## 🔧 Quick Deployment Steps

### 1. Connect to Your VPS

```bash
ssh root@your-vps-ip-address
```

### 2. Navigate to Your Project Directory

```bash
# Create a new directory for CodeNova (or use existing)
mkdir -p /root/codenova-portfolio
cd /root/codenova-portfolio
```

### 3. Upload Your Project Files

**Option A: Using Git (Recommended)**
```bash
# If you have Git installed
git clone https://github.com/yourusername/codenova-portfolio.git .
```

**Option B: Using SCP from your local machine**
```bash
# From your local machine terminal
scp -r /Users/mac/Documents/Web\ Dev/CodeNova/* root@your-vps-ip:/root/codenova-portfolio/
```

### 4. Install Dependencies

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

### 5. Build Frontend

```bash
cd /root/codenova-portfolio/frontend
npm run build
```

### 6. Configure Environment Variables

```bash
cd /root/codenova-portfolio/backend
nano .env
```

Add the following content:
```env
PORT=5000
FRONTEND_URL=http://your-vps-ip-address
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
```

### 7. Create PM2 Ecosystem File

```bash
cd /root/codenova-portfolio
nano ecosystem.config.js
```

Add the following content:
```javascript
module.exports = {
  apps: [
    {
      name: 'codenova-backend',
      script: './backend/server.js',
      cwd: '/root/codenova-portfolio',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
```

### 8. Start Backend with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 9. Configure Nginx (If Not Already Done)

```bash
# Check if Nginx is installed
nginx -v

# If not installed, install it
apt install nginx -y
```

Create Nginx configuration:
```bash
nano /etc/nginx/sites-available/codenova
```

Add the following content:
```nginx
server {
    listen 80;
    server_name your-vps-ip-address;

    # Frontend (React build)
    location / {
        root /root/codenova-portfolio/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/codenova /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## 🔍 Check Your Deployment

### 1. Verify PM2 Status
```bash
pm2 status
pm2 logs codenova-backend
```

### 2. Test Backend API
```bash
curl http://localhost:5000/api/health
```

### 3. Check Nginx Status
```bash
systemctl status nginx
```

## 🌐 Access Your Website

Your CodeNova portfolio should now be accessible at:
- **Frontend**: `http://your-vps-ip-address`
- **Backend API**: `http://your-vps-ip-address/api`

## 🔧 Troubleshooting

### If Port 5000 is Already in Use
```bash
# Check what's using port 5000
lsof -i :5000

# Kill the process if needed
kill -9 PID_NUMBER

# Or change port in .env file
nano /root/codenova-portfolio/backend/.env
# Change PORT=5000 to PORT=5001
```

### If PM2 is Not Installed
```bash
npm install -g pm2
```

### If Frontend Not Loading
```bash
# Rebuild frontend
cd /root/codenova-portfolio/frontend
npm run build

# Check if dist folder exists
ls -la dist/
```

### If Email Not Working
```bash
# Check backend logs
pm2 logs codenova-backend

# Test email configuration
cd /root/codenova-portfolio/backend
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'usmanhaiderkhokhar715@gmail.com',
    pass: 'jdqu rbvn irkc bofg'
  }
});
console.log('Email transporter created successfully');
"
```

## 📱 Test Contact Form

1. Go to `http://your-vps-ip-address/contact`
2. Fill out the contact form
3. Submit the form
4. Check your email: `usmanhaiderkhokhar715@gmail.com`

## 🔄 Update Commands

When you make changes to your code:

```bash
# Pull latest changes (if using Git)
cd /root/codenova-portfolio
git pull

# Rebuild frontend
cd frontend
npm run build

# Restart backend
pm2 restart codenova-backend
```

## 🎉 Success!

Your CodeNova portfolio should now be live! 

**Next Steps:**
1. Test all functionality
2. Set up a domain name (optional)
3. Configure SSL certificate (optional)
4. Set up monitoring and backups

---

**Your CodeNova portfolio is now live! 🚀**
