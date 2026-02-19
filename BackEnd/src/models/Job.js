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
