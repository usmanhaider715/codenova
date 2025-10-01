# 🚀 Complete GitHub & Hostinger VPS Deployment Guide

This guide will walk you through creating a GitHub repository, pushing your CodeNova portfolio, and deploying it to your Hostinger VPS.

## 📋 Prerequisites

- GitHub account
- Hostinger VPS with Node.js already installed
- SSH access to your VPS
- Git installed on your local machine

## 🔧 Step 1: Create GitHub Repository

### 1.1 Create New Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `codenova-portfolio`
   - **Description**: `Professional portfolio website for CodeNova software development agency`
   - **Visibility**: Public (or Private if you prefer)
   - **Initialize**: Don't check any boxes (we'll push existing code)
5. Click **"Create repository"**

### 1.2 Copy Repository URL
After creating the repository, copy the HTTPS URL (it will look like):
```
https://github.com/yourusername/codenova-portfolio.git
```

## 🔧 Step 2: Initialize Git and Push to GitHub

### 2.1 Initialize Git Repository
```bash
# Navigate to your project directory
cd /Users/mac/Documents/Web\ Dev/CodeNova

# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: CodeNova portfolio website"
```

### 2.2 Connect to GitHub Repository
```bash
# Add remote origin (replace with your actual GitHub URL)
git remote add origin https://github.com/yourusername/codenova-portfolio.git

# Push to GitHub
git push -u origin main
```

### 2.3 Verify Upload
- Go to your GitHub repository
- You should see all your project files uploaded
- The repository should show your commit message

## 🔧 Step 3: Deploy to Hostinger VPS

### 3.1 Connect to Your VPS
```bash
ssh root@your-vps-ip-address
```

### 3.2 Clone Repository on VPS
```bash
# Navigate to root directory
cd /root

# Clone your repository
git clone https://github.com/yourusername/codenova-portfolio.git

# Navigate to project directory
cd codenova-portfolio
```

### 3.3 Install Dependencies
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

### 3.4 Build Frontend
```bash
# Build the React application
npm run build
```

### 3.5 Create Environment File
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

### 3.6 Install PM2 (if not already installed)
```bash
npm install -g pm2
```

### 3.7 Start Application with PM2
```bash
# Navigate to project root
cd /root/codenova-portfolio

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 3.8 Configure Nginx
```bash
# Create Nginx configuration
cat > /etc/nginx/sites-available/codenova << EOF
server {
    listen 80;
    server_name your-vps-ip-address;

    # Frontend (React build)
    location / {
        root /root/codenova-portfolio/frontend/dist;
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

### 3.9 Configure Firewall
```bash
# Allow HTTP and HTTPS traffic
ufw allow 'Nginx Full'
ufw allow ssh
ufw --force enable
```

## 🔧 Step 4: Test Your Deployment

### 4.1 Check Application Status
```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs codenova-backend

# Check Nginx status
systemctl status nginx
```

### 4.2 Test Your Website
1. Open your browser
2. Go to `http://your-vps-ip-address`
3. Test the contact form at `http://your-vps-ip-address/contact`
4. Check your email for the form submission

## 🔧 Step 5: Optional - Setup Domain and SSL

### 5.1 Point Domain to VPS (if you have a domain)
1. Go to your domain registrar
2. Update DNS A record to point to your VPS IP
3. Update Nginx configuration with your domain name

### 5.2 Install SSL Certificate
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d your-domain.com
```

## 🔧 Step 6: Future Updates

### 6.1 Update Your Website
When you make changes to your code:

```bash
# On your local machine
git add .
git commit -m "Update: description of changes"
git push origin main

# On your VPS
cd /root/codenova-portfolio
git pull origin main
cd frontend
npm run build
pm2 restart codenova-backend
```

## 🔧 Step 7: Automated Deployment Script

I've created an automated deployment script. You can use it:

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

## 📊 Monitoring Commands

### Check Application Status
```bash
# PM2 status
pm2 status

# PM2 logs
pm2 logs codenova-backend

# System resources
htop

# Disk usage
df -h

# Nginx status
systemctl status nginx
```

### Restart Services
```bash
# Restart backend
pm2 restart codenova-backend

# Restart Nginx
systemctl restart nginx

# Restart everything
pm2 restart all
```

## 🎉 Success!

Your CodeNova portfolio should now be live at:
- **Frontend**: `http://your-vps-ip-address`
- **Contact Form**: `http://your-vps-ip-address/contact`
- **WhatsApp**: `https://wa.me/923197331383`

## 🔍 Troubleshooting

### Common Issues:

1. **Port 3001 not accessible**
   ```bash
   ufw allow 3001
   ```

2. **Nginx 502 Bad Gateway**
   ```bash
   pm2 status
   pm2 logs codenova-backend
   ```

3. **Frontend not loading**
   ```bash
   ls -la /root/codenova-portfolio/frontend/dist/
   cd /root/codenova-portfolio/frontend && npm run build
   ```

4. **Email not working**
   ```bash
   pm2 logs codenova-backend
   # Check for email authentication errors
   ```

---

**Your CodeNova portfolio is now live on GitHub and your VPS! 🚀**
