# Dockerfile for WebSocket server
# Use official Node image
FROM node:20-alpine

# Create working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose port (Fly expects this)
EXPOSE 8080

# Start your app
CMD ["node", "index.js"]
