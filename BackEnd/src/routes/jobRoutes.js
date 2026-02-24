const express = require('express');
const router = express.Router();
const {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    toggleSaveJob,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, createJob);
router.route('/:id').get(getJob).put(protect, updateJob).delete(protect, deleteJob);
router.post('/:id/save', protect, toggleSaveJob);

module.exports = router;
