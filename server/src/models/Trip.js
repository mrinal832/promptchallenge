const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    travelStyle: {
        type: String,
        required: true
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    itineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary'
    },
    status: {
        type: String,
        enum: ['planned', 'ongoing', 'completed'],
        default: 'planned'
    }
}, {
    timestamps: true
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
