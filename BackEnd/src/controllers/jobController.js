const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find().populate('postedBy', 'name company');
    res.status(200).json(jobs);
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name company');

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    res.status(200).json(job);
});

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
const createJob = asyncHandler(async (req, res) => {
    if (req.user.role !== 'employer' && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to post jobs');
    }

    const job = await Job.create({
        ...req.body,
        postedBy: req.user.id,
    });

    res.status(201).json(job);
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Owner/Admin)
const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    // Check user ownership or admin status
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to update this job');
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedJob);
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Owner/Admin)
const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to delete this job');
    }

    await job.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
