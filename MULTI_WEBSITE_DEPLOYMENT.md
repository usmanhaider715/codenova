# 🚀 Multi-Website VPS Deployment Guide

This guide will help you deploy multiple websites on your Hostinger VPS without conflicts.

## 📋 Prerequisites

- Fresh Hostinger VPS
- SSH access to your VPS
- GitHub repositories for your websites
- Domain names (optional)

## 🔧 Initial VPS Setup

### Step 1: Update System and Install Dependencies

```bash
# Connect to your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install nginx -y

# Install Git
apt install git -y

# Install UFW firewall
apt install ufw -y

# Configure firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Start services
systemctl start nginx
systemctl enable nginx
```

## 🌐 Website Deployment Structure

We'll organize websites like this:
```
/root/
├── websites/
│   ├── codenova/          # Port 3001
│   ├── website2/          # Port 3002
│   ├── website3/          # Port 3003
│   └── ...
└── nginx-configs/
    ├── codenova.conf
    ├── website2.conf
    └── website3.conf
```

## 🚀 Deploy Your First Website (CodeNova)

### Step 1: Create Website Directory

```bash
# Create websites directory
mkdir -p /root/websites
cd /root/websites

# Clone your CodeNova repository
git clone https://github.com/usmanhaider715/codenova.git
cd codenova
```

### Step 2: Install Dependencies and Build

```bash
# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Build frontend
npm run build
```

### Step 3: Create Environment File

```bash
# Create environment file
cd ../backend
cat > .env << EOF
PORT=3001
FRONTEND_URL=http://your-vps-ip
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
EOF
```

### Step 4: Create PM2 Ecosystem File

```bash
# Create PM2 configuration
cd /root/websites/codenova
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'codenova',
      script: './backend/server.js',
      cwd: '/root/websites/codenova',
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
```

### Step 5: Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Step 6: Configure Nginx

```bash
# Create Nginx configuration for CodeNova
cat > /etc/nginx/sites-available/codenova << EOF
server {
    listen 80;
    server_name your-vps-ip;

    # Frontend (React build)
    location / {
        root /root/websites/codenova/frontend/dist;
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

# Test and reload Nginx
nginx -t
systemctl reload nginx
```

## 🚀 Deploy Your Second Website

### Step 1: Clone Second Website

```bash
# Navigate to websites directory
cd /root/websites

# Clone your second website (replace with your actual repo)
git clone https://github.com/yourusername/website2.git
cd website2
```

### Step 2: Install Dependencies and Build

```bash
# Install dependencies (adjust based on your website type)
npm install

# If it's a React/Vue/Angular app, build it
npm run build

# If it's a Node.js backend, install backend dependencies
# cd backend && npm install
```

### Step 3: Create Environment File (if needed)

```bash
# Create environment file for second website
cat > .env << EOF
PORT=3002
NODE_ENV=production
# Add your specific environment variables here
EOF
```

### Step 4: Create PM2 Configuration

```bash
# Create PM2 configuration for second website
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'website2',
      script: './server.js',  # Adjust based on your entry point
      cwd: '/root/websites/website2',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
EOF
```

### Step 5: Start Second Website

```bash
# Start the second website
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
```

### Step 6: Configure Nginx for Second Website

```bash
# Create Nginx configuration for second website
cat > /etc/nginx/sites-available/website2 << EOF
server {
    listen 80;
    server_name your-vps-ip;

    # If it's a static website
    location / {
        root /root/websites/website2/dist;  # Adjust path
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # If it's a backend API
    location /api {
        proxy_pass http://localhost:3002;
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
ln -s /etc/nginx/sites-available/website2 /etc/nginx/sites-enabled/

# Test and reload Nginx
nginx -t
systemctl reload nginx
```

## 🌐 Using Domains (Optional)

If you have domains, you can configure them:

```bash
# For CodeNova with domain
cat > /etc/nginx/sites-available/codenova << EOF
server {
    listen 80;
    server_name codenova.yourdomain.com;

    location / {
        root /root/websites/codenova/frontend/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

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

# For second website with domain
cat > /etc/nginx/sites-available/website2 << EOF
server {
    listen 80;
    server_name website2.yourdomain.com;

    location / {
        root /root/websites/website2/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3002;
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
```

## 📊 Management Commands

### Check All Websites Status

```bash
# Check PM2 status
pm2 status

# Check Nginx status
systemctl status nginx

# Check all running processes
ps aux | grep node
```

### Restart Specific Website

```bash
# Restart specific website
pm2 restart codenova
pm2 restart website2

# Restart all websites
pm2 restart all
```

### Update Website from GitHub

```bash
# Update CodeNova
cd /root/websites/codenova
git pull origin main
cd frontend && npm run build
pm2 restart codenova

# Update second website
cd /root/websites/website2
git pull origin main
# If it has a build process
npm run build
pm2 restart website2
```

### View Logs

```bash
# View logs for specific website
pm2 logs codenova
pm2 logs website2

# View all logs
pm2 logs
```

## 🔧 Adding More Websites

To add more websites without affecting existing ones:

1. **Choose a new port** (3003, 3004, etc.)
2. **Clone repository** to `/root/websites/website3/`
3. **Create PM2 config** with unique name and port
4. **Create Nginx config** for the new website
5. **Start with PM2** and **reload Nginx**

## 🎯 Port Allocation

- **CodeNova**: Port 3001
- **Website 2**: Port 3002
- **Website 3**: Port 3003
- **Website 4**: Port 3004
- And so on...

## 🔍 Troubleshooting

### If a website is not working:

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs website-name

# Check Nginx configuration
nginx -t

# Check if port is in use
netstat -tlnp | grep :3001
```

### If Nginx is not working:

```bash
# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Check Nginx logs
tail -f /var/log/nginx/error.log
```

## 🎉 Success!

After following this guide, you should have:

- ✅ Multiple websites running on different ports
- ✅ PM2 managing all processes
- ✅ Nginx serving all websites
- ✅ Easy management and updates
- ✅ No conflicts between websites

**Your websites will be accessible at:**
- CodeNova: `http://your-vps-ip` or `http://codenova.yourdomain.com`
- Website 2: `http://your-vps-ip` or `http://website2.yourdomain.com`
- And so on...

---

**This setup allows you to run unlimited websites without conflicts! 🚀**
