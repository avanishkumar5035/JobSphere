const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'avanish@gmail.com' });
        if (user) {
            console.log('User found:', { email: user.email, role: user.role });
        } else {
            console.log('User NOT found with email avanish@gmail.com');
            const allUsers = await User.find({}, 'email role');
            console.log('Available users:', allUsers);
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUser();
