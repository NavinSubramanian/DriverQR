import React from 'react';

const ConfirmationModal = ({ infoData, onClose, onSubmit }) => {
  return (
    <div className="confirmation-modal">
      <h2>Confirm Your Information</h2>
      <div>
        <p>Name: {infoData.personName}</p>
        <p>Gender: {infoData.gender}</p>
        <p>Blood Group: {infoData.bloodGroup}</p>
        <p>Phone Number: {infoData.phoneNumber}</p>
        <p>Emergency Number: {infoData.emergencyNumber}</p>
        <p>Address: {infoData.address}</p>
        {/* Add other fields as needed */}
      </div>
      <div>
        <button onClick={onSubmit}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
