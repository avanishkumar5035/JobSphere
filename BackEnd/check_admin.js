const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

dotenv.config();
connectDB();

const checkAdmin = async () => {
    try {
        const admin = await User.findOne({ email: 'admin@example.com' });
        if (admin) {
            console.log('Admin User Found:');
            console.log('ID:', admin._id);
            console.log('Name:', admin.name);
            console.log('Email:', admin.email);
            console.log('Role:', admin.role);
            console.log('Password (Hashed):', admin.password);
        } else {
            console.log('Admin User NOT Found.');
        }

        const allUsers = await User.find({});
        console.log('Total Users:', allUsers.length);
        allUsers.forEach(u => console.log(`- ${u.email} (${u.role})`));

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

checkAdmin();
