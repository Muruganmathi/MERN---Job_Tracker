
const JobApplication = require('../models/JobApplication');
const mongoose = require('mongoose');

const sendError = (res, status, message) => {
    console.error(`Error ${status}: ${message}`);
    res.status(status).json({ error: message });
};

const getApplications = async (req, res) => {
    try {

        const applications = await JobApplication.find({}).sort({ applicationDate: -1 }); 
        res.status(200).json(applications);
    } catch (error) {
        sendError(res, 500, 'Could not fetch applications from the database.');
    }
};

const getApplication = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendError(res, 404, 'Invalid application ID format.');
    }

    try {
        const application = await JobApplication.findById(id);

        if (!application) {
            return sendError(res, 404, 'Application not found.');
        }

        res.status(200).json(application);
    } catch (error) {
        sendError(res, 500, 'Error retrieving application details.');
    }
};

// --- POST Create Application (Create) ---
const createApplication = async (req, res) => {
    try {
    
        const application = await JobApplication.create(req.body); 
        res.status(201).json(application);
    } catch (error) {
        if (error.name === 'ValidationError') {
          
            return sendError(res, 400, `JobApplication validation failed: ${error.message}`);
        }
        sendError(res, 500, 'Could not create application due to a server error.');
    }
};

// --- DELETE Application (Delete) ---
const deleteApplication = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendError(res, 404, 'Invalid application ID format.');
    }

    try {
        const application = await JobApplication.findByIdAndDelete(id);

        if (!application) {
            return sendError(res, 404, 'Application not found.');
        }

        res.status(200).json({ message: 'Application successfully deleted.', deletedId: id });
    } catch (error) {
        sendError(res, 500, 'Error deleting application.');
    }
};

// --- PATCH Update Application (Update) ---
const updateApplication = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendError(res, 404, 'Invalid application ID format.');
    }

    try {
        // Run validators on update, ensure only valid fields are updated
        const application = await JobApplication.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true } 
        );

        if (!application) {
            return sendError(res, 404, 'Application not found.');
        }

        res.status(200).json(application);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return sendError(res, 400, `JobApplication validation failed: ${error.message}`);
        }
        sendError(res, 500, 'Error updating application.');
    }
};

module.exports = {
    getApplications,
    getApplication,
    createApplication,
    deleteApplication,
    updateApplication
};