# Microsoft Graph API Email Setup (OAuth2)

This guide explains how to configure email functionality for the contact form to send notifications and auto-replies using the Microsoft Graph API with OAuth2 authentication. This method is recommended for Office 365 / Microsoft Entra ID environments, especially where MFA is enforced or legacy SMTP AUTH is restricted.

## Features & Benefits

- ✅ **Modern Authentication (OAuth2):** Securely authenticates using Microsoft Entra ID.
- ✅ **MFA Compatible:** Works seamlessly with Multi-Factor Authentication.
- ✅ **Microsoft Graph API:** Leverages Microsoft's official API for email sending.
- ✅ **Granular Permissions:** The application is granted only necessary `Mail.Send` permission.
- ✅ **No Stored User Passwords:** The application uses its own client credentials (client ID & secret) to obtain access tokens.
- ✅ Email notification to `hello@bluespark.ro` for new contact form submissions.
- ✅ Auto-reply email to customers confirming receipt of their message.
- ✅ Professional HTML email templates remain in use.

## Prerequisites

1.  **Azure Subscription:** You need an active Azure subscription.
2.  **Microsoft Entra ID:** Your organization uses Microsoft Entra ID (formerly Azure Active Directory).
3.  **Admin Privileges:** An Azure AD administrator is required to register the application and grant permissions.

## Setup Steps

### 1. Register an Application in Microsoft Entra ID

Your Azure administrator needs to perform the following in the Azure portal (`portal.azure.com` or `entra.microsoft.com`):

1.  **Navigate to Microsoft Entra ID.**
2.  Go to **App registrations** (under Manage).
3.  Click **+ New registration**.
    *   **Name:** e.g., `BlueSparkWebsiteContactFormEmailer`
    *   **Supported account types:** "Accounts in this organizational directory only ([Your Org Name] only - Single tenant)"
    *   **Redirect URI:** Can be left blank for this backend service.
    *   Click **Register**.
4.  **Record Identifiers:** From the app's "Overview" page, copy:
    *   `Application (client) ID`
    *   `Directory (tenant) ID`
5.  **Create Client Secret:**
    *   Go to **Certificates & secrets**.
    *   Under "Client secrets", click **+ New client secret**.
    *   Add a description (e.g., `WebAppEmailSecret`) and choose an expiry.
    *   **Important:** Copy the client secret **Value** immediately. It won't be shown again.
6.  **Grant API Permissions:**
    *   Go to **API permissions**.
    *   Click **+ Add a permission** -> **Microsoft Graph** -> **Application permissions**.
    *   Search for and select `Mail.Send`.
    *   Click **Add permissions**.
    *   The administrator must click **Grant admin consent for [Your Org Name]**.

### 2. Configure Environment Variables

Update your `docker-compose.yml` file (or your deployment environment variables) with the credentials obtained from the Azure app registration:

```yaml
services:
  app:
    # ... other configurations ...
    environment:
      # ... other environment variables ...
      
      # Microsoft Graph API Email Configuration (OAuth2)
      - AZURE_CLIENT_ID=your_application_client_id_here
      - AZURE_TENANT_ID=your_directory_tenant_id_here
      - AZURE_CLIENT_SECRET=your_client_secret_value_here
      - EMAIL_SENDER_ADDRESS=contact@bluespark.ro # The User Principal Name of the mailbox
```

Replace the placeholder values with the actual credentials.

### 3. Application Code

The application code in `src/lib/email.js` has been updated to use:
-   `@azure/msal-node` for acquiring OAuth2 access tokens using the client credentials flow.
-   `@microsoft/microsoft-graph-client` for sending emails via the Graph API.

The code will automatically use the environment variables configured above.

## Dependencies Added

The following npm packages were added to `package.json`:
-   `@azure/msal-node`: For Microsoft Authentication Library (MSAL) to interact with Microsoft Entra ID.
-   `@microsoft/microsoft-graph-client`: To make calls to the Microsoft Graph API.
-   `isomorphic-fetch`: A polyfill required by the Graph client in Node.js environments.

Ensure these are installed by running `npm install` or `yarn install` if you haven't rebuilt your Docker image yet.

## Testing Email Functionality

1.  **Ensure Correct Configuration:** Double-check all environment variables (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`, `EMAIL_SENDER_ADDRESS`) are correctly set with the values from your Azure App Registration.
2.  **Build and Restart Application:**
    ```bash
    docker-compose down
    docker-compose up --build -d
    ```
3.  **Submit a Test Form:** Go to your website's contact page and submit a test message.
4.  **Check Logs:** Monitor the application logs for messages related to email sending:
    ```bash
    docker-compose logs app
    ```
    Look for messages like:
    -   `Email sent successfully to recipient@example.com via MS Graph API`
    -   Or error messages if any issues occur during token acquisition or email sending.
5.  **Check Mailboxes:**
    *   Verify that the notification email arrives at `hello@bluespark.ro` (or the configured recipient).
    *   Verify that the auto-reply email arrives at the email address used in the test submission.
    *   Check the "Sent Items" folder of the `EMAIL_SENDER_ADDRESS` (`contact@bluespark.ro`) mailbox, as `saveToSentItems` is set to true.

## Troubleshooting

-   **Token Acquisition Errors:**
    *   `Error acquiring token or initializing Graph client:`
    *   Verify `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET` are correct.
    *   Ensure the client secret has not expired.
    *   Check network connectivity from your server to `https://login.microsoftonline.com`.
-   **Graph API Errors (e.g., when sending email):**
    *   `Error sending email to ... via MS Graph API:`
    *   The logs will attempt to print the error code and message from Graph API.
    *   **Permission Issues:** Ensure the Azure AD App Registration has `Mail.Send` (Application permission) granted and **admin consent** has been provided.
    *   **Invalid `EMAIL_SENDER_ADDRESS`:** Ensure this is the correct User Principal Name (UPN) of an existing, licensed mailbox that the application has permission to send from.
    *   **Mailbox Disabled/Not Found:** The `EMAIL_SENDER_ADDRESS` mailbox must be active and able to send/receive mail.
    *   **Throttling:** For high-volume sending, Microsoft Graph API has throttling limits. This is unlikely for a contact form but good to be aware of for other applications.
    *   Look at the detailed error in the logs, often provided as a JSON body from the Graph API.

-   **`isomorphic-fetch` errors / `fetch is not defined`:**
    *   This should be resolved by `require('isomorphic-fetch');` at the top of `src/lib/email.js`. Ensure the package is installed.

## Security Considerations

-   **Client Secret Management:** Treat the `AZURE_CLIENT_SECRET` as a highly sensitive password. Store it securely (e.g., in environment variables, Azure Key Vault for production) and never commit it to version control.
-   **Client Secret Expiration:** Client secrets expire. Implement a process to renew client secrets before they expire to avoid service interruption.
-   **Least Privilege:** The `Mail.Send` application permission is powerful. Ensure it's only granted to applications that absolutely need it.

This OAuth2 and Graph API approach aligns with Microsoft's best practices for application authentication and email sending in modern cloud environments. 