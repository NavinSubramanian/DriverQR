import React, { useState } from 'react';
import Navbar from '../Navbar';
import Qrcode from './Qrcode';

const Details = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [group, setGroup] = useState('');
  const [address, setAddress] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleGenerateQRCode = () => {
    const details = {
      name,
      gender,
      primary,
      secondary,
      group,
      address,
    };

    localStorage.setItem('userData', JSON.stringify(details));

    setShowQRCode(true);
    setAnimate(true);
  };

  const handleClosePopup = () => {
    // Close the pop-up
    setShowQRCode(false);
    setAnimate(false);
  };

  const generateQRCode = () => {
    const details = {
      name,
      gender,
      primary,
      secondary,
      group,
      address,
    };

    const detailsString = JSON.stringify(details);
    return detailsString;
  };


  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='header'>
          <h1 style={{ textAlign: 'center', fontFamily: 'montserrat' }}>QR Generator - Provide Details</h1>
          <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }} />
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="gender">
            Gender
          </label>
          <select className="select-field" name="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="">--Select gender--</option>
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
            onChange={(e) => setPrimary(e.target.value)}
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
            onChange={(e) => setSecondary(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="group">
            Blood Group
          </label>
          <select className="select-field" name="group" onChange={(e) => setGroup(e.target.value)}>
            <option value="">--Select Bloog group--</option>
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
          <textarea className="textarea-field" onChange={(e) => setAddress(e.target.value)} />
        </div>

        <button className="button" type="button" onClick={handleGenerateQRCode}>
          Generate QR
        </button>

        <Qrcode
          detailsString={generateQRCode()}
          showQRCode={showQRCode}
          animate={animate}
          handleGenerateQRCode={() => { setShowQRCode(false); setAnimate(false); }}

        />
      </div>
    </div>
  );
};

export default Details;
