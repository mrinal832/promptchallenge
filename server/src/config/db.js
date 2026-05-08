const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'YOUR_MONGODB_ATLAS_URL') {
            console.warn('WARNING: No valid MONGODB_URI set. Running without database.');
            return;
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        console.warn('Server will continue without database connection.');
    }
};

module.exports = connectDB;
