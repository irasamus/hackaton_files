const Offer = require('../models/offerModel'); // Offer model
const jwt = require('jsonwebtoken');

// Controller to create a new offer
exports.createOffer = async (req, res) => {

  try {
    const { address, type, amount, price } = req.body;

    // Validate inputs
    if (!address || !type || !amount || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Decode user from token
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create a new offer
    const offer = new Offer({
      address,
      type,
      amount,
      price,
      owner: decoded.id,
    });

    await offer.save();
    res.status(201).json({ message: 'Offer created successfully', offer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to list offers not belonging to the current user
exports.listOffers = async (req, res) => {
  try {
    // Decode user from token
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find offers not created by the current user
    const offers = await Offer.find({ userId: { $ne: decoded.id } });
    res.status(200).json({ offers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
