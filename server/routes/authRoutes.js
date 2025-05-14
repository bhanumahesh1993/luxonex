const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', { email: req.body.email });
    await authController.register(req, res);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', { email: req.body.email });
    await authController.login(req, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

router.post('/verify-email', async (req, res) => {
  try {
    console.log('Email verification request received');
    await authController.verifyEmail(req, res);
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: error.message || 'Email verification failed' });
  }
});

router.post('/send-verification', async (req, res) => {
  try {
    console.log('Send verification email request received:', { email: req.body.email });
    await authController.resendVerification(req, res);
  } catch (error) {
    console.error('Send verification email error:', error);
    res.status(500).json({ message: error.message || 'Failed to send verification email' });
  }
});

// Protected routes
router.get('/me', auth, async (req, res) => {
  try {
    console.log('Get current user request received');
    await authController.getCurrentUser(req, res);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: error.message || 'Failed to get current user' });
  }
});

module.exports = router; 