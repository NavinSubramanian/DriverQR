import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';



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

  return (
    <>
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
        <div>
          <div>
              <p style={{ fontFamily: 'Poppins', marginBottom: '20px', fontWeight: '600', fontSize: '20px', width:'100%',textAlign:'center'}}>Here is the scanned information of the recipient,</p>
          </div>
          <h2>User Details</h2>
          <p><strong>Name:</strong> {userDetails.personName}</p>
          <p><strong>Gender:</strong> {userDetails.gender}</p>
          <p><strong>Blood Group:</strong> {userDetails.bloodGroup}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
          <p><strong>Emergency Number:</strong> {userDetails.emergencyNumber}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          {/* Display other user details as needed */}
        </div>
      )}
      {showInfoPrompt && <InfoPrompt onSubmit={handleInfoSubmit} />}
    </>
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
