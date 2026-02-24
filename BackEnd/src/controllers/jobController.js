const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
    const {
        keyword,
        location,
        type,
        experience,
        workMode,
        minSalary,
        maxSalary,
        sortBy
    } = req.query;

    const query = {};

    // Keyword search (title, company, description)
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { company: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
        ];
    }

    // Location filter
    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }

    // Job Type filter (can be array or single string)
    if (type) {
        const types = Array.isArray(type) ? type : type.split(',');
        query.type = { $in: types };
    }

    // Work Mode filter
    if (workMode) {
        const modes = Array.isArray(workMode) ? workMode : workMode.split(',');
        query.workMode = { $in: modes };
    }

    // Experience filter (jobs requiring up to 'experience' years)
    if (experience) {
        query.experience = { $lte: Number(experience) };
    }

    // Salary filters
    if (minSalary) {
        query.maxSalary = { $gte: Number(minSalary) };
    }
    if (maxSalary) {
        query.minSalary = { $lte: Number(maxSalary) };
    }

    // Status filter - only active jobs usually
    query.status = 'active';

    let jobsQuery = Job.find(query).populate('postedBy', 'name company');

    // Sorting
    if (sortBy === 'newest') {
        jobsQuery = jobsQuery.sort({ createdAt: -1 });
    } else if (sortBy === 'oldest') {
        jobsQuery = jobsQuery.sort({ createdAt: 1 });
    } else if (sortBy === 'salary-high') {
        jobsQuery = jobsQuery.sort({ maxSalary: -1 });
    } else {
        jobsQuery = jobsQuery.sort({ createdAt: -1 }); // Default to newest
    }

    const jobs = await jobsQuery;
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

// @desc    Save/Unsave job
// @route   POST /api/jobs/:id/save
// @access  Private
const toggleSaveJob = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const jobId = req.params.id;

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const isSaved = user.savedJobs.includes(jobId);

    if (isSaved) {
        // Remove from savedJobs
        user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
    } else {
        // Add to savedJobs
        user.savedJobs.push(jobId);
    }

    await user.save();
    res.status(200).json({ saved: !isSaved, savedJobs: user.savedJobs });
});

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    toggleSaveJob,
};
