// frontend/src/components/ApplicationList/ApplicationList.jsx (UPDATED for Vertical Alignment)

import React, { useState, useEffect } from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';

// --- MOCK DATA (no change) ---
const MOCK_APPLICATIONS = [
  { _id: '1', companyName: 'Gidy Tech', jobTitle: 'MERN Developer', applicationDate: '2025-10-20', status: 'Offer' },
  { _id: '2', companyName: 'Innovate Solutions', jobTitle: 'Frontend Engineer', applicationDate: '2025-10-22', status: 'Interview' },
  { _id: '3', companyName: 'DataCorp', jobTitle: 'Full-Stack Developer', applicationDate: '2025-09-15', status: 'Rejected' },
  { _id: '4', companyName: 'FutureAI', jobTitle: 'Backend Specialist', applicationDate: '2025-10-24', status: 'Applied' },
];
// -----------------------------

const ApplicationList = () => {
  // ... state, useEffect, and handleDelete logic remains the same ...

  // We are keeping this logic simple for now since it was functional.
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {/* ... */}; // Placeholder

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (applications.length === 0) return <div className="alert alert-info mt-5">No job applications found. Start by adding one!</div>;

  return (
    <div className="table-responsive"> 
      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th className="text-nowrap">Company Name</th>
            <th className="text-nowrap">Job Title</th>
            {/* Hide on small screens, show from medium (md) up */}
            <th className="d-none d-md-table-cell text-nowrap">Application Date</th> 
            <th className="text-nowrap">Status</th>
            <th className="text-nowrap">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            // CRITICAL FIX: Add 'align-middle' to center content vertically in all table cells
            <tr key={app._id} className="align-middle"> 
              <td>{app.companyName}</td>
              <td>{app.jobTitle}</td>
              <td className="d-none d-md-table-cell">{new Date(app.applicationDate).toLocaleDateString()}</td> 
              <td>
                <StatusBadge status={app.status} />
              </td>
              <td>
                <div className="d-flex flex-column flex-sm-row flex-nowrap align-items-center"> 
                    <button 
                      className="btn btn-sm btn-outline-primary me-sm-1 mb-1 mb-sm-0 w-100" 
                      onClick={() => console.log('Edit clicked for', app._id)}
                    >
                      ✏️ Edit 
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger w-100" 
                      onClick={() => handleDelete(app._id, app.companyName)}
                    >
                      🗑️ Delete
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;