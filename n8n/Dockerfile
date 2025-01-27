# Use Node.js 20 as base image
FROM node:20

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

# Clone n8n repository
RUN git clone https://github.com/n8n-io/n8n.git .

# Install dependencies and build project
RUN pnpm install && pnpm run build

# Expose n8n default port
EXPOSE 5678

# Start command
CMD ["pnpm", "start"]
