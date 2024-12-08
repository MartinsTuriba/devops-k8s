FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy the built application files
COPY build/ .

# Copy nginx configuration if you have one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
