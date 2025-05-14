const mongoose = require('mongoose');
require('dotenv').config({ path: '../server/.env' });

// Import models
const User = require('../server/models/User');
const Product = require('../server/models/Product');
const Category = require('../server/models/Category');

const categories = [
  {
    name: 'Living Room',
    slug: 'living-room',
    description: 'Furniture for your living room'
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Furniture for your bedroom'
  },
  {
    name: 'Dining Room',
    slug: 'dining-room',
    description: 'Furniture for your dining room'
  },
  {
    name: 'Office',
    slug: 'office',
    description: 'Furniture for your office'
  }
];

const products = [
  {
    name: 'Modern Sofa Set',
    description: 'Comfortable and stylish modern sofa set',
    price: 1299.99,
    category: 'living-room',
    images: ['/images/products/sofa-set.jpg'],
    stock: 10,
    features: ['Premium fabric', 'Sturdy frame', 'Easy to clean']
  },
  {
    name: 'Elegant Dining Table',
    description: 'Beautiful dining table for your home',
    price: 899.99,
    category: 'dining-room',
    images: ['/images/products/dining-table.jpg'],
    stock: 5,
    features: ['Solid wood', 'Seats 6', 'Modern design']
  },
  {
    name: 'Office Desk',
    description: 'Ergonomic office desk with storage',
    price: 499.99,
    category: 'office',
    images: ['/images/products/office-desk.jpg'],
    stock: 8,
    features: ['Spacious', 'Built-in storage', 'Cable management']
  }
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@luxonex.com',
  password: 'admin123', // This will be hashed
  role: 'admin'
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxonex');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories');

    // Create products with category references
    const productsWithCategories = products.map(product => ({
      ...product,
      category: createdCategories.find(cat => cat.slug === product.category)._id
    }));
    await Product.insertMany(productsWithCategories);
    console.log('Created products');

    // Create admin user
    await User.create(adminUser);
    console.log('Created admin user');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 