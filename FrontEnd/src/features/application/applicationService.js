import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const API_URL = `${API_BASE_URL}/api/applications/`;

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

// Get applicants for a job (Employer)
const getJobApplicants = async (jobId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + 'job/' + jobId, config);
    return response.data;
};

const applicationService = {
    applyForJob,
    getMyApplications,
    getAllApplications,
    getJobApplicants,
};

export default applicationService;
