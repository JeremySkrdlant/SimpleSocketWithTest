# Use the official Nginx image
FROM nginx:alpine

# Copy the static HTML file into the container
COPY test.html /usr/share/nginx/html/index.html
COPY socketTest.css /usr/share/nginx/html/socketTest.css
COPY socketTester.js /usr/share/nginx/html/socketTester.js 

# Expose the port Nginx will listen on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]