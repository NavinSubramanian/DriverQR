// components/QRCodeScanner.js

import React, { useState } from 'react';
import axios from 'axios';

function QRCodeScanner() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleScanQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/scan-qrcode', { qrCodeData });
      setUserData(response.data.user);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error scanning QR Code');
      setUserData(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Scan QR Code"
        value={qrCodeData}
        onChange={(e) => setQRCodeData(e.target.value)}
      />
      <button onClick={handleScanQRCode}>Scan QR Code</button>
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>User Details</h2>
          <p>Phone Number: {userData.userDetails.phoneNumber}</p>
          <p>Address: {userData.userDetails.address}</p>
          <p>Blood Group: {userData.userDetails.bloodGroup}</p>
          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
}

export default QRCodeScanner;
