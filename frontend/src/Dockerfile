# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# Serve the app on port 3000
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
