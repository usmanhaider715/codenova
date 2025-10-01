# 🎉 CodeNova Portfolio - Ready for VPS Deployment!

## ✅ **Your Setup:**

- **GitHub Repository**: https://github.com/usmanhaider715/codenova
- **GitHub Username**: usmanhaider715
- **Repository Name**: codenova
- **Local Project**: `/Users/mac/Documents/Web Dev/CodeNova`

## 🚀 **VPS Deployment Options:**

### **Option 1: One-Command Deployment (Recommended)**

```bash
# Connect to your VPS
ssh root@your-vps-ip

# Download and run the deployment script
wget https://raw.githubusercontent.com/usmanhaider715/codenova/main/deploy-codenova.sh
chmod +x deploy-codenova.sh
./deploy-codenova.sh
```

### **Option 2: Manual Step-by-Step**

Follow the detailed guide: `VPS_DEPLOYMENT_GUIDE.md`

## 🎯 **What Will Happen:**

1. **Clone Repository**: Downloads your code from GitHub
2. **Install Dependencies**: Installs all npm packages
3. **Build Frontend**: Creates production build
4. **Configure Environment**: Sets up email credentials
5. **Start Backend**: Runs with PM2 on port 3001
6. **Configure Nginx**: Serves frontend and proxies API
7. **Setup Firewall**: Allows HTTP/HTTPS traffic
8. **Make Live**: Your website goes live!

## 🌐 **Your Website Will Be Live At:**

- **Frontend**: `http://your-vps-ip-address`
- **Contact Form**: `http://your-vps-ip-address/contact`
- **WhatsApp**: `https://wa.me/923197331383`

## 📧 **Email Integration:**

- **Contact Form** → `usmanhaiderkhokhar715@gmail.com`
- **Gmail App Password**: `jdqu rbvn irkc bofg`
- **Phone/WhatsApp**: `+92 319 7331383`

## 🔄 **Future Updates:**

When you make changes to your code:

```bash
# Local (your Mac)
git add .
git commit -m "Update: description"
git push origin main

# VPS
cd /root/codenova
git pull origin main
cd frontend && npm run build
pm2 restart codenova-backend
```

## 📊 **VPS Management Commands:**

```bash
# Check status
pm2 status

# View logs
pm2 logs codenova-backend

# Restart app
pm2 restart codenova-backend

# Check Nginx
systemctl status nginx
```

## 🎉 **Success Indicators:**

- ✅ GitHub repository: https://github.com/usmanhaider715/codenova
- ✅ Local development working (port 3001)
- ✅ Email functionality tested
- ✅ All CTA buttons configured
- ✅ WhatsApp integration ready
- ✅ VPS deployment scripts ready

## 🚀 **Next Steps:**

1. **Connect to your VPS**: `ssh root@your-vps-ip`
2. **Run deployment script**: `./deploy-codenova.sh`
3. **Test your website**: Visit `http://your-vps-ip`
4. **Test contact form**: Submit a test message
5. **Check your email**: Verify email delivery

---

**Your CodeNova portfolio is ready to go live! 🚀**

**Repository**: https://github.com/usmanhaider715/codenova  
**Deployment Script**: `deploy-codenova.sh`  
**Guide**: `VPS_DEPLOYMENT_GUIDE.md`
