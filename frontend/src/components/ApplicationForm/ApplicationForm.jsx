// frontend/src/components/ApplicationForm/ApplicationForm.jsx

import React, { useState } from 'react';

const INITIAL_STATE = {
  companyName: '',
  jobTitle: '',
  applicationDate: new Date().toISOString().split('T')[0], 
  status: 'Applied',
};

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected'];

const ApplicationForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    [cite_start]// Company Name validation (required, minimum 3 characters) [cite: 14]
    if (!formData.companyName) {
      newErrors.companyName = 'Company Name is required.';
    } else if (formData.companyName.length < 3) {
      newErrors.companyName = 'Company Name must be at least 3 characters.';
    }

    [cite_start]// Job Title validation (required) [cite: 15]
    if (!formData.jobTitle) {
      newErrors.jobTitle = 'Job Title is required.';
    }

    [cite_start]// Application Date validation (required, cannot be a future date) [cite: 17]
    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application Date is required.';
    } else if (formData.applicationDate > today) { 
      newErrors.applicationDate = 'Application Date cannot be a future date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(''); 

    if (validateForm()) {
      console.log('Form is valid! Data:', formData);
      
      // *** PLACEHOLDER FOR BACKEND API CALL (TO BE ADDED LATER) ***
      alert('Application Validated on Frontend. Ready for Backend API Call!');
      setFormData(INITIAL_STATE); // Reset form on successful submission
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      {submissionError && (
        <div className="alert alert-danger" role="alert">{submissionError}</div>
      )}
      
      {/* Company Name Field */}
      <div className="mb-3"> 
        <label htmlFor="companyName" className="form-label">Company Name*:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
        />
        {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
      </div>

      {/* Job Title Field */}
      <div className="mb-3">
        <label htmlFor="jobTitle" className="form-label">Job Title*:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
        />
        {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}
      </div>

      {/* Application Date Field */}
      <div className="mb-3">
        <label htmlFor="applicationDate" className="form-label">Application Date*:</label>
        <input
          type="date"
          id="applicationDate"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          className={`form-control ${errors.applicationDate ? 'is-invalid' : ''}`}
        />
        {errors.applicationDate && <div className="invalid-feedback">{errors.applicationDate}</div>}
      </div>

      {/* Status Field (Select) */}
      <div className="mb-4">
        <label htmlFor="status" className="form-label">Status*:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-success w-100">
        Add Application
      </button>
    </form>
  );
};

export default ApplicationForm;