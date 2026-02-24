const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'harshit@gmail.com' });
        if (user) {
            console.log('User found:', { email: user.email, role: user.role, mobileVerified: user.mobileVerified });
        } else {
            console.log('User NOT found with email harshit@gmail.com');
            const allUsers = await User.find({}, 'email role');
            console.log('Available users:', allUsers);
        }
        process.exit();
    } catch (error) {
        process.exit(1);
    }
};

checkUser();
