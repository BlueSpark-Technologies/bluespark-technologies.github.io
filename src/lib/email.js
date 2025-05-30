require('isomorphic-fetch'); // Polyfill for Graph SDK
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');

const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID;
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID;
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const EMAIL_SENDER_ADDRESS = process.env.EMAIL_SENDER_ADDRESS; // e.g., contact@bluespark.ro

const msalConfig = {
    auth: {
        clientId: AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${AZURE_TENANT_ID}`,
        clientSecret: AZURE_CLIENT_SECRET,
    }
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getGraphClient() {
    if (!AZURE_CLIENT_ID || !AZURE_TENANT_ID || !AZURE_CLIENT_SECRET || !EMAIL_SENDER_ADDRESS) {
        console.warn('Azure AD email configuration is missing. Emails will not be sent.');
        return null;
    }

    const tokenRequest = {
        scopes: ['https://graph.microsoft.com/.default'], // Use .default scope for client credentials flow
    };

    try {
        const authResponse = await cca.acquireTokenByClientCredential(tokenRequest);
        if (!authResponse || !authResponse.accessToken) {
            console.error('Failed to acquire access token for Graph API.');
            return null;
        }

        const client = Client.init({
            authProvider: (done) => {
                done(null, authResponse.accessToken);
            },
        });
        return client;
    } catch (error) {
        console.error('Error acquiring token or initializing Graph client:', error);
        return null;
    }
}

async function sendEmailWithGraph(mailOptions) {
    const graphClient = await getGraphClient();
    if (!graphClient) {
        return { success: false, message: 'Graph client not initialized due to missing config or token failure.' };
    }

    const { to, subject, htmlBody, textBody } = mailOptions;

    const emailMessage = {
        message: {
            subject: subject,
            body: {
                contentType: 'HTML', // Or 'Text' if only textBody is preferred
                content: htmlBody,
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: to,
                    },
                },
            ],
            // replyTo can be added here if needed, similar to toRecipients
            // from: { emailAddress: { address: EMAIL_SENDER_ADDRESS } } // 'from' is implicitly the user context of the token
        },
        saveToSentItems: 'true',
    };

    try {
        // Note: The user specified by EMAIL_SENDER_ADDRESS must have permissions to send mail
        // and the Azure AD app must have Mail.Send application permissions granted for this user.
        await graphClient.api(`/users/${EMAIL_SENDER_ADDRESS}/sendMail`).post(emailMessage);
        console.log(`Email sent successfully to ${to} via MS Graph API`);
        return { success: true, message: 'Email sent successfully via MS Graph API' };
    } catch (error) {
        console.error(`Error sending email to ${to} via MS Graph API:`, error.code, error.message);
        // Log more details if available, e.g., error.body if it's a GraphError
        if (error.body) {
            try {
                const errorBody = JSON.parse(error.body);
                console.error('Graph API Error Details:', JSON.stringify(errorBody, null, 2));
            } catch (parseError) {
                console.error('Error parsing Graph API error body:', error.body);
            }
        }
        return { success: false, message: `Failed to send email via MS Graph API: ${error.message}` };
    }
}

// Function to send contact form notification email
async function sendContactFormEmail(contactData) {
    const { name, email, message, submittedAt, ipAddress } = contactData;
    
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #495057; }
        .value { margin-top: 5px; padding: 10px; background-color: white; border: 1px solid #ced4da; border-radius: 4px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6c757d; }
        .metadata { font-size: 12px; color: #6c757d; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>Blue Spark Technologies Website</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="metadata">
            <strong>Submission Details:</strong><br>
            Date: ${new Date(submittedAt).toLocaleString()}<br>
            IP Address: ${ipAddress || 'Unknown'}<br>
            Source: Website Contact Form
          </div>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated from the Blue Spark Technologies website contact form.</p>
          <p>Please reply directly to the customer's email address: ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Contact Form Submission - Blue Spark Technologies

Name: ${name}
Email: ${email}
Message: ${message}

Submission Details:
Date: ${new Date(submittedAt).toLocaleString()}
IP Address: ${ipAddress || 'Unknown'}
Source: Website Contact Form

Please reply directly to the customer's email address: ${email}
  `;

    return sendEmailWithGraph({
        to: 'hello@bluespark.ro', // Your notification email address
        subject: `New Contact Form Submission from ${name}`,
        htmlBody: htmlContent,
        textBody: textContent,
        // replyTo: email, // Graph API's sendMail takes replyTo in a different structure if needed
    });
}

// Function to send auto-reply email to the customer
async function sendAutoReplyEmail(contactData) {
    const { name, email } = contactData;
  
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank you for contacting Blue Spark Technologies</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6c757d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You!</h1>
          <p>Blue Spark Technologies</p>
        </div>
        
        <div class="content">
          <p>Dear ${name},</p>
          
          <p>Thank you for contacting Blue Spark Technologies. We have received your message and will get back to you as soon as possible.</p>
          
          <p>Our team typically responds within 24 hours during business days. If your inquiry is urgent, please feel free to call us at <strong>+40 749 424180</strong>.</p>
          
          <p>We appreciate your interest in our services and look forward to helping you with your project.</p>
          
          <p>Best regards,<br>
          The Blue Spark Technologies Team</p>
        </div>
        
        <div class="footer">
          <p>Blue Spark Technologies<br>
          Email: hello@bluespark.ro<br>
          Phone: +40 749 424180</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Dear ${name},

Thank you for contacting Blue Spark Technologies. We have received your message and will get back to you as soon as possible.

Our team typically responds within 24 hours during business days. If your inquiry is urgent, please feel free to call us at +40 749 424180.

We appreciate your interest in our services and look forward to helping you with your project.

Best regards,
The Blue Spark Technologies Team

Blue Spark Technologies
Email: hello@bluespark.ro
Phone: +40 749 424180
  `;

    return sendEmailWithGraph({
        to: email, // Customer's email address
        subject: 'Thank you for contacting Blue Spark Technologies',
        htmlBody: htmlContent,
        textBody: textContent,
    });
}

module.exports = {
    sendContactFormEmail,
    sendAutoReplyEmail
}; 