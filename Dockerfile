FROM node:20-slim
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies for client
RUN cd client && npm install && npm run build

# Install dependencies for server
RUN cd server && npm install

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the server from the root
CMD ["node", "server/index.js"]
