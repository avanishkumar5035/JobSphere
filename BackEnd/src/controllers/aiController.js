const asyncHandler = require('express-async-handler');
const { GoogleGenAI } = require('@google/genai');

// @desc    Chat with AI Assistant
// @route   POST /api/ai/chat
// @access  Public
const chatWithAI = asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
        res.status(400);
        throw new Error('Please provide a message');
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        // Fallback response if no API key is provided
        return res.status(200).json({
            reply: "Hello! I am the JobSphere AI Assistant. My administrator hasn't configured my Gemini API key yet (`GEMINI_API_KEY`), so I'm currently running in limited offline mode. Once configured, I can provide real-time career advice, resume analysis, and platform guidance!"
        });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a helpful, professional, and friendly AI assistant for a premier job portal platform called JobSphere. 
Your goal is to help candidates and employers with their questions regarding jobs, careers, hiring, and using the platform. 
Provide concise, helpful, and optimistic answers.
User: ${message}`,
        });

        res.status(200).json({ reply: response.text });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ reply: "I'm having temporary trouble connecting to my neural network. Please try asking again later." });
    }
});

module.exports = {
    chatWithAI
};
