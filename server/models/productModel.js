const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  cost: { type: Number, required: true },
  margin: { type: Number, required: true },
  category: { type: String, required: true, index: true },
  subCategory: { type: String, index: true },
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    unit: { type: String, enum: ['cm', 'inch', 'feet'], default: 'cm' }
  },
  materials: [{ type: String }],
  colors: [{ type: String }],
  productType: { 
    type: String, 
    required: true,
    enum: [
      'sofa', 'chair', 'dining_table', 'bed', 'storage_sideboard',
      'coffee_table', 'console', 'desk', 'cabinet', 'ottoman', 'side_table'
    ]
  },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
