# 🌐 Domain Setup Guide for CodeNova

## 📋 Overview
This guide will help you set up a custom domain for your CodeNova website currently running on `http://72.60.181.84`.

## 🛒 Step 1: Purchase a Domain

### Recommended Domain Registrars:
- **Namecheap** (Popular, good prices)
- **GoDaddy** (Well-known, easy to use)
- **Cloudflare** (Great for developers, includes CDN)
- **Google Domains** (Simple, reliable)
- **Hostinger** (Since you're already using their VPS)

### Domain Suggestions for CodeNova:
- `codenova.com`
- `codenova.dev`
- `codenova.io`
- `codenova.tech`
- `codenova.agency`
- `codenovatech.com`
- `codenovastudio.com`

## 🔧 Step 2: DNS Configuration

Once you have your domain, you need to point it to your VPS IP: `72.60.181.84`

### DNS Records to Add:

```
Type    Name    Value           TTL
A       @       72.60.181.84    300
A       www     72.60.181.84    300
CNAME   *       yourdomain.com  300
```

### For Different Registrars:

#### **Namecheap:**
1. Login to Namecheap account
2. Go to "Domain List" → Click "Manage" next to your domain
3. Go to "Advanced DNS" tab
4. Add the DNS records above
5. Wait 5-30 minutes for propagation

#### **Cloudflare:**
1. Add your domain to Cloudflare
2. Update nameservers at your registrar to Cloudflare's
3. Add DNS records in Cloudflare dashboard
4. Enable "Proxied" for better performance and security

#### **GoDaddy:**
1. Login to GoDaddy account
2. Go to "My Products" → "DNS"
3. Click "Manage" next to your domain
4. Add the DNS records above

## 🔒 Step 3: Update Nginx Configuration

Once your domain is pointing to your VPS, update your Nginx configuration:

```bash
# Connect to your VPS
ssh root@72.60.181.84

# Backup current config
cp /etc/nginx/sites-available/codenova /etc/nginx/sites-available/codenova.backup

# Update the configuration
nano /etc/nginx/sites-available/codenova
```

### Updated Nginx Configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

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

### Apply the changes:

```bash
# Test nginx configuration
nginx -t

# Reload nginx
systemctl reload nginx
```

## 🔐 Step 4: SSL Certificate (HTTPS)

### Install Certbot:

```bash
# Install snapd (if not already installed)
apt update
apt install snapd

# Install certbot
snap install --classic certbot

# Create symlink
ln -s /snap/bin/certbot /usr/bin/certbot
```

### Get SSL Certificate:

```bash
# Get certificate for your domain
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# 1. Enter your email address
# 2. Agree to terms of service
# 3. Choose whether to share email with EFF
# 4. Certbot will automatically configure nginx
```

### Auto-renewal:

```bash
# Test auto-renewal
certbot renew --dry-run

# Check renewal timer
systemctl status snap.certbot.renew.timer
```

## 🔄 Step 5: Update Frontend Configuration

Update your frontend to use the new domain:

```bash
# Update environment variables
cd /root/websites/codenova/backend
nano .env
```

Update the `.env` file:

```env
PORT=3001
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
```

Restart PM2:

```bash
pm2 restart codenova
```

## 🧪 Step 6: Testing

### Test your domain:

```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://yourdomain.com

# Test HTTPS
curl -I https://yourdomain.com

# Test API
curl https://yourdomain.com/api/health
```

### Online Tools:
- **DNS Propagation**: https://dnschecker.org/
- **SSL Test**: https://www.ssllabs.com/ssltest/
- **Website Speed**: https://pagespeed.web.dev/

## 🎯 Step 7: Update All References

### Update your marketing materials:
- Business cards
- Social media profiles
- Email signatures
- Portfolio links

### Update WhatsApp links in your code:
```javascript
// Update WhatsApp message to include your domain
const whatsappMessage = `Hi! I'm interested in your services. I found you at https://yourdomain.com`
```

## 🚀 Advanced Optimizations

### 1. **Cloudflare Setup** (Recommended):
- Free CDN and DDoS protection
- Better performance worldwide
- Additional security features

### 2. **Google Analytics**:
```html
<!-- Add to your index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. **SEO Improvements**:
```html
<!-- Update meta tags in index.html -->
<meta name="description" content="CodeNova - Professional Software Development Agency. MERN Stack, Cloud Solutions, Mobile Development & Video Editing Services.">
<meta name="keywords" content="software development, web development, mobile apps, MERN stack, React, Node.js">
<meta property="og:title" content="CodeNova - Software Development Agency">
<meta property="og:description" content="Professional software development services including MERN stack, cloud solutions, and mobile development.">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:image" content="https://yourdomain.com/og-image.jpg">
```

## 🔧 Troubleshooting

### Common Issues:

1. **DNS not propagating**: Wait 24-48 hours, use different DNS servers
2. **SSL certificate issues**: Check domain ownership, try again
3. **Nginx errors**: Check configuration with `nginx -t`
4. **PM2 not starting**: Check logs with `pm2 logs codenova`

### Useful Commands:

```bash
# Check domain resolution
nslookup yourdomain.com

# Check SSL certificate
openssl s_client -connect yourdomain.com:443

# Monitor nginx logs
tail -f /var/log/nginx/error.log

# Check PM2 status
pm2 status
pm2 logs codenova
```

## 📞 Support

If you need help with domain setup:
- **Namecheap Support**: 24/7 live chat
- **Cloudflare Community**: https://community.cloudflare.com/
- **Let's Encrypt Community**: https://community.letsencrypt.org/

---

## 🎉 Final Result

After completing this guide, you'll have:
- ✅ Custom domain (e.g., `codenova.com`)
- ✅ HTTPS security with SSL certificate
- ✅ Professional email addresses
- ✅ Better SEO and branding
- ✅ Improved credibility with clients

Your CodeNova website will be accessible at `https://yourdomain.com` instead of the IP address! 🚀
