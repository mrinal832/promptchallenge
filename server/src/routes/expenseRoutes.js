const express = require('express');
const router = express.Router();
const { addExpense, getTripExpenses, getExpenseAnalytics } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addExpense);
router.get('/trip/:tripId', protect, getTripExpenses);
router.get('/trip/:tripId/analytics', protect, getExpenseAnalytics);

module.exports = router;
