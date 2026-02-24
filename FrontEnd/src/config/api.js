// This config provides the base URL for the API
// In development, it connects to localhost
// In production, it connects to the deployed backend URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';
