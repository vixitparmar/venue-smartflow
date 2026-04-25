# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Cloud Run uses the PORT environment variable
ENV PORT 8080

# Nginx automatically processes templates in /etc/nginx/templates/
# and replaces environment variables.
# The result is written to /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
