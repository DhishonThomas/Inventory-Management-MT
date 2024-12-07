# Use official node image as base
FROM node:16

# Set working directory in container
WORKDIR /app

# Install dependencies
COPY client/package*.json ./
RUN npm install

# Copy application files
COPY client/ ./
# Expose port (same as your frontend app listens on)

RUN npm run build
 
EXPOSE 4173

# Start the app
CMD ["npm", "start","preview"]
