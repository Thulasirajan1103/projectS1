# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /server

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the Node.js server
CMD ["node", "server.js"]
