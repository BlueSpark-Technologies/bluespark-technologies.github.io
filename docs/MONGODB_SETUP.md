# MongoDB Integration Setup Guide

This guide explains how to set up and use the MongoDB integration for contact form submissions.

## Features

- ✅ Contact form submissions saved to MongoDB
- ✅ Admin panel to view and manage submissions
- ✅ Status tracking (new, read, replied, archived)
- ✅ Pagination and filtering
- ✅ Input validation and error handling
- ✅ IP address and user agent tracking
- ✅ Docker-ready configuration

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in your project root with the following content:

```bash
# For Docker environment (default)
MONGODB_URI=mongodb://root:example@mongo:27017/mydatabase?authSource=admin

# For local development (if running MongoDB locally)
# MONGODB_URI=mongodb://localhost:27017/mydatabase
```

### 2. Install Dependencies

The required dependencies have been added to `package.json`. Install them:

```bash
npm install
```

### 3. Start the Application

#### Using Docker (Recommended)

```bash
# Start MongoDB and the application
docker-compose up -d

# View logs
docker-compose logs -f app
```

#### Local Development

If you prefer to run MongoDB locally:

1. Install and start MongoDB locally
2. Update the `MONGODB_URI` in `.env.local` to point to your local instance
3. Run the development server:

```bash
npm run dev
```

## Usage

### Contact Form

- Visit `/contact` to access the contact form
- The form now saves submissions directly to MongoDB
- Users receive immediate feedback on submission success/failure
- Form validation ensures all required fields are filled

### Admin Panel

- Visit `/admin/contacts` to view all contact submissions
- Features include:
  - View all submissions in a table format
  - Filter by status (new, read, replied, archived)
  - Update submission status
  - Pagination for large numbers of submissions
  - Click email addresses to open default email client

### API Endpoints

#### Submit Contact Form
- **POST** `/api/contact`
- Body: `{ name, email, message }`
- Returns: Success/error response with submission details

#### Admin - Get Contacts
- **GET** `/api/admin/contacts`
- Query params: `page`, `limit`, `status`, `sortBy`, `sortOrder`
- Returns: Paginated list of contact submissions

#### Admin - Update Contact Status
- **PATCH** `/api/admin/contacts`
- Body: `{ id, status }`
- Returns: Updated contact details

## Database Schema

### Contact Collection

```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  email: String (required, validated),
  message: String (required, max 1000 chars),
  submittedAt: Date (default: now),
  ipAddress: String,
  userAgent: String,
  status: String (enum: 'new', 'read', 'replied', 'archived'),
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

- `email`: For efficient email lookups
- `submittedAt`: For chronological sorting
- `status`: For status-based filtering

## Security Considerations

1. **Admin Access**: The admin panel (`/admin/contacts`) should be protected with authentication in production
2. **Rate Limiting**: Consider implementing rate limiting on the contact form API
3. **Input Sanitization**: All inputs are validated and sanitized
4. **Environment Variables**: Keep MongoDB credentials secure in environment variables

## Troubleshooting

### Common Issues

1. **Connection Error**: Ensure MongoDB is running and accessible
2. **Authentication Failed**: Check MongoDB credentials in environment variables
3. **Form Not Submitting**: Check browser console for JavaScript errors
4. **Admin Panel Empty**: Ensure there are contact submissions in the database

### Logs

Check application logs for detailed error information:

```bash
# Docker
docker-compose logs app

# Local development
Check the terminal where you ran `npm run dev`
```

## Production Deployment

1. Set up a production MongoDB instance (MongoDB Atlas recommended)
2. Update `MONGODB_URI` environment variable with production connection string
3. Implement authentication for the admin panel
4. Consider adding rate limiting and additional security measures
5. Set up monitoring and backup strategies for your database

## Next Steps

Consider implementing these additional features:

- Email notifications when new contacts are submitted
- Export functionality for contact data
- Advanced search and filtering options
- Contact response templates
- Integration with CRM systems
- Automated spam detection 