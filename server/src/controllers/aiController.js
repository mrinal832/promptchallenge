const { chatWithAssistant } = require('../services/aiService');

// @desc    Chat with AI Assistant
// @route   POST /api/ai/chat
// @access  Private
const handleAIChat = async (req, res) => {
    try {
        const { message, context } = req.body;
        const response = await chatWithAssistant(message, context);
        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get AI response' });
    }
};

module.exports = { handleAIChat };
