const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: Import upload controller when created
// const uploadController = require('../controllers/uploadController');

// Protected routes
router.post('/image', auth, (req, res) => {
  res.json({ message: 'Upload image route working' });
});

module.exports = router; 