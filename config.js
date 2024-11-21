require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  mongoURI: process.env.MONGO_URI, // MongoDB connection string from .env
  jwtSecret: process.env.JWT_SECRET, // JWT secret from .env
  web3Provider: process.env.WEB3_PROVIDER, // Web3 provider from .env
};
