const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Trip = require('./src/models/Trip');
const Itinerary = require('./src/models/Itinerary');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB Connected for Seeding...');

        // Clear existing data
        await User.deleteMany();
        await Trip.deleteMany();
        await Itinerary.deleteMany();

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@tripsync.ai',
            password: 'password123', // Pre-save middleware will hash it again if we don't watch out, but User.create uses save()
            role: 'admin'
        });

        console.log('Seed data created successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
