import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function QRCodeScanner() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { uniqueNumber } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://driver-qr.vercel.app/user-details/${uniqueNumber}`);
        console.log(response);
        setUserDetails(response.data.user); 
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, [uniqueNumber]);
  
  console.log(userDetails)

  return (
    <div>
      {error && <p>{error}</p>}
      {userDetails && (
        <div>
          <h2>User Details</h2>
          <p><strong>Blood Group:</strong> {userDetails.bloodGroup}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
}

export default QRCodeScanner;
