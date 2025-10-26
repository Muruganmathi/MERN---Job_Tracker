
const express = require('express');
const {
    createApplication,
    getApplications,
    getApplication,
    deleteApplication,
    updateApplication
} = require('../controllers/applicationController');

const router = express.Router();

// GET all job applications
router.get('/', getApplications);

// GET a single job application
router.get('/:id', getApplication);

// POST a new job application
router.post('/', createApplication);

// DELETE a job application
router.delete('/:id', deleteApplication);

// PATCH (Update) a job application
router.patch('/:id', updateApplication);

module.exports = router;