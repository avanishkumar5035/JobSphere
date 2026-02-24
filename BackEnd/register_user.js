const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const registerSpecificUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Remove if exists
        await User.findOneAndDelete({ email: 'amit123@gmail.com' });

        // Create user
        await User.create({
            name: 'Amit Kumar',
            email: 'amit123@gmail.com',
            password: 'password123',
            role: 'seeker'
        });

        console.log('User amit123@gmail.com registered successfully with password123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

registerSpecificUser();
