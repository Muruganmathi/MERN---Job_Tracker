
import React, { useState } from 'react';
import ApplicationList from '../components/ApplicationList/ApplicationList';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0); 

    const handleListRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const location = useLocation();

    const successMessage = location.state?.successMessage;
    
    return (
        <>
            <h2 className="mb-4 text-center">
                <span role="img" aria-label="Clipboard">📋</span> All Job Applications
            </h2>
            
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {/* Pass the refresh trigger to the list component */}
            <ApplicationList refreshTrigger={refreshTrigger} onRefresh={handleListRefresh} />
        </>
    );
};

export default Home;