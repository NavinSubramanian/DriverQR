import React from 'react';

const ConfirmationModal = ({ infoData, onClose, onSubmit }) => {
  console.log(infoData)
  return (
    <div className="confirmation-modal" style={{padding:'20px',margin:'10px',borderRadius:'20px',border:'2px solid rgb(0 0 0 / 30%)'}}>
      <h2 style={{fontSize:'23px'}}>Confirm Your Information</h2>
      <hr style={{margin:'10px 0'}} />
      <div>
        <p><b style={{}}>Name:</b> {infoData.personName}</p>
        <p><b style={{}}>Gender:</b> {infoData.gender}</p>
        <p><b style={{}}>Blood Group:</b> {infoData.bloodGroup}</p>
        <p><b style={{}}>Phone Number:</b> {infoData.phoneNumber}</p>
        <p><b style={{}}>Emergency Number:</b> {infoData.emergencyNumber}</p>
        <p><b style={{}}>Address:</b> {infoData.address}</p>
        <p><b style={{}}>Disease:</b> {infoData.disease === "" ? "Nil" : infoData.disease}</p>
        <p><b style={{}}>Allergies:</b> {infoData.allergies === "" ? "Nil" : infoData.allergies}</p>
        <p><b style={{}}>Regular Hospital:</b> {infoData.regularHospital === "" ? "Nil" : infoData.regularHospital}</p>
        <p><b style={{}}>Doctor:</b> {infoData.doctor === "" ? "Nil" : infoData.doctor}</p>
      </div>
      <div>
        <button onClick={onSubmit} style={{padding:'6px 15px',backgroundColor:'#E42A3C',color:'white',margin:'10px 0',border:'none',borderRadius:'8px'}}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
