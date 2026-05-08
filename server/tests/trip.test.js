const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('../src/config/db');
const tripRoutes = require('../src/routes/tripRoutes');
const { errorHandler, notFound } = require('../src/middleware/errorMiddleware');

// Mock the AI service
jest.mock('../src/services/aiService', () => ({
    generateItinerary: jest.fn().mockResolvedValue({
        totalEstimatedCost: 1000,
        days: [
            {
                day: 1,
                activities: [{ name: 'Test Activity', startTime: '10:00', endTime: '12:00', location: { name: 'Test Place', address: 'Test Address' }, cost: 0, category: 'Sightseeing' }]
            }
        ],
        localTips: ['Test Tip'],
        packingChecklist: ['Test Item']
    })
}));

const app = express();
app.use(express.json());

// Mock auth middleware for testing
app.use((req, res, next) => {
    req.user = { _id: new mongoose.Types.ObjectId(), name: 'Test User' };
    next();
});

app.use('/api/trips', tripRoutes);
app.use(notFound);
app.use(errorHandler);

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Trip API', () => {
    it('should create a new trip and itinerary', async () => {
        const res = await request(app)
            .post('/api/trips')
            .send({
                title: 'Summer Vacation',
                destination: 'Paris',
                startDate: '2026-07-01',
                endDate: '2026-07-07',
                budget: 'Luxury',
                travelStyle: 'Relaxed'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('trip');
        expect(res.body).toHaveProperty('itinerary');
        expect(res.body.trip.destination).toBe('Paris');
    });

    it('should get user trips', async () => {
        const res = await request(app).get('/api/trips');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
