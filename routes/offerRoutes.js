const express = require('express');
const router = express.Router();
const { createOffer, listOffers } = require('../controllers/offerController'); // Import controller functions
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure user is authenticated
// Route to create a new offer
router.post('/offers', authMiddleware.authenticate, createOffer);

// Route to list all offers not belonging to the current user
router.get('/offers', authMiddleware.authenticate, listOffers);

module.exports = router; // Export the router
