# 🌐 Hostinger Domain Setup for codenova.art

## 📋 Step-by-Step Setup Guide

### 🔧 Step 1: DNS Configuration in Hostinger

1. **Login to Hostinger Dashboard**
   - Go to https://hpanel.hostinger.com/
   - Login with your account

2. **Navigate to DNS Zone**
   - Click on "Domains" in the sidebar
   - Find "codenova.art" and click "Manage"
   - Go to "DNS / Name Servers" tab
   - Click "DNS Zone"

3. **Add/Update DNS Records**
   ```
   Type    Name    Points to        TTL
   A       @       72.60.181.84     14400
   A       www     72.60.181.84     14400
   ```

4. **Remove conflicting records** (if any):
   - Delete any existing A records pointing to different IPs
   - Keep MX records for email (if you plan to use email)

### 🔄 Step 2: Update Nginx Configuration

SSH into your VPS and update the configuration:

```bash
# Connect to VPS
ssh root@72.60.181.84

# Backup current config
cp /etc/nginx/sites-available/codenova /etc/nginx/sites-available/codenova.backup

# Edit the configuration
nano /etc/nginx/sites-available/codenova
```

**Replace the entire content with:**

```nginx
server {
    listen 80;
    server_name codenova.art www.codenova.art;

    # Frontend (React build)
    location / {
        root /root/websites/codenova/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
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

**Test and reload Nginx:**

```bash
# Test configuration
nginx -t

# Reload nginx
systemctl reload nginx
```

### 🔒 Step 3: Install SSL Certificate

```bash
# Install certbot (if not already installed)
apt update
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d codenova.art -d www.codenova.art

# Follow the prompts:
# 1. Enter email: usmanhaiderkhokhar715@gmail.com
# 2. Agree to terms: Y
# 3. Share email with EFF: Y or N (your choice)
```

### ⚙️ Step 4: Update Backend Environment

```bash
# Update backend environment
cd /root/websites/codenova/backend
nano .env
```

**Update the .env file:**

```env
PORT=3001
FRONTEND_URL=https://codenova.art
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
```

**Restart PM2:**

```bash
pm2 restart codenova
```

### 🧪 Step 5: Test Everything

```bash
# Test domain resolution
nslookup codenova.art

# Test HTTP (should redirect to HTTPS)
curl -I http://codenova.art

# Test HTTPS
curl -I https://codenova.art

# Test API
curl https://codenova.art/api/health
```

### 🎯 Step 6: Update Social Media & Marketing

Update your:
- WhatsApp business profile
- Social media bios
- Email signatures
- Business cards

---

## 🚀 Commands to Run (Copy & Paste)

### On your VPS:

```bash
# 1. Update Nginx configuration
sudo nano /etc/nginx/sites-available/codenova

# 2. Test and reload Nginx
nginx -t && systemctl reload nginx

# 3. Install SSL certificate
certbot --nginx -d codenova.art -d www.codenova.art

# 4. Update backend environment
cd /root/websites/codenova/backend
nano .env

# 5. Restart PM2
pm2 restart codenova

# 6. Test everything
curl -I https://codenova.art
curl https://codenova.art/api/health
```

## ✅ Expected Results

After completing these steps:
- ✅ `http://codenova.art` → redirects to `https://codenova.art`
- ✅ `https://codenova.art` → shows your website
- ✅ `https://www.codenova.art` → works perfectly
- ✅ Contact form sends emails successfully
- ✅ All CTAs and links work properly
- ✅ Green padlock icon (SSL) in browser

## 🕐 Timeline

- **DNS Propagation**: 5-30 minutes (usually very fast with Hostinger)
- **SSL Certificate**: 2-5 minutes
- **Total Setup Time**: 15-45 minutes

Your professional CodeNova website will be live at **https://codenova.art**! 🎨🚀
