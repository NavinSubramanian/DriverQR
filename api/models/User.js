// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uniqueIdentifier: { type: String, required: true, unique: true },
  userDetails: {
    phoneNumber: String,
    address: String,
    bloodGroup: String,
    // Add other user details as needed
  },
  qrCodeData: { type: String, required: true, unique: true }, // Include qrCodeData field
});

module.exports = mongoose.model('User', userSchema);
