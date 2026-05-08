const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    name: String,
    description: String,
    startTime: String,
    endTime: String,
    location: {
        name: String,
        lat: Number,
        lng: Number,
        address: String
    },
    cost: Number,
    category: String,
    notes: String
});

const dayPlanSchema = mongoose.Schema({
    day: Number,
    date: Date,
    activities: [activitySchema]
});

const itinerarySchema = mongoose.Schema({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
    },
    days: [dayPlanSchema],
    totalEstimatedCost: Number,
    optimizedRoute: Object // Storing route data from Google Maps
}, {
    timestamps: true
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
