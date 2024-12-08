# Use official node image as base
FROM node:16

# Set working directory in container
WORKDIR /usr/src/app

# Install dependencies
COPY server/package*.json ./

RUN npm install

# Copy application files

COPY server/ ./  

# Expose port (same as your frontend app listens on)

EXPOSE 4000

# Start the app
CMD ["npm", "start"]
