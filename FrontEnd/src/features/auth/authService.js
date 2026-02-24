import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const API_URL = `${API_BASE_URL}/api/auth/`;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

// Get all users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + 'users', config);
    return response.data;
};

// Delete user
const deleteUser = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + 'users/' + id, config);
    return response.data;
};

// Update password
const updatePassword = async (currentPassword, newPassword, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + 'update-password', { currentPassword, newPassword }, config);
    return response.data;
};

// Send Mobile OTP
const sendMobileOtp = async (phone, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + 'send-mobile-otp', { phone }, config);
    return response.data;
};

// Verify Mobile OTP
const verifyMobileOtp = async (otp, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + 'verify-mobile-otp', { otp }, config);
    return response.data;
};

// Update profile
const updateProfile = async (profileData, token) => {
    // If profileData is FormData (contains files), axios automatically sets the correct Content-Type boundary
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // We do NOT manually set 'Content-Type': 'multipart/form-data' here. 
            // Axios will do it automatically when it detects FormData, keeping the boundary intact.
        },
    };
    const response = await axios.put(API_URL + 'profile', profileData, config);

    // If the endpoint returns the updated user (which it does), update local storage
    if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getUsers,
    deleteUser,
    updatePassword,
    sendMobileOtp,
    verifyMobileOtp,
    updateProfile,
};

export default authService;
