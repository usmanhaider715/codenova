// Email Test Script for CodeNova Portfolio
// Run this script to test email functionality locally

const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'usmanhaiderkhokhar715@gmail.com',
    pass: 'jdqu rbvn irkc bofg' // Your Gmail App Password
  }
});

// Test email content
const mailOptions = {
  from: 'usmanhaiderkhokhar715@gmail.com',
  to: 'usmanhaiderkhokhar715@gmail.com',
  subject: 'CodeNova Portfolio - Email Test',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00d4ff;">CodeNova Portfolio Email Test</h2>
      <div style="background: #1a1a2e; padding: 20px; border-radius: 10px; color: #e2e8f0;">
        <h3 style="color: #8b5cf6;">Test Information</h3>
        <p><strong>Name:</strong> Test User</p>
        <p><strong>Email:</strong> test@example.com</p>
        <p><strong>Project Details:</strong> Testing email functionality</p>
        <hr style="border-color: #00d4ff; margin: 20px 0;">
        <h3 style="color: #8b5cf6;">Message</h3>
        <p style="background: #16213e; padding: 15px; border-radius: 5px;">
          This is a test email from your CodeNova portfolio contact form. 
          If you receive this email, the email functionality is working correctly!
        </p>
        <hr style="border-color: #00d4ff; margin: 20px 0;">
        <p style="color: #94a3b8; font-size: 12px;">
          Test sent on: ${new Date().toLocaleString()}
        </p>
      </div>
    </div>
  `
};

// Send test email
async function testEmail() {
  try {
    console.log('🚀 Testing email functionality...');
    console.log('📧 Sending test email to: usmanhaiderkhokhar715@gmail.com');
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📧 Check your inbox: usmanhaiderkhokhar715@gmail.com');
    
  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Make sure 2-Factor Authentication is enabled on your Gmail account');
      console.log('2. Verify the App Password is correct: jdqu rbvn irkc bofg');
      console.log('3. Check if "Less secure app access" is enabled (if not using App Password)');
    }
  }
}

// Run the test
testEmail();
