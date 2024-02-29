// frontend/src/components/QRCodeGenerator.js

import React, { useState } from 'react';
import axios from 'axios';

import '../app.css'
import Navbar from '../Navbar'
import Login from './Login'

function QRCodeGenerator() {
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [personName, setPersonName] = useState('');
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleGenerateQRCode = async () => {
    try {
      const response = await axios.post('https://driver-qr.vercel.app/generate-qrcode', {
        uniqueIdentifier: uniqueIdentifier,
        userDetails: {
          phoneNumber: phoneNumber,
          personName: personName,
          emergencyNumber: emergencyNumber,
          gender: gender,
          address: address,
          bloodGroup: bloodGroup,
        },
      });
      console.log(response)
      alert('QR Code generated and user details saved successfully');
    } catch (error) {
      console.error(error);
      alert('Error generating QR Code');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='header'>
          <h1 style={{ textAlign: 'center'}}>QR Generator - Provide Details</h1>
          <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }} />
        </div>
        <div style={{ marginTop: '5px' }}>
          <label className="label" htmlFor="UniqueNumber">
            UniqueNumber
          </label>
          <input
            className="input-field"
            type="text"
            placeholder="UniqueKey..."
            name="Key"
            value={uniqueIdentifier}
            onChange={(e) => setUniqueIdentifier(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '5px' }}>
          <label className="label" htmlFor="Name">
            Name
          </label>
          <input
            className="input-field"
            type="text"
            placeholder="Name..."
            name="Name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="gender">
            Gender
          </label>
          <select className="select-field" name="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="" disabled>--Select gender--</option>
            <option value="M" >Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="Primary">
            Contact No
          </label>
          <input
            className="input-field"
            type="number"
            placeholder="Primary No..."
            name="Primary"
            step="0.01"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="Secondary">
            Emergency contact
          </label>
          <input
            className="input-field"
            type="number"
            placeholder="Emergency contact..."
            name="Secondary"
            step="0.01"
            value={emergencyNumber}
            onChange={(e) => setEmergencyNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="group">
            Blood Group
          </label>
          <select className="select-field" name="group" onChange={(e) => setBloodGroup(e.target.value)}>
            <option value="" disabled>--Select Bloog group--</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button className="button" type="button" style={{marginTop:'20px'}} onClick={handleGenerateQRCode}>
          Generate QR
        </button>

        {/* <Qrcode
          detailsString={generateQRCode()}
          showQRCode={showQRCode}
          animate={animate}
          handleGenerateQRCode={() => { setShowQRCode(false); setAnimate(false); }}

        /> */}
      </div>
    </div>
  );
}

export default QRCodeGenerator;
