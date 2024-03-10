// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uniqueIdentifier: { type: String, required: true, unique: true },
  userDetails: {
    personName: String,
    emergencyNumber: String,
    gender: String,
    phoneNumber: String,
    address: String,
    bloodGroup: String,
    profileImage: String,
    disease: String,
    allergies: String,
    regularHospital: String,
    doctor:String,
  },
  qrCodeData: { type: String, required: true, unique: true }, 
});

module.exports = mongoose.model('User', userSchema);
