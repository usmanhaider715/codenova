# 🚀 CodeNova Portfolio - Quick VPS Deployment

Since you already have Node.js running on your Hostinger VPS, here's the **simplest way** to deploy:

## 📋 What You Need to Do

### 1. Upload Project Files to VPS

**From your local machine, run:**
```bash
# Upload all project files to your VPS
scp -r /Users/mac/Documents/Web\ Dev/CodeNova/* root@your-vps-ip:/root/codenova-portfolio/
```

### 2. Connect to Your VPS

```bash
ssh root@your-vps-ip
```

### 3. Run the Deployment Script

```bash
cd /root/codenova-portfolio
chmod +x deploy.sh
./deploy.sh
```

**That's it!** The script will:
- ✅ Install all dependencies
- ✅ Build the frontend
- ✅ Configure environment with your email
- ✅ Start the backend with PM2
- ✅ Configure Nginx
- ✅ Make your site live

## 🌐 Your Website Will Be Live At

- **Frontend**: `http://your-vps-ip`
- **Contact Form**: `http://your-vps-ip/contact`
- **WhatsApp**: `https://wa.me/923197331383`

## 📧 Email Configuration

Your contact form will send emails to: `usmanhaiderkhokhar715@gmail.com`

## 🔧 Manual Steps (If Script Fails)

If the script doesn't work, run these commands manually:

```bash
# 1. Install dependencies
cd /root/codenova-portfolio
npm install
cd backend && npm install
cd ../frontend && npm install

# 2. Build frontend
npm run build

# 3. Create environment file
cd ../backend
cat > .env << EOF
PORT=5000
FRONTEND_URL=http://$(curl -s ifconfig.me)
NODE_ENV=production
EMAIL_USER=usmanhaiderkhokhar715@gmail.com
EMAIL_PASS=jdqu rbvn irkc bofg
APP_PASSWORD=jdqu rbvn irkc bofg
EOF

# 4. Start with PM2
cd ..
pm2 start ecosystem.config.js
pm2 save

# 5. Configure Nginx (if needed)
# Follow the Nginx configuration in QUICK_DEPLOYMENT.md
```

## 🎉 Success!

After deployment, test:
1. Visit your VPS IP address
2. Go to `/contact` page
3. Fill out the contact form
4. Check your email for the message

---

**Your CodeNova portfolio will be live in minutes! 🚀**
