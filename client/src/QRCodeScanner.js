import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import call from './images/call.webp'
import ambulance from './images/ambulance.png'
import conversation from './images/conversation.png'
import cross from './images/cross.webp'
import card from './images/card.png'
import download from './images/download.png'
import history from './images/history.png'
import update from './images/update.png'

import Footer from './components/Footer'
import Navbar from './components/Navbar1';



function QRCodeScanner() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showInfoPrompt, setShowInfoPrompt] = useState(false);
  const { uniqueNumber } = useParams();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://driver-qr.vercel.app/user-details/${uniqueNumber}`);
      const user = response.data.user.userDetails;
      var existsInDB = true;
      if(user.address === ""){
        existsInDB=false;
      }
      if (existsInDB) {
        setUserDetails(user);
        setError(null);
      } else {
        setShowInfoPrompt(true);
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching user details');
    }
  };


  useEffect(() => {
    fetchUserDetails();
  }, [uniqueNumber]);

  const handleInfoSubmit = async (infoData) => {
    try {
      // Send request to backend
      await axios.post('https://driver-qr.vercel.app/update-details', {
        uniqueIdentifier: uniqueNumber,
        userDetails: infoData
      });
      console.log('User details saved successfully:');
      setShowInfoPrompt(true)
      await fetchUserDetails()
      // Handle success message or redirect to another page
    } catch (error) {
      console.error('Error saving user details:', error.message);
      // Handle error message or display it to the user
    }
  };

  const handleContactDownload = () => {
    const printableContent = document.getElementById('printable-content').innerHTML;
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
                font-family:'Poppins';
                color:black;
              }
              .showdetails{
                width:50vw;
                margin:0 auto;
                text-align:center;
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
  }

  return (
    <div style={{overflow:'hidden'}}>
      <nav className="navbar">
          <div className="left-section">
              <span className="logo">Scanhubgen</span>
          </div>
      </nav>
      <div>
        <p className='head' style={{ fontFamily: 'Poppins', fontSize: '25px', marginTop: '30px', width:'100%',textAlign:'center' }}>Welcome to Scanhubgen!</p>
      </div>

      <div id="details-container" style={{width:'100%',textAlign:'center',
          padding: '20px', '@media (max-width: 600px)': { padding: '10px' },
          '@media (min-width: 601px) and (max-width: 768px)': { padding: '15px' }, '@media (min-width: 769px) and (max-width: 1024px)': { padding: '20px' }
      }}>
          <p className='head1' style={{ fontFamily: 'Poppins', marginTop: '20px', marginBottom: '25px', fontSize: '25px', }}>
              Thanks for scanning the QR code, and now you instantly access vital details of the recipient. </p>
      </div>

      {error && <p>{error}</p>}
      {userDetails && (
        <div id="printable-content" style={{overflow:'hidden'}}>
          <div className='showdetails'  style={{ boxShadow: '0 0 10px rgba(255, 255, 0, 0.8)',marginBottom:'100px' }}>
            <form >
                <img style={{ width: '100px', borderRadius: '50px', marginTop: '30px' }} src='https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_640.png' />
                <p style={{ color: 'white', fontSize: '18px', marginTop: '8px' }}>USER</p>

                <div style={{ marginTop: '15px' }}>
                    <a href="tel:7904262162"><img style={{ height: '70px', width: '70px', objectFit: 'cover', paddingRight: '5px' }} src={call} alt='call' /></a>
                    <a href="tel:102"><img style={{ height: '70px', width: '70px', objectFit: 'cover', paddingRight: '5px', paddingLeft: '5px' }} src={ambulance} alt='ambulance' /></a>
                    <img style={{ height: '70px', width: '70px', objectFit: 'cover', paddingLeft: '5px' }} src={conversation} alt='conversation' />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                    <p style={{ color: 'white', fontSize: '22px', letterSpacing: '1px' }} >Verification status</p>
                    <img style={{ height: '30px', width: '30px' }} src={cross} alt='cross' />
                </div>


                <div>
                    <p style={{
                        color: 'white', fontSize: '18px', marginTop: '30px', backgroundColor: '#41a3e9',
                        paddingTop: '5px', paddingBottom: '5px', letterSpacing: '1px'
                    }}>Personal Details</p>

                    <div style={{
                        color: 'white', fontSize: '16px', marginTop: '10px', textAlign: 'left',
                        lineHeight: '28px', letterSpacing: '1px'
                    }}>
                        <p>Name: {userDetails.personName}</p>
                        <p>Gender: {userDetails.gender}</p>
                        <p>Contact no: {userDetails.phoneNumber}</p>
                        <p>Emergency contact: {userDetails.emergencyNumber}</p>
                        <p>Address: {userDetails.address}</p>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{
                        color: 'white', fontSize: '18px', backgroundColor: '#e10000', paddingTop: '5px',
                        paddingBottom: '5px', letterSpacing: '1px'
                    }}>Medical Information</p>

                    <div style={{
                        color: 'white', fontSize: '16px', marginTop: '10px', textAlign: 'left',
                        lineHeight: '25px', letterSpacing: '1px'
                    }}>
                        <p>Disease: Diabetics</p>

                        <p style={{ marginTop: '20px' }}>Regular hospital: XYZ</p>
                        <p>Doctor: Sins</p>
                    </div>
                </div>

                <button style={{
                    backgroundColor: '#16B40A', border: 'none', color: 'white', height: '40px', width: '200px', borderRadius: '8px',
                    marginTop: '40px', fontSize: '18px', cursor: 'pointer'
                }} onClick={handleContactDownload}>Downloads</button>

                <div style={{ marginTop: '20px' }}>
                    <img style={{ height: '30px', width: '30px', objectFit: 'cover', paddingRight: '5px' }} src={card} alt='card' />
                    <img style={{ height: '30px', width: '30px', objectFit: 'cover', paddingRight: '10px' }} src={download} alt='download' />
                    <img style={{ height: '30px', width: '30px', objectFit: 'cover', paddingRight: '5px' }} src={history} alt='history' />
                    <img style={{ height: '30px', width: '30px', objectFit: 'cover', paddingRight: '10px' }} src={download} alt='download' />
                    <img style={{ height: '30px', width: '30px', objectFit: 'cover', }} src={update} alt='update' />
                </div>
            </form>
          </div>
        </div>
        // <div>
        //   <div>
        //       <p style={{ fontFamily: 'Poppins', marginBottom: '20px', fontWeight: '600', fontSize: '20px', width:'100%',textAlign:'center'}}>Here is the scanned information of the recipient,</p>
        //   </div>
        //   <h2>User Details</h2>
        //   <p><strong>Name:</strong></p>
        //   <p><strong>Gender:</strong></p>
        //   <p><strong>Blood Group:</strong> {userDetails.bloodGroup}</p>
        //   <p><strong>Phone Number:</strong></p>
        //   <p><strong>Emergency Number:</strong></p>
        //   <p><strong>Address:</strong></p>
        // </div>
      )}
      {showInfoPrompt && <InfoPrompt onSubmit={handleInfoSubmit} />}
      
      <Footer />
    </div>
  );
}


  

 

// InfoPrompt component
function InfoPrompt({ onSubmit }) {
  const [infoData, setInfoData] = useState({
    personName: '',
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    emergencyNumber: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfoData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(infoData);
  };

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleButtonClick = () => {
        setShowAdditionalFields(!showAdditionalFields);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

  return (
    <div>
      <div>
          <p style={{ fontFamily: 'Poppins', marginBottom: '20px', fontWeight: '600', fontSize: '20px', width:'100%',textAlign:'center'}}>It looks like you have not filled the information, Please enter your info to save the data,</p>
      </div>
      <h2>Enter Your Information</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="personName" placeholder="Your Name" value={infoData.personName} onChange={handleInputChange} />
        <input type="text" name="gender" placeholder="Gender" value={infoData.gender} onChange={handleInputChange} />
        <input type="text" name="bloodGroup" placeholder="Blood Group" value={infoData.bloodGroup} onChange={handleInputChange} />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={infoData.phoneNumber} onChange={handleInputChange} />
        <input type="text" name="emergencyNumber" placeholder="Phone Number" value={infoData.emergencyNumber} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Address" value={infoData.address} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QRCodeScanner;
