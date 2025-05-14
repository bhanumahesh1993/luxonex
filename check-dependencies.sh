#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Frontend dependencies
echo "Checking frontend dependencies..."
cd frontend
npm install
cd ..

# Server dependencies
echo "Checking server dependencies..."
cd server
npm install
cd ..

echo "All dependencies have been installed successfully!" 