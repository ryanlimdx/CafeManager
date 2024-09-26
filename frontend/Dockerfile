# Frontend Dockerfile
# Use official Node.js image as the base image
FROM node:16-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the relevant (frontend) code to the container
COPY frontend/ ./

# Build the React app for production
RUN npm run build

# Use an official Nginx image to serve the frontend app
FROM nginx:alpine

# Copy build files to Nginx
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
