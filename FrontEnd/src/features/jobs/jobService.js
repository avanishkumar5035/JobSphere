import axios from 'axios';

const API_URL = 'http://localhost:5001/api/jobs/';

// Get all jobs
const getJobs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get single job
const getJob = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// Create new job
const createJob = async (jobData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, jobData, config);
    return response.data;
};

// Update job
const updateJob = async (id, jobData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, jobData, config);
    return response.data;
};

// Delete job
const deleteJob = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const jobService = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};

export default jobService;
