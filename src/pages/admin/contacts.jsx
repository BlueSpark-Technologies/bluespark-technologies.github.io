import { useState, useEffect } from 'react';
import Layouts from "@/src/layouts/Layouts";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchContacts = async (page = 1, status = 'all') => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/contacts?page=${page}&status=${status}&limit=10`);
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.data.contacts);
        setPagination(data.data.pagination);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: contactId,
          status: newStatus
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh the contacts list
        fetchContacts(currentPage, statusFilter);
      } else {
        alert('Failed to update status: ' + data.message);
      }
    } catch (err) {
      alert('Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#007bff';
      case 'read': return '#28a745';
      case 'replied': return '#17a2b8';
      case 'archived': return '#6c757d';
      default: return '#000';
    }
  };

  if (loading) {
    return (
      <Layouts>
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h2>Loading contacts...</h2>
        </div>
      </Layouts>
    );
  }

  if (error) {
    return (
      <Layouts>
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h2 style={{ color: 'red' }}>Error: {error}</h2>
        </div>
      </Layouts>
    );
  }

  return (
    <Layouts>
      <div style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Contact Form Submissions</h1>
        
        {/* Filter Controls */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <label style={{ marginRight: '10px' }}>Filter by Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{ padding: '5px 10px', marginRight: '20px' }}
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          
          <span>Total: {pagination.totalContacts} contacts</span>
        </div>

        {/* Contacts Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Message</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{contact.name}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    <a href={`mailto:${contact.email}`} style={{ color: '#007bff' }}>
                      {contact.email}
                    </a>
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6', maxWidth: '300px' }}>
                    <div style={{ maxHeight: '100px', overflow: 'auto' }}>
                      {contact.message}
                    </div>
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6', whiteSpace: 'nowrap' }}>
                    {formatDate(contact.submittedAt)}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    <span style={{ 
                      color: getStatusColor(contact.status), 
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      {contact.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    <select 
                      value={contact.status}
                      onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button 
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              style={{ 
                padding: '8px 16px', 
                marginRight: '10px',
                backgroundColor: pagination.hasPrevPage ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed'
              }}
            >
              Previous
            </button>
            
            <span style={{ margin: '0 20px' }}>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              style={{ 
                padding: '8px 16px', 
                marginLeft: '10px',
                backgroundColor: pagination.hasNextPage ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed'
              }}
            >
              Next
            </button>
          </div>
        )}

        {contacts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
            <h3>No contact submissions found</h3>
            <p>Contact submissions will appear here once users submit the contact form.</p>
          </div>
        )}
      </div>
    </Layouts>
  );
};

export default AdminContacts; 