const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5177'].filter(Boolean),
    credentials: true
}));
app.use(express.json());

const path = require('path');

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/jobs', require('./src/routes/jobRoutes'));
app.use('/api/applications', require('./src/routes/applicationRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/uploads')));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(require('./src/middleware/errorMiddleware').errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    if (process.env.FAST2SMS_API_KEY) {
        console.log('Fast2SMS API Key loaded successfully');
    } else {
        console.log('WARNING: Fast2SMS API Key NOT found in .env');
    }
});

// Handle unhandled promise rejections (often DB connection errors)
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
    // For now, let's keep it running and just log so the server stays up
    console.log('Unhandled Rejection caught. Keeping server alive.');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    console.log('Uncaught Exception caught. Keeping server alive.');
});
