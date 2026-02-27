const mongoose = require('mongoose');

// Handle connection events for stability tracking
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established successfully');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    if (mongoose.connection.readyState === 0) {
        setTimeout(connectDB, 5000);
    }
});

const connectDB = async () => {
    // If already connected or connecting, don't attempt to connect again
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        });

        console.log(`MongoDB Connected Initial: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to Primary MongoDB: ${error.message}`);

        // Fallback to local MongoDB if primary fails
        const localUri = 'mongodb://localhost:27017/jobsphere';
        if (process.env.MONGO_URI !== localUri) {
            console.log('Attempting fallback to local MongoDB...');
            try {
                const localConn = await mongoose.connect(localUri, {
                    serverSelectionTimeoutMS: 5000,
                });
                console.log(`MongoDB Connected (Local Fallback): ${localConn.connection.host}`);
                return;
            } catch (localError) {
                console.error(`Local MongoDB fallback failed: ${localError.message}`);
            }
        }

        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;
