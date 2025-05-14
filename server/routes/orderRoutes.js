const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: Import order controller when created
// const orderController = require('../controllers/orderController');

// Protected routes
router.get('/', auth, (req, res) => {
  res.json({ message: 'Get orders route working' });
});

router.post('/', auth, (req, res) => {
  res.json({ message: 'Create order route working' });
});

router.get('/:id', auth, (req, res) => {
  res.json({ message: 'Get order details route working' });
});

module.exports = router; 