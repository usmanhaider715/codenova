#!/bin/bash

# CodeNova Portfolio - VPS Troubleshooting Script
# This script will help diagnose and fix issues with your existing deployment

echo "🔍 CodeNova Portfolio - VPS Troubleshooting"
echo "==========================================="

# Check what's running on your VPS
echo "📊 Checking current processes..."

# Check PM2 processes
echo "🔧 PM2 Status:"
pm2 status

# Check Node.js processes
echo "📦 Node.js Processes:"
ps aux | grep node

# Check port usage
echo "🌐 Port Usage:"
netstat -tlnp | grep -E ':(80|3001|5000|3000)'

# Check Nginx status
echo "🌐 Nginx Status:"
systemctl status nginx --no-pager

# Check if codenova directory exists
echo "📁 Project Directory:"
if [ -d "/root/codenova" ]; then
    echo "✅ /root/codenova exists"
    ls -la /root/codenova/
else
    echo "❌ /root/codenova does not exist"
fi

# Check backend logs
echo "📋 Backend Logs (last 20 lines):"
if [ -d "/root/codenova" ]; then
    pm2 logs codenova-backend --lines 20
else
    echo "❌ No backend logs available"
fi

# Check Nginx configuration
echo "⚙️ Nginx Configuration:"
if [ -f "/etc/nginx/sites-available/codenova" ]; then
    echo "✅ Nginx config exists"
    cat /etc/nginx/sites-available/codenova
else
    echo "❌ Nginx config not found"
fi

# Check environment file
echo "🔐 Environment File:"
if [ -f "/root/codenova/backend/.env" ]; then
    echo "✅ .env file exists"
    cat /root/codenova/backend/.env
else
    echo "❌ .env file not found"
fi

echo ""
echo "🔧 Troubleshooting Commands:"
echo "  - Restart PM2: pm2 restart all"
echo "  - Restart Nginx: systemctl restart nginx"
echo "  - View PM2 logs: pm2 logs codenova-backend"
echo "  - Check PM2 status: pm2 status"
echo "  - Kill all PM2 processes: pm2 kill"
