const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// TODO: Import category controller when created
// const categoryController = require('../controllers/categoryController');

// Public routes
router.get('/', (req, res) => {
  res.json({ message: 'Get categories route working' });
});

// Protected routes
router.post('/', auth, (req, res) => {
  res.json({ message: 'Create category route working' });
});

router.put('/:id', auth, (req, res) => {
  res.json({ message: 'Update category route working' });
});

router.delete('/:id', auth, (req, res) => {
  res.json({ message: 'Delete category route working' });
});

module.exports = router; 