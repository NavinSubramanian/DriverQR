import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo2.png'
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
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 16; i++) {
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
                /* margin-top: 30px; */
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
                letter-spacing: 1px;
              }
              .floatdiv>h6{
                font-size: 4px;
              }
              .floatdiv{
                bottom: 2px;
                display: flex;
                align-items: center;
                width: 100%;
                right: -4px;
                justify-content: space-around;
              }
              
              .sideLines{
                height: 100%;
                width: 7px;
                background-color: #ffdd00;
              }
                          
            </style>
          </head>
          <body>${printableContent}</body>
        </html>
      `);

  
      // const qrCodes = generatedCodes.map((code, index) => ({
      //   code,
      //   batch: Math.floor(index / 100) + 1, // Batch number (starting from 1)
      // }));
      // const batches = Array.from(new Set(qrCodes.map((qr) => qr.batch))); // Get unique batch numbers
  
      // batches.forEach((batchNum) => {
      //   const codesInBatch = qrCodes.filter((qr) => qr.batch === batchNum);
      //   const codesHtml = codesInBatch.map((qr) => qr.code).join('');
  
      //   printWindow.document.write(`
      //     <div class="qr-code-container">
      //       ${codesHtml}
      //     </div>
      //   `);
      //   printWindow.document.close();
  
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
      <div id='codecontainer' style={{}}>
        <div className="qr-code-container">
          {generatedCodes.map((code,index) => (
            <div key={code.generatedCodes} className="qr-code active" style={{display:'flex', backgroundColor:'black', height: '170.08px', width: '132.28px', justifyContent:'space-around' }}>
              {/* <div className='sideLines'></div> */}
              <div className="qr-code-content" style={{height:'100%',width:'55%',display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', position:'relative'}}>
                <h6 className='float' style={{ zIndex:'100',fontSize: '12.5px', letterSpacing:'1px', display:'flex', flexDirection:'column', alignItems:'center', color:'#ffdd00' }}><span style={{fontSize:'7px',color:'white'}}>SCAN FOR</span> EMERGENCY</h6>
                <img src={code.qrCodeData} style={{zIndex:'100', height: '60px', width: '90%',backgroundColor:'white'}} alt={`QR Code for ${code.uniqueIdentifier}`} />
                <h6 style={{ fontWeight: '600', display: 'flex', justifyContent: 'space-between', fontSize: '7.5px', alignItems: 'center', textAlign: 'center',color:'white',textTransform:'uppercase' }}>powered by </h6>
                <img style={{ height: '45px', width: '150%' }} src={logo} alt='Logo' />
                <h6 style={{color:'white',fontSize:'7.5px'}}>@rayyan_progear_official</h6>
              </div>
              {/* <div className='sideLines'></div> */}

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
