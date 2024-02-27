// frontend/src/components/QRCodeGenerator.js

import React, { useState } from 'react';
import axios from 'axios';

function QRCodeGenerator() {
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  // Add more state variables for other user details as needed

  const handleGenerateQRCode = async () => {
    try {
      // Call Backend API to generate QR code and save user details
      await axios.post('http://localhost:5000/generate-qrcode', {
        uniqueIdentifier: uniqueIdentifier,
        userDetails: {
          phoneNumber: phoneNumber,
          address: address,
          bloodGroup: bloodGroup,
          // Add other user details here
        },
      });
      alert('QR Code generated and user details saved successfully');
    } catch (error) {
      console.error(error);
      alert('Error generating QR Code');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Unique Identifier"
        value={uniqueIdentifier}
        onChange={(e) => setUniqueIdentifier(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Blood Group"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      />
      {/* Add input fields for other user details as needed */}
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
    </div>
  );
}

export default QRCodeGenerator;
