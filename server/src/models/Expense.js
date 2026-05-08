const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Transport', 'Accommodation', 'Shopping', 'Sightseeing', 'Other']
    },
    date: {
        type: Date,
        default: Date.now
    },
    splitBetween: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: Number
    }]
}, {
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
