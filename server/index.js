if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./src/config/db');
const { errorHandler, notFound } = require('./src/middleware/errorMiddleware');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB();

// Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

// Middleware
app.use(helmet({
    contentSecurityPolicy: false // Required for some frontend integrations
}));
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-trip', (tripId) => {
        socket.join(tripId);
        console.log(`User ${socket.id} joined trip: ${tripId}`);
    });

    socket.on('update-itinerary', (data) => {
        const { tripId, updates } = data;
        socket.to(tripId).emit('itinerary-updated', updates);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Make io accessible to routes
app.set('socketio', io);

app.use('/api/ai', require('./src/routes/aiRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/trips', require('./src/routes/tripRoutes'));
app.use('/api/expenses', require('./src/routes/expenseRoutes'));

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('(.*)', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.json({ message: 'TripSync AI API is running...' });
    });
}

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
