const express = require('express');
const router = express.Router();
const { handleAIChat } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, handleAIChat);

module.exports = router;
