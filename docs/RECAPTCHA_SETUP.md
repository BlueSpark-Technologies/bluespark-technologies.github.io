# reCAPTCHA Setup Guide

This guide explains how to set up Google reCAPTCHA v2 for the contact form to prevent spam submissions.

## Features Added

- ✅ Google reCAPTCHA v2 integration
- ✅ Server-side token verification
- ✅ Client-side validation
- ✅ Automatic CAPTCHA reset on form submission
- ✅ Error handling for failed verifications
- ✅ Development/test keys included

## Current Configuration

The application is currently configured with Google's test keys that always pass validation:

- **Site Key (Public)**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- **Secret Key (Private)**: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

## Production Setup

For production use, you'll need to:

### 1. Get Your Own reCAPTCHA Keys

1. Visit [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Click "Create" to register a new site
3. Choose "reCAPTCHA v2" and "I'm not a robot" Checkbox
4. Add your domain(s):
   - For development: `localhost`
   - For production: `yourdomain.com`
5. Accept the terms and submit
6. Copy your Site Key and Secret Key

### 2. Update Environment Variables

Update your environment configuration:

```bash
# In .env.local or docker-compose.yml
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
RECAPTCHA_SECRET_KEY=your_actual_secret_key_here
```

### 3. Docker Configuration

The docker-compose.yml file includes the environment variables:

```yaml
environment:
  - NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
  - RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

Replace these with your actual keys for production.

## How It Works

### Client-Side (Frontend)
1. User fills out the contact form
2. User must complete the reCAPTCHA challenge
3. Form validates that CAPTCHA is completed before submission
4. CAPTCHA token is sent with form data to the API

### Server-Side (Backend)
1. API receives form data including reCAPTCHA token
2. Server verifies token with Google's reCAPTCHA API
3. If verification fails, form submission is rejected
4. If verification passes, contact is saved to database

## Security Features

- **Server-side verification**: Prevents bypassing CAPTCHA on client-side
- **Token expiration**: CAPTCHA tokens expire and must be refreshed
- **Error handling**: Graceful handling of verification failures
- **Automatic reset**: CAPTCHA resets after each submission attempt

## Testing

### With Test Keys (Current Setup)
- CAPTCHA will always pass validation
- Useful for development and testing
- No actual bot protection

### With Production Keys
- Real bot protection
- Users must solve actual CAPTCHA challenges
- Failed attempts are blocked

## Troubleshooting

### Common Issues

1. **CAPTCHA not loading**
   - Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
   - Verify the site key is correct
   - Check browser console for errors

2. **Verification always fails**
   - Verify `RECAPTCHA_SECRET_KEY` is set correctly
   - Check server logs for verification errors
   - Ensure domain is registered with reCAPTCHA

3. **CAPTCHA appears but form still submits without completion**
   - Check client-side validation in contact form
   - Verify form is using the updated validation logic

### Debug Mode

To debug reCAPTCHA issues, check:

1. **Browser Console**: For client-side errors
2. **Server Logs**: For verification failures
3. **Network Tab**: To see API requests/responses

## Customization

### Styling the CAPTCHA

The reCAPTCHA widget can be customized:

```jsx
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey="your_site_key"
  theme="light" // or "dark"
  size="normal" // or "compact"
  onChange={(value) => setFieldValue('recaptcha', value)}
/>
```

### Alternative CAPTCHA Solutions

If you prefer other CAPTCHA solutions:

- **hCaptcha**: Privacy-focused alternative
- **Cloudflare Turnstile**: Free alternative
- **Custom CAPTCHA**: Build your own solution

## Production Checklist

- [ ] Register domain with Google reCAPTCHA
- [ ] Replace test keys with production keys
- [ ] Test CAPTCHA functionality on staging
- [ ] Monitor for false positives/negatives
- [ ] Set up monitoring for verification failures
- [ ] Consider accessibility requirements

## Support

For issues with reCAPTCHA:
- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha)
- [reCAPTCHA FAQ](https://developers.google.com/recaptcha/docs/faq)
- Check server logs for detailed error messages 