const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Seeker)
const applyForJob = asyncHandler(async (req, res) => {
    const { jobId, resumeLink, coverLetter } = req.body;

    if (req.user.role !== 'seeker') {
        res.status(403);
        throw new Error('Only job seekers can apply for jobs');
    }

    const job = await Job.findById(jobId);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    // Check if already applied
    const applicationExists = await Application.findOne({
        job: jobId,
        applicant: req.user.id,
    });

    if (applicationExists) {
        res.status(400);
        throw new Error('You have already applied for this job');
    }

    const application = await Application.create({
        job: jobId,
        applicant: req.user.id,
        resumeLink,
        coverLetter,
    });

    res.status(201).json(application);
});

// @desc    Get user applications
// @route   GET /api/applications/my-applications
// @access  Private (Seeker)
const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({ applicant: req.user.id })
        .populate('job', 'title company location type')
        .sort('-createdAt');

    res.status(200).json(applications);
});

// @desc    Get applicants for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer)
const getJobApplicants = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    // Check if user is the job owner
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to view applicants for this job');
    }

    const applications = await Application.find({ job: req.params.jobId })
        .populate('applicant', 'name email')
        .sort('-createdAt');

    res.status(200).json(applications);
});

// @desc    Get all applications (Admin)
// @route   GET /api/applications/all
// @access  Private (Admin)
const getAllApplications = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }

    const applications = await Application.find({})
        .populate('job', 'title company')
        .populate('applicant', 'name email')
        .sort('-createdAt');

    res.status(200).json(applications);
});

module.exports = {
    applyForJob,
    getMyApplications,
    getJobApplicants,
    getAllApplications,
};
