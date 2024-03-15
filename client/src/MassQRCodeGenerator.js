import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.png'
import Flanzer from './images/flanzer.png'
import './app.css'

import Navbar from './components/Navbar';

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
            age:'',
            personName: '',
            emergencyNumber: '',
            gender: '',
            address: '',
            bloodGroup: '',
            profileImage: '',
            disease: '',
            allergies: '',
            regularHospital: '',
            doctor: '',
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
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Codes</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
            <style>
              *{
                margin:0;
                padding:0;
                font-family:'Poppins'
              }
              .qr-code-container {
                display: flex;
                flex-wrap: wrap;  
                margin-top: 30px;
              }
              
              .qr-code-row {
                display: flex;
                justify-content: center;
              }
              
              .qr-code {
                width: 173px;
                height: 71px;
                align-items: flex-end;
              }
              .qr-code-content {
                display: flex;
                align-items: center;
              }
              
              .qr-code img {
                margin-left: 1px;
              }
              
              
              .tilted-wrapper {
                display: flex;
                align-items: center;
              }
              
              .tilted-text {
                writing-mode: vertical-lr;
                text-orientation: upright;
                font-size: 4px;
                margin-right: 2px;
                letter-spacing: -2px;
              }
              .float,.floatdiv{
                position: absolute;
              }
              .float,.floatdiv>h6{
                font-size: 4px;
              }
              .float{
                top: 1.4px;
                left: 14px;
              }
              .floatdiv{
                bottom: 2px;
                display: flex;
                align-items: center;
                width: 100%;
                right: -4px;
                justify-content: space-around;
              }
              
            </style>
          </head>
          <body>${printableContent}</body>
        </html>
      `);
      printWindow.document.close();

      printWindow.print();
    } else {
      alert('Please allow pop-ups for this site to enable printing.');
    }
  };

  return (
    <div>
      <Navbar />
      <p style={{ textAlign: 'center', fontFamily: '', marginBottom: '40px', marginTop: '20px', fontSize: '30px', fontWeight: '600' }}>
        Mass QR Generator</p>

      <div style={{ textAlign: 'center', display: 'flex', columnGap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        <label className="label1" style={{ fontSize: '15px', margin: "0" }}>
          Number of QR Codes:
          <input className="input1" style={{ height: '10px', width: '60px', borderRadius: '6px', border: '1px solid #0000005c' }} type="number" id="numberOfCodes" value={numberOfCodes} onChange={(e) => setNumberOfCodes(e.target.value)} />
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
            <div key={code.generatedCodes} className="qr-code" style={{ height: '75.59px', width: '187.08661417px' }}>
              <div className="qr-code-content">
                <div style={{
                  display: 'flex', position: 'relative', height: '75.59px', width: '92.598px', alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <h6 className='float' style={{ fontSize: '5px', width: '100%', }}>SCAN FOR EMERGENCY/LOST</h6>

                  <div className='floatdiv'>
                    <h6 style={{ fontWeight: '300', display: 'flex', justifyContent: 'space-between', fontSize: '3px', alignItems: 'center', textAlign: 'center' }}>powered by <span style={{ marginLeft: '2px', fontWeight: '500', fontSize: '4px' }}>
                      <img src={Flanzer} style={{ height: '5px', width: '4.5px', position: 'relative', top: '1.2px', right: '1px' }}></img>
                      theflanzer.com
                    </span>
                    </h6>
                  </div>
                  <div className="tilted-wrapper">
                    <p className="tilted-text">{code.uniqueIdentifier}</p>
                  </div>
                  <img src={code.qrCodeData} style={{ height: '65px', width: '65px', }} alt={`QR Code for ${code.uniqueIdentifier}`} />
                </div>
                <img style={{ height: '76.724409449px', width: '92.598px' }} src={logo} alt='Logo' />
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
