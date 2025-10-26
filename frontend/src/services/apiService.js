
const API_BASE_URL = 'http://localhost:4000/api/applications'; 

// --- READ ALL ---
export const fetchApplications = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching applications:", error);
        throw error;
    }
};

// --- READ ONE ---
export const getApplication = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Application not found: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching application ${id}:`, error);
        throw error;
    }
};

// --- CREATE ---
export const createApplication = async (newAppData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAppData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create application due to server error.');
        }
        return data;
    } catch (error) {
        console.error("Error creating application:", error);
        throw error; 
    }
};

// --- UPDATE ---
export const updateApplication = async (id, updatedAppData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedAppData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update application due to server error.');
        }
        return data;
    } catch (error) {
        console.error(`Error updating application ${id}:`, error);
        throw error;
    }
};

// --- DELETE ---
export const deleteApplication = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return response.status === 204 ? {} : await response.json(); 
    } catch (error) {
        console.error(`Error deleting application ${id}:`, error);
        throw error;
    }
};
