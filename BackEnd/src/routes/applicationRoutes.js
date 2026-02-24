const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getMyApplications,
    getJobApplicants,
    getAllApplications,
    updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, employer } = require('../middleware/authMiddleware');

router.post('/', protect, applyForJob);
router.get('/my-applications', protect, getMyApplications);
router.get('/job/:jobId', protect, getJobApplicants);
router.get('/all', protect, getAllApplications);
router.put('/:id/status', protect, updateApplicationStatus);

module.exports = router;
