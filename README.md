# TripSync AI ✈️🤖
> The Future of Intelligent Travel Planning

TripSync AI is a production-grade MERN stack application that leverages Google Gemini AI to generate hyper-personalized travel itineraries. Designed for high performance, accessibility, and real-time collaboration.

## 🌟 Key Features
- **AI-Powered Itinerary Engine**: Generates day-wise plans based on budget, style, and preferences using Gemini 1.5 Flash.
- **Real-Time Collaboration**: Shared itinerary editing and live updates via Socket.io.
- **Interactive Map Integration**: Route visualization and nearby attraction discovery using Google Maps & Places API.
- **Smart Budget Dashboard**: Advanced expense tracking with data visualization using Recharts.
- **AI Travel Assistant**: A context-aware floating chatbot for on-the-go recommendations.
- **Glassmorphism UI**: High-end aesthetic with smooth Framer Motion animations.
- **Production Ready**: Fully Dockerized, secure (Helmet, Rate Limiting), and tested.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Redux Toolkit, Framer Motion, Socket.io-client.
- **Backend**: Node.js, Express, Socket.io, MongoDB (Mongoose), JWT.
- **AI**: Google Gemini API.
- **Maps**: Google Maps Platform.

## 🚀 Quick Start (Docker)
1. Clone the repository.
2. Create a `.env` file in the `server` directory with your API keys.
3. Run the following command:
   ```bash
   docker-compose up --build
   ```
4. Access the app at `http://localhost:5173`.

## 🧪 Testing
Run backend tests:
```bash
cd server
npm test
```

## 🏗 Architecture
The project follows a modular MVC (Model-View-Controller) architecture on the backend and a feature-based structure on the frontend for maximum scalability.

---
Built for the Hackathon by Antigravity AI.
