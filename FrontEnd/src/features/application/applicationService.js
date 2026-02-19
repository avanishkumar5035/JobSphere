import axios from 'axios';

const API_URL = 'http://localhost:5001/api/applications/';

// Apply for a job
const applyForJob = async (jobId, applicationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, { jobId, ...applicationData }, config);
    return response.data;
};

// Get user's applications
const getMyApplications = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + 'my-applications', config);
    return response.data;
};

// Get all applications (Admin)
const getAllApplications = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + 'all', config);
    return response.data;
};

const applicationService = {
    applyForJob,
    getMyApplications,
    getAllApplications,
};

export default applicationService;
