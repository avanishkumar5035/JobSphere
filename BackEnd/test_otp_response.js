const axios = require('axios');

const testOtp = async () => {
    try {
        // We need a logged in user for mobile OTP
        // Let's use forgot-password which is public
        const res = await axios.post('http://localhost:5002/api/auth/forgot-password', {
            email: 'seeker@example.com'
        });
        console.log('Response:', res.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testOtp();
