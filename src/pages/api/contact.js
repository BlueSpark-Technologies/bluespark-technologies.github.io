import connectDB from '@/src/lib/mongodb';
import Contact from '@/src/models/Contact';
const { sendContactFormEmail, sendAutoReplyEmail } = require('@/src/lib/email');

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
    return true; // Allow in development if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  try {
    // Connect to MongoDB
    await connectDB();

    // Extract form data
    const { name, email, message, recaptchaToken } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, message) are required.'
      });
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA verification is required.'
      });
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA verification failed. Please try again.'
      });
    }

    // Get client IP and user agent for tracking
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress ||
                     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
    const userAgent = req.headers['user-agent'];

    // Create new contact submission
    const contactSubmission = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ipAddress,
      userAgent
    });

    // Save to database
    const savedContact = await contactSubmission.save();

    // Prepare contact data for emails
    const contactData = {
      name: savedContact.name,
      email: savedContact.email,
      message: savedContact.message,
      submittedAt: savedContact.submittedAt,
      ipAddress: savedContact.ipAddress,
      userAgent: savedContact.userAgent
    };

    // Send notification email to hello@bluespark.ro
    const notificationResult = await sendContactFormEmail(contactData);
    
    // Send auto-reply email to the customer
    const autoReplyResult = await sendAutoReplyEmail(contactData);

    // Log email results
    if (notificationResult.success) {
      console.log('Notification email sent successfully');
    } else {
      console.warn('Failed to send notification email:', notificationResult.message);
    }

    if (autoReplyResult.success) {
      console.log('Auto-reply email sent successfully');
    } else {
      console.warn('Failed to send auto-reply email:', autoReplyResult.message);
    }

    // Return success response (don't fail the request if emails fail)
    return res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: savedContact._id,
        submittedAt: savedContact.submittedAt,
        emailNotification: notificationResult.success,
        autoReply: autoReplyResult.success
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Handle duplicate email submissions (if you want to prevent spam)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A submission with this email already exists.'
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
} 