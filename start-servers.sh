#!/bin/bash

# Function to check if a directory exists
check_directory() {
    if [ ! -d "$1" ]; then
        echo "Error: Directory $1 does not exist"
        exit 1
    fi
}

# Check if required directories exist
check_directory "server"
check_directory "frontend"

# Check if package.json exists in both directories
if [ ! -f "server/package.json" ]; then
    echo "Error: package.json not found in server directory"
    exit 1
fi

if [ ! -f "frontend/package.json" ]; then
    echo "Error: package.json not found in frontend directory"
    exit 1
fi

# Start server
echo "Starting server..."
cd server
npm run dev &
SERVER_PID=$!

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo "Shutting down servers..."
    kill $SERVER_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Register the cleanup function for when script is terminated
trap cleanup SIGINT SIGTERM

# Keep script running
wait 