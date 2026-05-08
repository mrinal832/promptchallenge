# Stage 1: Build the frontend
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build the backend and serve the frontend
FROM node:20-alpine
WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend source
COPY server/ ./server/

# Copy built frontend from Stage 1
COPY --from=client-build /app/client/dist ./client/dist

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the server
CMD ["node", "server/index.js"]
