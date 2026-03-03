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
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, admin, createJob);
router.route('/:id').get(getJob).put(protect, admin, updateJob).delete(protect, admin, deleteJob);
router.post('/:id/save', protect, toggleSaveJob);

module.exports = router;
