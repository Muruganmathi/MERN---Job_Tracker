
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StatusBadge from '../StatusBadge/StatusBadge';
import { fetchApplications, deleteApplication } from '../../services/apiService'; 

const ApplicationList = ({ refreshTrigger }) => { 
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApplications();
        setApplications(data);
        setLoading(false);
      } catch (err) {
        
        setError('Failed to load applications. Ensure the backend server is running on port 4000 and the MongoDB URI is correct.');
        setLoading(false);
      }
    };
    
    loadApplications();
  }, [refreshTrigger]); 

  // --- DELETE HANDLER ---
  const handleDelete = async (id, companyName) => {
    if (window.confirm(`Are you sure you want to delete the application for ${companyName}? This action cannot be undone.`)) {
      try {
        await deleteApplication(id); 
        
        setApplications(applications.filter(app => app._id !== id));
        alert(`Application for ${companyName} successfully deleted.`);
      } catch (err) {
        console.error("Error deleting application:", err);
        setError('Failed to delete application. Please try again.');
      }
    }
  };

  // --- CONDITIONAL RENDERING ---
  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (applications.length === 0) return <div className="alert alert-info mt-5">No job applications found. Start by adding one!</div>;

  // --- TABLE RENDERING ---
  return (
    <div className="table-responsive"> 
      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th className="text-nowrap">Company Name</th>
            <th className="text-nowrap">Job Title</th>
            <th className="d-none d-md-table-cell text-nowrap">Application Date</th> 
            <th className="text-nowrap">Status</th>
            <th className="text-nowrap">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="align-middle"> 
              <td>{app.companyName}</td>
              <td>{app.jobTitle}</td>
              <td className="d-none d-md-table-cell">
                {new Date(app.applicationDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </td> 
              <td>
                <StatusBadge status={app.status} />
              </td>
              <td>
                <div className="d-flex flex-column flex-sm-row flex-nowrap align-items-center"> 
                    <button 
                      className="btn btn-sm btn-outline-primary me-sm-1 mb-1 mb-sm-0 w-100" 
              
                      onClick={() => navigate(`/edit/${app._id}`)} 
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