const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./src/models/Job');

dotenv.config();

const checkJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Job.countDocuments();
        console.log(`Total jobs in database: ${count}`);

        const activeCount = await Job.countDocuments({ status: 'active' });
        console.log(`Active jobs in database: ${activeCount}`);

        const jobs = await Job.find().limit(5);
        console.log('Sample jobs:', JSON.stringify(jobs, null, 2));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkJobs();
