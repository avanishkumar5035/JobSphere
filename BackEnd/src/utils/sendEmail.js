const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const message = {
        from: `${process.env.FROM_NAME || 'TalentBridge'} <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Support HTML emails
    };

    // Always log to console for development/backup
    console.log(`\n=========================================`);
    console.log(`[ADMIN NOTIFICATION - EMAIL]`);
    console.log(`NEW OTP GENERATED FOR: ${options.email}`);
    console.log(`SUBJECT: ${options.subject}`);
    console.log(`MESSAGE CONTENT: \n${options.message}`);
    console.log(`=========================================\n`);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log(`[NOTICE]: Add EMAIL_USER and EMAIL_PASS to .env for real Emails.`);
        return { success: true, message: 'OTP logged to terminal (Email not configured)' };
    }

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
