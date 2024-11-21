// /controllers/authController.js

const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const {Web3} = require('web3');
const User = require('../models/userModel');
const { jwtSecret, web3Provider } = require('../config/config');  // Import from config.js

// Initialize Web3
const web3 = new Web3('http://130.240.135.29:8545'); // Your Web3 provider URL

// Sign-Up Controller
const signUp = async (req, res) => {
  const { email, password, confirmPassword, ssn } = req.body;

  // Validate email and passwords
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    email,
    passwordHash: hashedPassword,
    ssn, // Store SSN as plain text (be cautious)
  });

  await newUser.save();

  // Optionally, store SSN or user data on the blockchain
 // const ssnHash = web3.utils.sha3(ssn);  // Example of hashing SSN for blockchain
 // console.log(`SSN hashed for blockchain: ${ssnHash}`);

  // Return success message
  res.status(201).json({ message: 'User created successfully', email: newUser.email });
};

// Sign-In Controller
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Create JWT token
  const payload = { email: user.email, id:user._id };
  const token = jwt.encode(payload, jwtSecret);  // JWT encoding using the secret from config

  // Send the token and user data to the client
  res.status(200).json({
    message: 'Sign-in successful',
    token,
    user: {
      email: user.email,
      ssn: user.ssn,  // Include SSN in the response (be careful with privacy!)
      id: user._id,
    }
  });
};

module.exports = {
  signUp,
  signIn,
};
