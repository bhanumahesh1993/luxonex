const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: Import user controller when created
// const userController = require('../controllers/userController');

// Protected routes
router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Get profile route working' });
});

router.put('/profile', auth, (req, res) => {
  res.json({ message: 'Update profile route working' });
});

module.exports = router; 