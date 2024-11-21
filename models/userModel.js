// /models/userModel.js

const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  ssn: { type: String, required: true }, // Social Security Number (SSN)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
