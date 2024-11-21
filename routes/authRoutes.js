// /routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Sign-Up Route
router.post('/signup', authController.signUp);

// Sign-In Route
router.post('/signin', authController.signIn);

// Example of a protected route
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route', user: req.user });
});

module.exports = router;
