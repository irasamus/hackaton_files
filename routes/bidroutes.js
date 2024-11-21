// routes/bidRoutes.js
const express = require('express');
const { placeBid, getBidsForSeller, updateBidStatus } = require('../controllers/bidController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Bid routes
router.post('/place', authenticate, placeBid);
router.get('/seller-bids', authenticate, getBidsForSeller);
router.put('/status', authenticate, updateBidStatus);

module.exports = router;
