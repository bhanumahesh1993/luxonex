const mongoose = require('mongoose');

const sofaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  cost: { type: Number, required: true },
  margin: { type: Number, required: true },
  category: { type: String, default: 'Sofas' },
  subCategory: { type: String },
  sofaCategory: { type: String, enum: ['3 Seater', '2 Seater', 'L Shape', 'Sectional'] },
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    unit: { type: String, enum: ['cm', 'inch', 'feet'], default: 'cm' }
  },
  seatUpholstery: {
    catalogName: { type: String },
    serialNo: { type: String },
    fabricQuantity: { type: Number },
    price: { type: Number },
    style: { type: String }
  },
  materials: [{ type: String }],
  colors: [{ type: String }],
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Sofa = mongoose.model('Sofa', sofaSchema);

module.exports = Sofa;
