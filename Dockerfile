# Use official Node.js image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (to leverage caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the backend port
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
