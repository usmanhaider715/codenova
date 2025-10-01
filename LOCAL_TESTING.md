# 📧 Local Email Testing Guide

You can test the email functionality locally before deploying to your VPS.

## 🚀 Quick Email Test

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Run Email Test Script
```bash
node test-email.js
```

This will send a test email to `usmanhaiderkhokhar715@gmail.com` using your Gmail App Password.

## 🔧 Test the Full Contact Form Locally

### 1. Start Backend Server
```bash
cd backend
npm run dev
```

### 2. Start Frontend Server (in another terminal)
```bash
cd frontend
npm run dev
```

### 3. Test Contact Form
1. Open `http://localhost:5173/contact`
2. Fill out the contact form
3. Submit the form
4. Check your email: `usmanhaiderkhokhar715@gmail.com`

## 📧 Expected Results

If everything works correctly, you should:
- ✅ See success message on the website
- ✅ Receive an email at `usmanhaiderkhokhar715@gmail.com`
- ✅ Email should have beautiful HTML formatting with your brand colors

## 🔍 Troubleshooting

### If Email Test Fails:

1. **Check Gmail App Password**
   - Make sure 2-Factor Authentication is enabled
   - Verify App Password: `jdqu rbvn irkc bofg`

2. **Check Gmail Settings**
   - Go to Google Account Settings
   - Security → App passwords
   - Make sure the password is correct

3. **Test with Different Email Service**
   ```bash
   # Edit test-email.js to use a different service
   # For example, Outlook:
   service: 'hotmail',
   ```

### If Contact Form Doesn't Work:

1. **Check Backend Logs**
   ```bash
   # Look for errors in the terminal where backend is running
   ```

2. **Check Network Tab**
   - Open browser Developer Tools
   - Go to Network tab
   - Submit the form and check for errors

3. **Verify Environment Variables**
   ```bash
   # Make sure backend/.env has correct values
   cat backend/.env
   ```

## 🎯 Test Scenarios

### Test 1: Basic Email Functionality
```bash
cd backend
node test-email.js
```

### Test 2: Contact Form Integration
1. Start both servers
2. Fill out contact form
3. Submit and check email

### Test 3: Error Handling
1. Try submitting form without required fields
2. Check if proper error messages appear

## 📱 Test WhatsApp Links

You can also test WhatsApp links locally:
- Click "Get a Free Quote" buttons
- Should open WhatsApp with your number: `+92 319 7331383`

## ✅ Success Indicators

- ✅ Email test script runs without errors
- ✅ Contact form shows success message
- ✅ Email received with proper formatting
- ✅ WhatsApp links open correctly
- ✅ All CTA buttons navigate properly

---

**Once local testing passes, you're ready to deploy! 🚀**
