const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.ObjectId,
            ref: 'Job',
            required: true,
        },
        applicant: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['applied', 'reviewing', 'shortlisted', 'rejected', 'hired'],
            default: 'applied',
        },
        resumeLink: {
            type: String,
            // required: true // Can make optional or required based on file upload logic later
        },
        coverLetter: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate applications for the same job by the same user
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
