const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const { generateItinerary } = require('../services/aiService');

// @desc    Create new trip & generate itinerary
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
    try {
        const { title, destination, startDate, endDate, budget, travelStyle, foodPreferences, accessibilityNeeds } = req.body;

        // 1. Create Trip document
        const trip = await Trip.create({
            user: req.user._id,
            title,
            destination,
            startDate,
            endDate,
            budget,
            travelStyle
        });

        // 2. Calculate duration in days
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        // 3. Generate Itinerary via AI
        const aiResponse = await generateItinerary({
            destination,
            budget,
            days,
            travelStyle,
            foodPreferences,
            accessibilityNeeds
        });

        // 4. Save Itinerary
        const itinerary = await Itinerary.create({
            trip: trip._id,
            days: aiResponse.days,
            totalEstimatedCost: aiResponse.totalEstimatedCost,
            localTips: aiResponse.localTips,
            packingChecklist: aiResponse.packingChecklist
        });

        // 5. Update Trip with itinerary reference
        trip.itineraryId = itinerary._id;
        await trip.save();

        res.status(201).json({ trip, itinerary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Trip creation failed', error: error.message });
    }
};

// @desc    Get user trips
// @route   GET /api/trips
// @access  Private
const getUserTrips = async (req, res) => {
    const trips = await Trip.find({
        $or: [
            { user: req.user._id },
            { collaborators: req.user._id }
        ]
    }).populate('user', 'name email');
    res.json(trips);
};

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Private
const getTripById = async (req, res) => {
    const trip = await Trip.findById(req.params.id).populate('user', 'name email').populate('collaborators', 'name email');

    if (trip) {
        const itinerary = await Itinerary.findOne({ trip: trip._id });
        res.json({ trip, itinerary });
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
};

module.exports = { createTrip, getUserTrips, getTripById };
