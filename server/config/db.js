const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luxonex';

// Connection options
const options = {
  autoIndex: true,
  authSource: 'admin',
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')); // Hide credentials in logs
    
    const conn = await mongoose.connect(MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    if (error.name === 'MongoServerError') {
      switch (error.code) {
        case 18:
          console.error('Authentication failed. Please check your username and password.');
          break;
        case 13:
          console.error('Not authorized to access the database. Please check user permissions.');
          break;
        default:
          console.error('MongoDB server error:', error.message);
      }
    } else if (error.name === 'MongooseServerSelectionError') {
      console.error('Could not connect to MongoDB server. Please check if MongoDB is running.');
    }
    
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;
