// models/cartModel.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true,  // Link to the offer added to the cart
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // The user who added the offer to the cart
  },
  price: {
    type: Number,
    required: true,  // The original price of the offer
  },
  status: {
    type: String,
    enum: ['none', 'waiting', 'approved', 'rejected'],
    default: 'none'
  }
});

module.exports = mongoose.model('Cart', cartSchema);