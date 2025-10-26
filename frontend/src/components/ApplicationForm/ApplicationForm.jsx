
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
    companyName: '',
    jobTitle: '',
    applicationDate: new Date().toISOString().substring(0, 10),
    status: 'Applied',
};

const ApplicationForm = ({ initialData = INITIAL_STATE, onSubmitSuccess, isEditMode = false }) => {
    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});
    const [submissionError, setSubmissionError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (initialData.applicationDate) {
            initialData.applicationDate = new Date(initialData.applicationDate).toISOString().substring(0, 10);
        }
        setFormData(initialData);
    }, [initialData]);


    const validate = (data) => {
        let errors = {};
        
        if (!data.companyName || data.companyName.length < 3) {
            errors.companyName = 'Company Name is required and must be at least 3 characters.';
        }
        if (!data.jobTitle) {
            errors.jobTitle = 'Job Title is required.';
        }
        if (!data.applicationDate) {
            errors.applicationDate = 'Application Date is required.';
        } else {
            const date = new Date(data.applicationDate);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (date > today) {
                errors.applicationDate = 'Application Date cannot be in the future.';
            }
        }
        if (!data.status) {
             errors.status = 'Status is required.';
        }
        
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: null });
        }
        setSubmissionError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError(null);
        
        const validationErrors = validate(formData);
        setFormErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        
        const dataToSend = {
            ...formData,
            applicationDate: new Date(formData.applicationDate).toISOString()
        };

        setIsSubmitting(true);
        try {
            await onSubmitSuccess(dataToSend);

        } catch (err) {
            console.error("Submission error:", err);
            
            if (err.message.includes('validation failed')) {
                setSubmissionError('Form submission failed due to invalid data. Check required fields.');
            } else {
                setSubmissionError(err.message || 'Could not connect to server or unexpected error occurred.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
                <h4 className="mb-0">{isEditMode ? '✏️ Edit Job Application' : '➕ Add New Job Application'}</h4>
            </div>
            <div className="card-body">
                {submissionError && (
                    <div className="alert alert-danger" role="alert">
                        {submissionError}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Company Name Field */}
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">Company Name <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${formErrors.companyName ? 'is-invalid' : ''}`}
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="e.g., Gidy Tech"
                            required
                        />
                        {formErrors.companyName && <div className="invalid-feedback">{formErrors.companyName}</div>}
                    </div>

                    {/* Job Title Field */}
                    <div className="mb-3">
                        <label htmlFor="jobTitle" className="form-label">Job Title <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${formErrors.jobTitle ? 'is-invalid' : ''}`}
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="e.g., MERN Developer"
                            required
                        />
                        {formErrors.jobTitle && <div className="invalid-feedback">{formErrors.jobTitle}</div>}
                    </div>

                    {/* Application Date Field */}
                    <div className="mb-3">
                        <label htmlFor="applicationDate" className="form-label">Application Date <span className="text-danger">*</span></label>
                        <input
                            type="date"
                            className={`form-control ${formErrors.applicationDate ? 'is-invalid' : ''}`}
                            id="applicationDate"
                            name="applicationDate"
                            value={formData.applicationDate}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.applicationDate && <div className="invalid-feedback">{formErrors.applicationDate}</div>}
                    </div>

                    {/* Status Field */}
                    <div className="mb-4">
                        <label htmlFor="status" className="form-label">Status <span className="text-danger">*</span></label>
                        <select
                            className={`form-select ${formErrors.status ? 'is-invalid' : ''}`}
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        {formErrors.status && <div className="invalid-feedback">{formErrors.status}</div>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`btn w-100 ${isEditMode ? 'btn-primary' : 'btn-success'}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : (isEditMode ? 'Update Application' : 'Save Application')}
                    </button>
                    
                    <button
                        type="button"
                        className="btn btn-secondary w-100 mt-2"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;