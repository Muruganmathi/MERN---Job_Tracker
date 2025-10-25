// frontend/src/pages/AddApplication.jsx

import React from 'react';
import ApplicationForm from '../components/ApplicationForm/ApplicationForm';

const AddApplication = () => {
  return (
    <div className="card shadow p-4"> 
      <div className="card-body">
        <h2 className="card-title mb-4">➕ Add New Job Application</h2>
        <ApplicationForm />
      </div>
    </div>
  );
};

export default AddApplication;