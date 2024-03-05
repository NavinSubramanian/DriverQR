import React, { useState } from 'react';
import axios from 'axios';

const MassQRCodeGenerator = () => {

  const [numberOfCodes, setNumberOfCodes] = useState(0);
  const [generatedCodes, setGeneratedCodes] = useState([]);

  const generateQRCode = async () => {
    try {
      const codes = [];
      for (let i = 0; i < numberOfCodes; i++) {
        const uniqueIdentifier = generateRandomString();
        const response = await axios.post('https://driver-qr.vercel.app/generate-qrcode', {
          uniqueIdentifier: uniqueIdentifier,
          userDetails: {
            phoneNumber: '',
            personName: '',
            emergencyNumber: '',
            gender: '',
            address: '',
            bloodGroup: '',
          }
        });
        codes.push({ uniqueIdentifier: uniqueIdentifier, qrCodeData: response.data.qrCodeData });
      }
      setGeneratedCodes(codes);
    } catch (error) {
      console.error(error);
      alert('Error generating QR Codes');
    }
  };

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    return randomString;
  };

  return (
    <div>
      <h1>Mass QR Code Generator</h1>
      <label htmlFor="numberOfCodes">Number of QR Codes to Generate:</label>
      <input type="number" id="numberOfCodes" value={numberOfCodes} onChange={(e) => setNumberOfCodes(e.target.value)} />
      <button onClick={generateQRCode}>Generate QR Codes</button>
      <div>
        {generatedCodes.map((code) => (
          <div key={code.uniqueIdentifier}>
            <img src={code.qrCodeData} alt={`QR Code for ${code.uniqueIdentifier}`} />
            <p>Unique Identifier: {code.uniqueIdentifier}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MassQRCodeGenerator;
