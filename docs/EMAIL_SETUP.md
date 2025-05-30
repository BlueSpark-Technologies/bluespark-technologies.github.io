# Email Setup Guide

This guide explains how to configure email functionality for the contact form to send notifications to hello@bluespark.ro and auto-reply emails to customers.

## Features Added

- ✅ Email notification to hello@bluespark.ro for new contact form submissions
- ✅ Auto-reply email to customers confirming receipt of their message
- ✅ Professional HTML email templates
- ✅ Support for multiple email services (Gmail, Outlook, Custom SMTP)
- ✅ Graceful error handling (form submission succeeds even if emails fail)
- ✅ Email delivery status tracking

## Email Services Supported

### 1. Gmail (Recommended for Development)
- Easy to set up
- Requires App Password for security
- Free tier available

### 2. Outlook/Hotmail
- Microsoft email service
- Good for business accounts

### 3. Custom SMTP
- Any SMTP provider (SendGrid, AWS SES, Mailgun, etc.)
- Best for production environments
- More reliable delivery

## Setup Instructions

### Option 1: Gmail Setup (Easiest)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update Environment Variables**:
   ```bash
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   ```

### Option 2: Custom SMTP Setup (Production)

For production, use a dedicated email service:

1. **Choose an Email Service**:
   - **SendGrid**: Free tier, reliable
   - **AWS SES**: Pay-per-use, highly scalable
   - **Mailgun**: Good for developers
   - **Postmark**: Excellent deliverability

2. **Get SMTP Credentials** from your chosen provider

3. **Update Environment Variables**:
   ```bash
   EMAIL_SERVICE=smtp
   EMAIL_USER=your-smtp-username
   EMAIL_PASSWORD=your-smtp-password
   SMTP_HOST=smtp.your-provider.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

## Docker Configuration

Update your `docker-compose.yml` with your email credentials:

```yaml
environment:
  # Gmail Example
  - EMAIL_SERVICE=gmail
  - EMAIL_USER=your-email@gmail.com
  - EMAIL_PASSWORD=your-app-password
  
  # OR Custom SMTP Example
  # - EMAIL_SERVICE=smtp
  # - EMAIL_USER=your-smtp-username
  # - EMAIL_PASSWORD=your-smtp-password
  # - SMTP_HOST=smtp.sendgrid.net
  # - SMTP_PORT=587
  # - SMTP_SECURE=false
```

## Email Templates

### Notification Email (to hello@bluespark.ro)
- Professional HTML template
- Contains all form data
- Includes submission metadata (IP, timestamp)
- Reply-to set to customer's email
- Branded with Blue Spark Technologies styling

### Auto-Reply Email (to customer)
- Thank you message
- Company contact information
- Professional branding
- Response time expectations

## Testing Email Functionality

### 1. Test with Development Setup

```bash
# Install dependencies
npm install

# Start the application
docker-compose up --build -d

# Test the contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "This is a test message",
    "recaptchaToken": "test-token"
  }'
```

### 2. Check Email Delivery

- Check hello@bluespark.ro inbox for notification
- Check test@example.com inbox for auto-reply
- Monitor application logs for email status

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check email credentials in environment variables
   - Verify App Password for Gmail (not regular password)
   - Check application logs for error messages

2. **Gmail "Less secure app" error**
   - Use App Password instead of regular password
   - Ensure 2-Factor Authentication is enabled

3. **SMTP connection errors**
   - Verify SMTP host and port settings
   - Check if firewall is blocking SMTP ports
   - Ensure SMTP credentials are correct

4. **Emails going to spam**
   - Use a dedicated email service for production
   - Set up SPF, DKIM, and DMARC records
   - Use a verified sender domain

### Debug Mode

Check application logs for email-related messages:

```bash
# View application logs
docker-compose logs app | grep -i email

# Common log messages:
# "Contact form email sent successfully"
# "Auto-reply email sent successfully"
# "Email credentials not configured"
# "Error sending contact form email"
```

## Production Recommendations

### 1. Use Dedicated Email Service
- Don't use personal Gmail for production
- Use services like SendGrid, AWS SES, or Mailgun
- Better deliverability and reliability

### 2. Email Security
- Store credentials securely (environment variables)
- Use App Passwords or API keys
- Enable 2FA on email accounts

### 3. Monitoring
- Set up email delivery monitoring
- Track bounce rates and spam reports
- Monitor email sending quotas

### 4. Email Templates
- Customize email templates with your branding
- Add unsubscribe links if required
- Include proper contact information

## Email Service Comparison

| Service | Free Tier | Reliability | Setup Difficulty | Best For |
|---------|-----------|-------------|------------------|----------|
| Gmail | Yes | Good | Easy | Development |
| SendGrid | 100 emails/day | Excellent | Medium | Production |
| AWS SES | 200 emails/day | Excellent | Hard | Enterprise |
| Mailgun | 100 emails/day | Very Good | Medium | Developers |
| Postmark | 100 emails/month | Excellent | Medium | Transactional |

## Security Considerations

1. **Never commit email credentials** to version control
2. **Use environment variables** for all sensitive data
3. **Enable 2FA** on email accounts
4. **Use App Passwords** instead of regular passwords
5. **Rotate credentials** regularly
6. **Monitor for suspicious activity**

## Advanced Configuration

### Custom Email Templates

You can customize the email templates in `src/lib/email.js`:

```javascript
// Modify the htmlContent variable for custom styling
const htmlContent = `
  <!-- Your custom HTML template -->
`;
```

### Multiple Recipients

To send notifications to multiple email addresses:

```javascript
const mailOptions = {
  // ...
  to: 'hello@bluespark.ro, admin@bluespark.ro',
  // ...
};
```

### Email Attachments

To include attachments (like form data as PDF):

```javascript
const mailOptions = {
  // ...
  attachments: [
    {
      filename: 'contact-form.pdf',
      content: pdfBuffer
    }
  ]
};
```

## Support

For email-related issues:
- Check the application logs first
- Verify email service documentation
- Test with a simple email client
- Contact your email service provider support 