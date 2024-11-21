const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['solar', 'wind', 'water'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;