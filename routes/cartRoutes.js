// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCartItemsForUser, removeFromCart, checkoutWithOriginalPrice } = require('../controllers/cartController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Cart routes
router.post('/', authenticate, addToCart);
// router.get('/', authenticate, getCartItems);
router.get('/', authenticate, getCartItemsForUser); // Ensure the route is protected by the authenticate middleware
router.delete('/', authenticate, removeFromCart);
router.post('/checkout', authenticate, checkoutWithOriginalPrice);

module.exports = router;
