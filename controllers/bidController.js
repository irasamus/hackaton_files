// controllers/bidController.js
const Bid = require('../models/bidModel');
const Cart = require('../models/cartModel');
const Offer = require('../models/offerModel'); // Assuming you have an Offer model

// Place a bid (offer a new price)
const placeBid = async (req, res) => {
  const { cartId, offeredPrice } = req.body;

  try {
    const cartItem = await Cart.findById(cartId).populate('offer');

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.user.toString() === req.user.id.toString()) {
      return res.status(400).json({ message: 'You cannot bid on your own item' });
    }

    const newBid = new Bid({
      offer: cartItem.offer,
      user: req.user.id,
      offeredPrice,
    });

    const savedBid = await newBid.save();

    res.status(201).json({
      message: 'Bid placed successfully, waiting for seller to respond',
      bid: savedBid,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error placing bid', error });
  }
};

// View bids placed by users for the seller's offers
const getBidsForSeller = async (req, res) => {
  try {
    const bids = await Bid.find({ offer: { owner: req.user.id } }).populate('user');

    if (bids.length === 0) {
      return res.status(404).json({ message: 'No bids found' });
    }

    res.status(200).json({
      message: 'Bids fetched successfully',
      bids,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bids', error });
  }
};

// Update bid status (approve or reject)
const updateBidStatus = async (req, res) => {
  const { bidId, action } = req.body;

  try {
    const bid = await Bid.findById(bidId).populate('user');

    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    if (bid.offer.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Only the seller can approve/reject the bid' });
    }

    if (action === 'approve') {
      bid.status = 'approved';
    } else if (action === 'reject') {
      bid.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await bid.save();

    res.status(200).json({
      message: `Bid status updated to ${bid.status}`,
      bid,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating bid status', error });
  }
};

module.exports = {
  placeBid,
  getBidsForSeller,
  updateBidStatus,
};
