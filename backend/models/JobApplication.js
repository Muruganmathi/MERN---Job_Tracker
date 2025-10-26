
const mongoose = require('mongoose');

const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'];

const jobApplicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required.'],
        trim: true,
        minlength: [3, 'Company name must be at least 3 characters.']
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required.'],
        trim: true
    },
    applicationDate: {
        type: Date,
        required: [true, 'Application date is required.'],
        validate: {
            validator: function(v) {
                // Ensure date is not in the future
                return v <= new Date();
            },
            message: props => `${props.value.toISOString().substring(0, 10)} is a future date. Application Date cannot be in the future.`
        }
    },
    status: {
        type: String,
        required: [true, 'Status is required.'],
        enum: {
            values: statusOptions,
            message: '{VALUE} is not a valid status.'
        },
        default: 'Applied'
    }
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;