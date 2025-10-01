#!/bin/bash

# GitHub Repository Setup Script for CodeNova Portfolio
# Run this script after creating your GitHub repository

echo "🚀 CodeNova Portfolio - GitHub Setup Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Please run 'git init' first."
    exit 1
fi

# Get GitHub repository URL
echo "📝 Please enter your GitHub repository URL:"
echo "   Example: https://github.com/yourusername/codenova-portfolio.git"
read -p "GitHub URL: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo "❌ GitHub URL is required!"
    exit 1
fi

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin $GITHUB_URL

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Success! Your CodeNova portfolio has been pushed to GitHub!"
echo "🌐 Repository URL: $GITHUB_URL"
echo ""
echo "📋 Next Steps:"
echo "1. Go to your GitHub repository to verify the upload"
echo "2. Follow the VPS deployment guide: GITHUB_VPS_DEPLOYMENT.md"
echo "3. Clone the repository on your VPS and deploy"
echo ""
echo "🎉 Happy coding!"
