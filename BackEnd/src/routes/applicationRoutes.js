const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getMyApplications,
    getJobApplicants,
    getAllApplications,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, applyForJob);
router.get('/my-applications', protect, getMyApplications);
router.get('/job/:jobId', protect, getJobApplicants);
router.get('/all', protect, getAllApplications);

module.exports = router;
