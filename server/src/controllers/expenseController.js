const Expense = require('../models/Expense');
const Trip = require('../models/Trip');

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
    const { tripId, title, amount, category, date, splitBetween } = req.body;

    const expense = await Expense.create({
        trip: tripId,
        user: req.user._id,
        title,
        amount,
        category,
        date,
        splitBetween
    });

    res.status(201).json(expense);
};

// @desc    Get expenses for a trip
// @route   GET /api/expenses/trip/:tripId
// @access  Private
const getTripExpenses = async (req, res) => {
    const expenses = await Expense.find({ trip: req.params.tripId }).populate('user', 'name');
    res.json(expenses);
};

// @desc    Get expense analytics for a trip
// @route   GET /api/expenses/trip/:tripId/analytics
// @access  Private
const getExpenseAnalytics = async (req, res) => {
    const expenses = await Expense.find({ trip: req.params.tripId });
    
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    res.json({ categoryTotals, totalSpent });
};

module.exports = { addExpense, getTripExpenses, getExpenseAnalytics };
