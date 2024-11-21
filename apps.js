require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes'); // Import offer routes
const cartRoutes = require('./routes/cartRoutes');
const bidRoutes = require('./routes/bidroutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', offerRoutes); // Add offer-related routes
app.use('/api/cart', cartRoutes);
app.use('/api/bid', bidRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
