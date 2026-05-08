const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('../src/config/db');
const userRoutes = require('../src/routes/userRoutes');
const { errorHandler, notFound } = require('../src/middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

beforeAll(async () => {
    // In a real hackathon, you might use a memory DB or a test DB
    // For now, we simulate or connect to a test instance
    process.env.MONGODB_URI = 'mongodb://localhost:27017/tripsync_test';
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register user with existing email', async () => {
        const email = `test${Date.now()}@example.com`;
        await request(app)
            .post('/api/users')
            .send({ name: 'User 1', email, password: 'password' });
            
        const res = await request(app)
            .post('/api/users')
            .send({ name: 'User 2', email, password: 'password' });
        expect(res.statusCode).toEqual(400);
    });
});
