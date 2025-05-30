import connectDB from '@/src/lib/mongodb';
import Contact from '@/src/models/Contact';

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectDB();

    if (req.method === 'GET') {
      // Get query parameters for pagination and filtering
      const { 
        page = 1, 
        limit = 10, 
        status = 'all',
        sortBy = 'submittedAt',
        sortOrder = 'desc'
      } = req.query;

      // Build filter object
      const filter = {};
      if (status !== 'all') {
        filter.status = status;
      }

      // Build sort object
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Calculate skip value for pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Get contacts with pagination
      const contacts = await Contact.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination
      const totalContacts = await Contact.countDocuments(filter);
      const totalPages = Math.ceil(totalContacts / parseInt(limit));

      return res.status(200).json({
        success: true,
        data: {
          contacts,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalContacts,
            hasNextPage: parseInt(page) < totalPages,
            hasPrevPage: parseInt(page) > 1
          }
        }
      });

    } else if (req.method === 'PATCH') {
      // Update contact status
      const { id, status } = req.body;

      if (!id || !status) {
        return res.status(400).json({
          success: false,
          message: 'Contact ID and status are required'
        });
      }

      const validStatuses = ['new', 'read', 'replied', 'archived'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status must be one of: ${validStatuses.join(', ')}`
        });
      }

      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!updatedContact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Contact status updated successfully',
        data: updatedContact
      });

    } else {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Admin contacts API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 