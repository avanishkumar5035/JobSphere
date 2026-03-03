const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const updatePassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, 'email password role');
        console.log(`Found ${users.length} users. Checking hashes...`);
        
        for (const user of users) {
             const userToSave = await User.findById(user._id);
             // Re-saving triggers the bcrypt pre-save hook IF the password field is modified
             // But we need to explicitly hash it if it's plaintext
             console.log(`Checking ${user.email} | Hash starts with $: ${userToSave.password.startsWith('$')}`);
             
             if (!userToSave.password.startsWith('$')) {
                 const salt = await bcrypt.genSalt(10);
                 const hashed = await bcrypt.hash(userToSave.password, salt);
                 await User.updateOne({ _id: user._id }, { $set: { password: hashed } });
                 console.log(`--> Fixed plaintext password for ${user.email}`);
             }
        }
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

updatePassword();
