// components/QRCodeScanner.js

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function QRCodeScanner() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQRCodeData(data);
      setError(null);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error scanning QR Code');
  };

  return (
    <div className='qrVideo'>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {error && <p>{error}</p>}
      {qrCodeData && (
        <div>
          <h2>QR Code Data</h2>
          <p>{qrCodeData}</p>
        </div>
      )}
    </div>
  );
}

export default QRCodeScanner;
