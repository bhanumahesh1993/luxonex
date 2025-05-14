const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: Import payment controller when created
// const paymentController = require('../controllers/paymentController');

// Protected routes
router.post('/create-payment-intent', auth, (req, res) => {
  res.json({ message: 'Create payment intent route working' });
});

router.post('/confirm-payment', auth, (req, res) => {
  res.json({ message: 'Confirm payment route working' });
});

module.exports = router; 