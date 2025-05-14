const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: Import product controller when created
// const productController = require('../controllers/productController');

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Products route working' });
});

// Protected routes
router.post('/', auth, (req, res) => {
  res.json({ message: 'Create product route working' });
});

router.put('/:id', auth, (req, res) => {
  res.json({ message: 'Update product route working' });
});

router.delete('/:id', auth, (req, res) => {
  res.json({ message: 'Delete product route working' });
});

module.exports = router; 