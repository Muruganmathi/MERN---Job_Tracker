
import React from 'react';
import ApplicationForm from '../components/ApplicationForm/ApplicationForm';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../services/apiService';

const AddApplication = () => {
    const navigate = useNavigate();

    const handleSubmission = async (formData) => {
 
        try {
            await createApplication(formData);
            
            navigate('/', { state: { successMessage: 'Job application successfully added!' } }); 

        } catch (err) {
     
            throw err;
        }
    };

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {/* Pass the submission handler down to the form */}
                    <ApplicationForm onSubmitSuccess={handleSubmission} />
                </div>
            </div>
        </>
    );
};

export default AddApplication;