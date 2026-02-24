const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['seeker', 'employer', 'admin'],
            default: 'seeker',
        },
        phone: {
            type: String,
            // required: [true, 'Please add a phone number'], // Make optional for existing users
        },
        mobileVerified: {
            type: Boolean,
            default: false,
        },
        mobileOtp: String,
        mobileOtpExpire: Date,
        resetPasswordOtp: String,
        resetPasswordExpire: Date,
        savedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Job',
            },
        ],
        headline: {
            type: String,
            maxLength: 150,
        },
        resume: {
            type: String, // URL/Path to resume file
        },
        skills: {
            type: [String],
            default: [],
        },
        experience: [
            {
                company: String,
                title: String,
                startDate: Date,
                endDate: Date,
                current: { type: Boolean, default: false },
                description: String,
            }
        ],
        education: [
            {
                institution: String,
                degree: String,
                fieldOfStudy: String,
                startDate: Date,
                endDate: Date,
                current: { type: Boolean, default: false },
            }
        ],
        // Employer specific fields
        companyName: String,
        companyBio: String,
        companyWebsite: String,
        companyLocation: String,
        companyLogo: {
            type: String,
            default: ''
        },
        hiringSteps: [
            {
                step: Number,
                title: String,
                description: String,
            }
        ],
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
