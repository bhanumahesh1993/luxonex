const mongoose = require('mongoose');
require('dotenv').config({ path: '../server/.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxonex');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const createCollections = async () => {
  try {
    const db = mongoose.connection.db;

    // Create collections if they don't exist
    const collections = [
      'users',
      'products',
      'categories',
      'orders',
      'carts',
      'wishlists',
      'reviews'
    ];

    for (const collection of collections) {
      const exists = await db.listCollections({ name: collection }).hasNext();
      if (!exists) {
        await db.createCollection(collection);
        console.log(`Created collection: ${collection}`);
      }
    }

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('products').createIndex({ name: 1 });
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('orders').createIndex({ userId: 1 });
    await db.collection('orders').createIndex({ createdAt: -1 });

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
};

const setupDatabase = async () => {
  await connectDB();
  await createCollections();
  process.exit(0);
};

setupDatabase(); 