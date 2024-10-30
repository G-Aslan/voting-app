# Base image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y postgresql-client

# Copy the rest of the app
COPY . .

# Expose port and run the app
EXPOSE 3001
CMD ["npm", "start"]
