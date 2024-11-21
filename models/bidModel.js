// models/bidModel.js
const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true,  // Link to the offer the bid is placed on
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // The user who placed the bid
  },
  offeredPrice: {
    type: Number,
    required: true,  // The price the user is offering
  },
  status: {
    type: String,
    enum: ['waiting', 'approved', 'rejected'],
    default: 'waiting',  // Default status for new bids
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bid', bidSchema);