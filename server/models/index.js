const Product = require('./productModel');
const Sofa = require('./sofaModel');
const Chair = require('./chairModel');
// Import other models as needed

// Create placeholder models for models that haven't been fully implemented yet
const mongoose = require('mongoose');
const baseSchema = new mongoose.Schema({}, { strict: false });

const DiningTable = mongoose.model('DiningTable', baseSchema);
const Bed = mongoose.model('Bed', baseSchema);
const StorageSideboard = mongoose.model('StorageSideboard', baseSchema);
const CoffeeTable = mongoose.model('CoffeeTable', baseSchema);
const Console = mongoose.model('Console', baseSchema);
const Desk = mongoose.model('Desk', baseSchema);
const Cabinet = mongoose.model('Cabinet', baseSchema);
const Ottoman = mongoose.model('Ottoman', baseSchema);
const SideTable = mongoose.model('SideTable', baseSchema);

module.exports = {
  Product,
  Sofa,
  Chair,
  DiningTable,
  Bed,
  StorageSideboard,
  CoffeeTable,
  Console,
  Desk,
  Cabinet,
  Ottoman,
  SideTable
};
