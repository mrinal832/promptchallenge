const express = require('express');
const router = express.Router();
const { createTrip, getUserTrips, getTripById } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createTrip)
    .get(protect, getUserTrips);

router.route('/:id')
    .get(protect, getTripById);

module.exports = router;
