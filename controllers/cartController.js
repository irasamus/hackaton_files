// controllers/cartController.js
const Cart = require('../models/cartModel');
const Offer = require('../models/offerModel'); // Assuming you have an Offer model

// Add an item to the cart
const addToCart = async (req, res) => {
  const { offerId } = req.body;

  try {
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    const newCartItem = new Cart({
      offer: offerId,
      user: req.user.id,
      price: offer.price, // Original price from the offer
    });

    const savedCartItem = await newCartItem.save();

    res.status(201).json({
      message: 'Item added to cart',
      cartItem: savedCartItem,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate('offer');

    res.status(200).json({
      message: 'Cart items fetched successfully',
      cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  const { cartItemId } = req.body;

  try {
    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.remove();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

const getCartItemsForUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from decoded JWT token
    
    // Fetch the cart items for the logged-in user
    const cartItems = await Cart.find({ user: userId }).populate('offerId');
    
    return res.status(200).json({
      message: 'Cart items fetched successfully',
      cartItems
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

// Checkout with original price (no bids)
const checkoutWithOriginalPrice = async (req, res) => {
  const { cartId } = req.body;

  try {
    const cartItem = await Cart.findById(cartId).populate('offer');

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({
      message: 'Checkout successful with original price',
      offer: cartItem.offer,
      price: cartItem.price,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  checkoutWithOriginalPrice,
  getCartItemsForUser
};