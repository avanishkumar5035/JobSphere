const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'seeker',
        phone,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            mobileVerified: user.mobileVerified,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            mobileVerified: user.mobileVerified,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.headline = req.body.headline !== undefined ? req.body.headline : user.headline;
        user.skills = req.body.skills || user.skills;
        user.experience = req.body.experience || user.experience;
        user.education = req.body.education || user.education;
        // Phone can also be updated here if not handled separately
        if (req.body.phone && req.body.phone !== user.phone) {
            user.phone = req.body.phone;
            user.mobileVerified = false; // Reset verification if phone changes
        }

        // Handle resume file upload
        if (req.file) {
            // Store the path to the uploaded file. 
            // In a real app, you'd likely use Cloudinary or S3 here and store the URL.
            // For local storage, we store the relative path. Ensure uploads folder is static in server.js.
            user.resume = `/${req.file.path.replace(/\\/g, '/')}`;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            mobileVerified: updatedUser.mobileVerified,
            headline: updatedUser.headline,
            resume: updatedUser.resume,
            skills: updatedUser.skills,
            experience: updatedUser.experience,
            education: updatedUser.education,
            savedJobs: updatedUser.savedJobs,
            token: generateToken(updatedUser._id), // Optional: Refresh token
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users);
});

// @desc    Get all employers
// @route   GET /api/auth/employers
// @access  Public
const getEmployers = asyncHandler(async (req, res) => {
    const employers = await User.find({ role: 'employer' })
        .select('-password')
        .sort({ createdAt: -1 });
    res.json(employers);
});

// @desc    Get company details by ID
// @route   GET /api/auth/companies/:id
// @access  Public
const getCompanyById = asyncHandler(async (req, res) => {
    const company = await User.findOne({ _id: req.params.id, role: 'employer' }).select('-password');

    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    res.json(company);
});

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('There is no user with that email');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiration (10 minutes)
    user.resetPasswordOtp = otp;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    // Create reset URL (optional, we are using OTP directly)
    const message = `You requested a password reset. \n\nYour 6-digit OTP is: ${otp} \n\nThis OTP is valid for 10 minutes.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset OTP',
            message,
        });

        res.status(200).json({ success: true, message: 'OTP sent to email' });
    } catch (err) {
        console.error('Email failed to send. OTP is:', otp, err.message);
        // Instead of failing the entire flow because the user hasn't set up email credentials yet,
        // we'll send a success response but log the OTP to the console for testing.
        res.status(200).json({ success: true, message: 'OTP generated (Check server console if email is not configured)' });
    }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error('Please provide email and OTP');
    }

    const user = await User.findOne({
        email,
        resetPasswordOtp: otp,
        resetPasswordExpire: { $gt: Date.now() }, // Ensure OTP has not expired
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
});

// @desc    Reset Password
// @route   PUT /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
        res.status(400);
        throw new Error('Please provide all details');
    }

    // Find user and check if OTP is valid and not expired
    const user = await User.findOne({
        email,
        resetPasswordOtp: otp,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    // Set new password
    user.password = password;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpire = undefined;
    await user.save(); // Password will be hashed in the pre-save hook

    res.status(200).json({
        success: true,
        message: 'Password reset successful',
        token: generateToken(user._id)
    });
});

// @desc    Update Password
// @route   PUT /api/auth/update-password
// @access  Private
const updatePassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error('Please provide current and new password');
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check current password
    if (!(await user.matchPassword(currentPassword))) {
        res.status(401);
        throw new Error('Incorrect current password');
    }

    // Update password
    user.password = newPassword;
    await user.save(); // Password hashed in pre-save hook

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    });
});

// @desc    Send Mobile OTP
// @route   POST /api/auth/send-mobile-otp
// @access  Private
const sendMobileOtp = asyncHandler(async (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        res.status(400);
        throw new Error('Please provide a phone number');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save phone and OTP to user
    user.phone = phone;
    user.mobileOtp = otp;
    user.mobileOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.mobileVerified = false; // reset verification status if changing number
    await user.save({ validateBeforeSave: false });

    // Send actual SMS OTP
    const smsRes = await sendSMS(phone, otp);

    if (smsRes.success) {
        res.status(200).json({
            success: true,
            message: smsRes.message
        });
    } else {
        res.status(500);
        throw new Error(smsRes.message || 'Error sending SMS OTP');
    }
});

// @desc    Verify Mobile OTP
// @route   POST /api/auth/verify-mobile-otp
// @access  Private
const verifyMobileOtp = asyncHandler(async (req, res, next) => {
    const { otp } = req.body;

    if (!otp) {
        res.status(400);
        throw new Error('Please provide the OTP');
    }

    const user = await User.findById(req.user._id);

    if (!user || user.mobileOtp !== otp || user.mobileOtpExpire < Date.now()) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    // Verify success
    user.mobileVerified = true;
    user.mobileOtp = undefined;
    user.mobileOtpExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Mobile number verified successfully'
    });
});

module.exports = {
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
};
