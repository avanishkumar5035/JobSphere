import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const API_URL = `${API_BASE_URL}/api/applications`;

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const applyForJob = async (jobData) => {
    const response = await axios.post(API_URL, jobData, {
        headers: getAuthHeader(),
    });
    return response.data;
};

const getMyApplications = async () => {
    const response = await axios.get(`${API_URL}/my-applications`, {
        headers: getAuthHeader(),
    });
    return response.data;
};

const getJobApplicants = async (jobId) => {
    const response = await axios.get(`${API_URL}/job/${jobId}`, {
        headers: getAuthHeader(),
    });
    return response.data;
};

const updateApplicationStatus = async (applicationId, status) => {
    const response = await axios.put(`${API_URL}/${applicationId}/status`, { status }, {
        headers: getAuthHeader(),
    });
    return response.data;
};

const applicationService = {
    applyForJob,
    getMyApplications,
    getJobApplicants,
    updateApplicationStatus,
};

export default applicationService;
