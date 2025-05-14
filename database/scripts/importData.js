const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
require('dotenv').config();

// Import database models
const { 
  Sofa, Chair, DiningTable, Bed, StorageSideboard, 
  CoffeeTable, Console, Desk, Cabinet, Ottoman, SideTable, Product 
} = require('../../server/models');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Parse Excel file
const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const result = {};
  
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    result[sheetName] = xlsx.utils.sheet_to_json(sheet, { defval: null });
  });
  
  return result;
};

// Transform data for database insertion
const transformData = (sheetName, data) => {
  // Custom transformations for each product type
  // This is a placeholder - implement the actual transformations based on your schema
  switch (sheetName) {
    case 'Sofas':
      return data.map(item => ({
        name: item['ITEM NAME'] || 'Unknown Sofa',
        description: item['DESCRIPTION'] || '',
        price: Number(item['CP Of luxurio (Pretax)']) || 0,
        cost: Number(item['Rate']) || 0,
        margin: Number(item['Margin %']) || 0,
        category: 'Sofa',
        subCategory: item['Sofa Category'] || '',
        sofaCategory: item['Sofa Category'] || '3 Seater',
        dimensions: {
          length: Number(item['Length in Size']) || 0,
          width: 0, // Add if available in data
          height: 0, // Add if available in data
          unit: 'feet'
        },
        seatUpholstery: {
          catalogName: item['Catlouge Name'] || '',
          serialNo: item['S.NO'] || '',
          fabricQuantity: Number(item['Qty of fabric in meter']) || 0,
          price: Number(item['Price']) || 0,
          style: item['Seat Style'] || ''
        },
        // Transform other properties similarly
      }));
    
    case 'chairs':
      // Similar transformation for chairs
      return data.map(item => ({
        name: item['NAME'] || 'Unknown Chair',
        description: item['DESCRIPTION'] || '',
        // Other properties
      }));
    
    // Add cases for all other product types
    
    default:
      return data;
  }
};

// Import data for each product type
const importData = async () => {
  try {
    const excelData = parseExcel(path.join(__dirname, '../data/Luxurio.xlsx'));
    
    // Clear existing data (optional)
    await Promise.all([
      Sofa.deleteMany({}),
      Chair.deleteMany({}),
      DiningTable.deleteMany({}),
      Bed.deleteMany({}),
      StorageSideboard.deleteMany({}),
      CoffeeTable.deleteMany({}),
      Console.deleteMany({}),
      Desk.deleteMany({}),
      Cabinet.deleteMany({}),
      Ottoman.deleteMany({}),
      SideTable.deleteMany({}),
      Product.deleteMany({})
    ]);
    
    // Import sofas
    if (excelData['Sofas']) {
      const sofasData = transformData('Sofas', excelData['Sofas']);
      const insertedSofas = await Sofa.insertMany(sofasData);
      
      // Add to Product collection for unified queries
      await Promise.all(insertedSofas.map(sofa => {
        return Product.create({
          name: sofa.name,
          description: sofa.description,
          price: sofa.price,
          cost: sofa.cost,
          margin: sofa.margin,
          category: 'Sofa',
          subCategory: sofa.subCategory,
          productType: 'sofa',
          productId: sofa._id,
          dimensions: sofa.dimensions
        });
      }));
      
      console.log(`Imported ${insertedSofas.length} sofas`);
    }
    
    // Repeat for other product types
    // ...
    
    console.log('Data import completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Run the import
importData();
