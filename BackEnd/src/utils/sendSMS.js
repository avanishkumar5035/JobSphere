const axios = require('axios');

/**
 * Sends an SMS OTP to a phone number.
 * Currently configured for Fast2SMS (Indian gateway).
 * Falls back to console logging if API KEY is missing.
 * 
 * @param {string} phone - Target phone number
 * @param {string} otp - 6-digit OTP code
 */
const sendSMS = async (phone, otp) => {
    const apiKey = process.env.FAST2SMS_API_KEY;

    // Always log to console for development/backup
    console.log(`\n=========================================`);
    console.log(`[ADMIN NOTIFICATION]`);
    console.log(`NEW OTP GENERATED FOR: ${phone}`);
    console.log(`OTP CODE: ${otp}`);
    console.log(`=========================================\n`);

    if (!apiKey) {
        console.log(`[NOTICE]: Add FAST2SMS_API_KEY to .env for real SMS.`);
        return { success: true, message: `OTP is: ${otp} (Logged to Terminal)` };
    }

    try {
        const cleanPhone = phone.replace(/\D/g, '').slice(-10);

        const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
                authorization: apiKey,
                variables_values: otp,
                route: 'otp',
                numbers: cleanPhone,
            }
        });

        if (response.data && response.data.return) {
            console.log(`[SMS SUCCESS] Real OTP sent to ${phone}`);
            return { success: true, message: 'OTP sent successfully to your mobile number' };
        } else {
            console.warn(`[SMS GATEWAY RESTRICTION]`, response.data.message);
            // Fallback success return so user isn't blocked by account verification issues
            return {
                success: true,
                message: `Gateway Restricted: ${response.data.message}. Code has been logged to your Backend Terminal for now.`
            };
        }
    } catch (error) {
        console.error(`[SMS API/NETWORK ERROR]`, error.message);
        return {
            success: true,
            message: 'Gateway Connection Failed. Code has been logged to your Backend Terminal for testing.'
        };
    }
};

module.exports = sendSMS;
