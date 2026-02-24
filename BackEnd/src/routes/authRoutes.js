const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    getUsers,
    getEmployers,
    getCompanyById,
    deleteUser,
    forgotPassword,
    verifyOTP,
    resetPassword,
    updatePassword,
    sendMobileOtp,
    verifyMobileOtp,
    updateProfile,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.put('/reset-password', resetPassword);
router.put('/update-password', protect, updatePassword);
router.post('/send-mobile-otp', protect, sendMobileOtp);
router.post('/verify-mobile-otp', protect, verifyMobileOtp);
router.get('/me', protect, getMe);
router.get('/employers', getEmployers);
router.get('/companies/:id', getCompanyById);
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);
router.put('/profile', protect, upload.single('resumeFile'), updateProfile);

module.exports = router;
