# 🚀 Hostinger VPS Deployment Guide for CodeNova Portfolio

This guide will help you deploy your CodeNova portfolio website to Hostinger VPS.

## 📋 Prerequisites

- Hostinger VPS account
- Domain name (optional, can use IP address)
- SSH access to your VPS
- Basic knowledge of Linux commands

## 🔧 VPS Setup

### 1. Connect to Your VPS

```bash
ssh root@your-vps-ip-address
```

### 2. Update System Packages

```bash
apt update && apt upgrade -y
```

### 3. Install Node.js and npm

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 4. Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### 5. Install Nginx (Web Server)

```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

## 📁 Project Deployment

### 1. Upload Your Project

**Option A: Using Git (Recommended)**
```bash
# Install Git
apt install git -y

# Clone your repository
git clone https://github.com/yourusername/codenova-portfolio.git
cd codenova-portfolio
```

**Option B: Using SCP/SFTP**
```bash
# From your local machine
scp -r /path/to/CodeNova root@your-vps-ip:/root/
```

### 2. Install Dependencies

```bash
cd /root/CodeNova

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Build Frontend

```bash
cd /root/CodeNova/frontend
npm run build
```

### 4. Configure Environment Variables

```bash
cd /root/CodeNova/backend
nano .env
```

Add the following content:
```env
PORT=5000
FRONTEND_URL=http://your-domain.com
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=your_gmail_app_password
APP_PASSWORD=your_gmail_app_password
```

**Important**: For Gmail, you need to:
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in EMAIL_PASS

### 5. Create PM2 Ecosystem File

```bash
cd /root/CodeNova
nano ecosystem.config.js
```

Add the following content:
```javascript
module.exports = {
  apps: [
    {
      name: 'codenova-backend',
      script: './backend/server.js',
      cwd: '/root/CodeNova',
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

### 6. Start Backend with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🌐 Nginx Configuration

### 1. Create Nginx Configuration

```bash
nano /etc/nginx/sites-available/codenova
```

Add the following content:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend (React build)
    location / {
        root /root/CodeNova/frontend/dist;
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

### 2. Enable the Site

```bash
ln -s /etc/nginx/sites-available/codenova /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 🔒 SSL Certificate (Optional but Recommended)

### 1. Install Certbot

```bash
apt install certbot python3-certbot-nginx -y
```

### 2. Get SSL Certificate

```bash
certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔧 Firewall Configuration

```bash
# Install UFW
apt install ufw -y

# Configure firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

## 📊 Monitoring and Maintenance

### 1. Check PM2 Status

```bash
pm2 status
pm2 logs codenova-backend
```

### 2. Check Nginx Status

```bash
systemctl status nginx
```

### 3. Monitor System Resources

```bash
htop
df -h
```

## 🚀 Deployment Commands Summary

```bash
# 1. Connect to VPS
ssh root@your-vps-ip

# 2. Update system
apt update && apt upgrade -y

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# 4. Install PM2 and Nginx
npm install -g pm2
apt install nginx -y

# 5. Clone/Upload project
git clone https://github.com/yourusername/codenova-portfolio.git
cd codenova-portfolio

# 6. Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# 7. Build frontend
npm run build

# 8. Configure environment
cd ../backend
nano .env  # Add your email credentials

# 9. Start with PM2
cd ..
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 10. Configure Nginx
nano /etc/nginx/sites-available/codenova
ln -s /etc/nginx/sites-available/codenova /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# 11. Setup SSL (optional)
certbot --nginx -d your-domain.com
```

## 🔍 Troubleshooting

### Common Issues:

1. **Port 5000 not accessible**
   ```bash
   ufw allow 5000
   ```

2. **Nginx 502 Bad Gateway**
   - Check if backend is running: `pm2 status`
   - Check backend logs: `pm2 logs codenova-backend`

3. **Frontend not loading**
   - Check if build files exist: `ls /root/CodeNova/frontend/dist`
   - Rebuild frontend: `cd frontend && npm run build`

4. **Email not working**
   - Verify Gmail App Password
   - Check backend logs for email errors

### Useful Commands:

```bash
# Restart services
pm2 restart codenova-backend
systemctl restart nginx

# Check logs
pm2 logs codenova-backend
tail -f /var/log/nginx/error.log

# Check processes
ps aux | grep node
ps aux | grep nginx
```

## 📱 Domain Configuration

If you have a domain:

1. **Point DNS to your VPS IP**
   - A Record: `@` → `your-vps-ip`
   - A Record: `www` → `your-vps-ip`

2. **Update frontend API calls**
   - Change `http://localhost:5000` to `https://your-domain.com/api`

## 🎉 Success!

Your CodeNova portfolio should now be live at:
- **Frontend**: `http://your-domain.com` or `http://your-vps-ip`
- **Backend API**: `http://your-domain.com/api` or `http://your-vps-ip:5000`

## 📞 Support

If you encounter any issues:
1. Check the logs: `pm2 logs codenova-backend`
2. Verify all services are running: `pm2 status`
3. Check Nginx configuration: `nginx -t`
4. Ensure firewall allows necessary ports

---

**Your CodeNova portfolio is now live! 🚀**
