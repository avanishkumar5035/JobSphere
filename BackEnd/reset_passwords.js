const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const resetPasswords = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const password = 'password123';

        // 1. Create or Update Admin (admin@example.com)
        const adminEmail = 'admin@example.com';
        let admin = await User.findOne({ email: adminEmail });
        if (!admin) {
            admin = new User({
                name: 'System Admin',
                email: adminEmail,
                password: password, // Will be hashed by pre-save hook
                role: 'admin',
                phone: '1234567890'
            });
            await admin.save();
            console.log(`Created admin user: ${adminEmail}`);
        } else {
            admin.password = password; // Will be hashed
            await admin.save();
            console.log(`Updated admin password: ${adminEmail}`);
        }

        // 2. Update Seeker (harshit@gmail.com)
        const seekerEmail = 'harshit@gmail.com';
        const seeker = await User.findOne({ email: seekerEmail });
        if (seeker) {
            seeker.password = password; // Will be hashed
            await seeker.save();
            console.log(`Updated seeker password: ${seekerEmail}`);
        } else {
            console.log(`Seeker ${seekerEmail} not found`);
        }

        // 3. Update Employer (talent@infosys.com)
        const authEmployerEmail = 'talent@infosys.com';
        const authEmployer = await User.findOne({ email: authEmployerEmail });
        if (authEmployer) {
            authEmployer.password = password; // Will be hashed
            await authEmployer.save();
            console.log(`Updated employer password: ${authEmployerEmail}`);
        } else {
            console.log(`Employer ${authEmployerEmail} not found`);
        }

        console.log('Password reset complete.');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        process.exit();
    }
};

resetPasswords();
