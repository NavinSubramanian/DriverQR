import React, { useState } from 'react';
import axios from 'axios';

import logo from '../logo.png'
import Navbar from '../Navbar';

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
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    return randomString;
  };

  const printQRCodeContainer = () => {
    const printableContent = document.getElementById('codecontainer').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <div>
      <Navbar />
      <p style={{textAlign:'center',fontFamily:'',marginBottom:'40px',marginTop:'20px',fontSize:'30px',fontWeight:'600'}}>Mass qr generator...</p>
      <div style={{ textAlign: 'center',display:'flex',columnGap:'20px',alignItems:'center',justifyContent:'center' }}>
        <label className="label1" style={{fontSize:'15px',margin:"0"}}>
          Number of QR Codes:
          <input className="input1" style={{height:'10px',width:'60px',borderRadius:'6px',border:'1px solid #0000005c'}} type="number" id="numberOfCodes" value={numberOfCodes} onChange={(e) => setNumberOfCodes(e.target.value)} />
        </label>
        <button className="button3" onClick={generateQRCode}>Generate QR Codes</button>
        <button className="print-button" onClick={printQRCodeContainer}>Print</button>
      </div>
      {/* <h1>Mass QR Code Generator</h1>
      <label htmlFor="numberOfCodes">Number of QR Codes to Generate:</label>
      <input type="number" id="numberOfCodes" value={numberOfCodes} onChange={(e) => setNumberOfCodes(e.target.value)} />
      <button onClick={generateQRCode}>Generate QR Codes</button> */}
      <div id='codecontainer'>
        <div className="qr-code-container">
          {generatedCodes.map((code) => (
            <div key={code.generatedCodes} className="qr-code">
              <div className="qr-code-content">
                <div className="tilted-wrapper">
                  <p className="tilted-text">{code.uniqueIdentifier}</p>
                </div>
                <img src={code.qrCodeData} style={{height:'70px',width:'70px'}} alt={`QR Code for ${code.uniqueIdentifier}`} />
                <img style={{ height: '70.590551181px', width: '100.28346457px' }} src={logo} alt='Logo' />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div>
        {generatedCodes.map((code) => (
          <div key={code.generatedCodes}>
            <img src={code.qrCodeData} alt={`QR Code for ${code.uniqueIdentifier}`} />
            <p>Unique Identifier: {code.uniqueIdentifier}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MassQRCodeGenerator;
