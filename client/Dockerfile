# Base image
FROM node:20

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Set the environment variable to production
# ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview", "--", "--host"]