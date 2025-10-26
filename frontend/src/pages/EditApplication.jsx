
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm/ApplicationForm';
import { getApplication, updateApplication } from '../services/apiService';

const EditApplication = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Fetch the application's current details when the page loads
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await getApplication(id); 
                setInitialData(data);
            } catch (err) {
                console.error("Error fetching application details:", err);
                setError('Failed to load application details for editing. It may not exist.');
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [id]);

    // 2. Handle the update submission from the form
    const handleUpdateSubmission = async (updatedData) => {
        try {
            await updateApplication(id, updatedData);
            
            navigate('/', { state: { successMessage: 'Job application successfully updated!' } });
        } catch (err) {
            throw err; 
        }
    };

    if (loading) return <div className="text-center mt-5">Loading application data...</div>;
    if (error) return <div className="alert alert-danger mt-5">{error}</div>;
    if (!initialData) return <div className="alert alert-warning mt-5">No data found to edit.</div>;

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <ApplicationForm 
                    initialData={initialData} 
                    onSubmitSuccess={handleUpdateSubmission} 
                    isEditMode={true}
                />
            </div>
        </div>
    );
};

export default EditApplication;