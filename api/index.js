const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const User = require('./models/User');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:1234@qrcode.x6cwqeu.mongodb.net/?retryWrites=true&w=majority&appName=Qrcode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.post('/generate-qrcode', async (req, res) => {
  try {
    // Generate QR Code
    const websiteUrl = 'https://driver-qr-pj2y.vercel.app/user-details/';
    const uniqueIdentifier = req.body.uniqueIdentifier;
    const qrCodeData = await QRCode.toDataURL(websiteUrl + uniqueIdentifier);

    // Save User and QR Code to Database
    const newUser = new User({
      uniqueIdentifier: req.body.uniqueIdentifier,
      userDetails: req.body.userDetails,
      qrCodeData: qrCodeData,
    });
    await newUser.save();

    res.status(200).json({ message: 'QR Code generated and saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating QR Code' });
  }
}); 


app.post('/scan-qrcode', async (req, res) => {
  try {
    const { qrCodeData } = req.body;
    
    // Find user by QR code data
    const user = await User.findOne({ qrCodeData });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error scanning QR Code' });
  }
});


app.get('/user-details/:uniqueNumber', async (req, res) => {
  try {
    const { uniqueNumber } = req.params;

    let user = await User.findOne({ uniqueIdentifier: uniqueNumber });

    if (!user) {
      return res.status(200).json({ message: 'User information not found', promptForInfo: true });
    }

    // If user found, send their details
    res.status(200).json({ user, promptForInfo: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

app.post('/user-details', async (req, res) => {
  try {
    const { uniqueIdentifier, userDetails } = req.body;

    // Check if user already exists
    let user = await User.findOne({ uniqueIdentifier });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with provided details
    const newUser = new User({
      uniqueIdentifier: uniqueIdentifier,
      userDetails: userDetails,
    });

    await newUser.save();

    res.status(200).json({ message: 'User details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving user details' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));