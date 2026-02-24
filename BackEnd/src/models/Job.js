const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a job title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        company: {
            type: String,
            required: [true, 'Please add a company name'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
            // Defaulting to Remote? Can be specific string too.
            default: 'Remote',
        },
        salary: {
            type: String,
            required: [true, 'Please add salary range'],
        },
        minSalary: {
            type: Number,
            default: 0
        },
        maxSalary: {
            type: Number,
            default: 0
        },
        experience: {
            type: Number,
            default: 0, // Min years required
        },
        workMode: {
            type: String,
            required: [true, 'Please add work mode'],
            enum: ['On-site', 'Remote', 'Hybrid'],
            default: 'On-site',
        },
        type: {
            type: String,
            required: [true, 'Please add job type'],
            enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [5000, 'Description cannot be more than 5000 characters'],
        },
        requirements: {
            type: [String],
            required: [true, 'Please add requirements'],
        },
        postedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        companyLogo: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['active', 'closed'],
            default: 'active'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Job', jobSchema);
