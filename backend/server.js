const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'usmanhaiderkhokhar715@gmail.com',
    pass: process.env.EMAIL_PASS || process.env.APP_PASSWORD // Use App Password for Gmail
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CodeNova API is running',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, projectDetails } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }
    
    // Log the contact form submission
    console.log('New contact form submission:', {
      name,
      email,
      message,
      projectDetails,
      timestamp: new Date().toISOString()
    });
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'usmanhaiderkhokhar715@gmail.com',
      to: 'usmanhaiderkhokhar715@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff;">New Contact Form Submission</h2>
          <div style="background: #1a1a2e; padding: 20px; border-radius: 10px; color: #e2e8f0;">
            <h3 style="color: #8b5cf6;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Details:</strong> ${projectDetails || 'Not provided'}</p>
            <hr style="border-color: #00d4ff; margin: 20px 0;">
            <h3 style="color: #8b5cf6;">Message</h3>
            <p style="background: #16213e; padding: 15px; border-radius: 5px;">${message}</p>
            <hr style="border-color: #00d4ff; margin: 20px 0;">
            <p style="color: #94a3b8; font-size: 12px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      data: {
        name,
        email,
        submittedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CodeNova API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
