import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

import call from "./images/call.webp";
import ambulance from "./images/ambulance.png";
import conversation from "./images/conversation.png";
import cross from "./images/cross.webp";
import card from "./images/card.png";
import download from "./images/download.png";
import history from "./images/history.png";
import update from "./images/update.png";

import logo from './images/logo.png'
import flanzer1 from './images/flanzer1.png'
import Footer from "./components/Footer";


function QRCodeScanner() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showInfoPrompt, setShowInfoPrompt] = useState(false);
  const { uniqueNumber } = useParams();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://driver-qr.vercel.app/user-details/${uniqueNumber}`
      );
      const user = response.data.user.userDetails;
      var existsInDB = true;
      if (user.address === "") {
        existsInDB = false;
      }
      if (existsInDB) {
        setUserDetails(user);
        setError(null);
      } else {
        setShowInfoPrompt(true);
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching user details");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [uniqueNumber]);

  const handleInfoSubmit = async (infoData) => {
    try {
      // Send request to backend
      await axios.post("https://driver-qr.vercel.app/update-details", {
        uniqueIdentifier: uniqueNumber,
        userDetails: infoData,
      });
      console.log("User details saved successfully:");
      setShowInfoPrompt(true);
      await fetchUserDetails();
      // Handle success message or redirect to another page
    } catch (error) {
      console.error("Error saving user details:", error.message);
      // Handle error message or display it to the user
    }
  };

  const handleContactDownload = () => {
    const printableContent =
      document.getElementById("printable-content").innerHTML;
    const printWindow = window.open("", "_blank");

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
      alert("Please allow pop-ups for this site to enable printing.");
    }
  };

  return (
    <div style={{ overflow: "hidden", }}>
      <nav className="navbar" style={{ backgroundColor: 'black', padding: '8px' }}>
        <div className="left-section">
          <img className='logo' src={logo} alt='logo' style={{ height: '80px', width: '80px' }} />
          <div style={{ display: 'flex', marginLeft: '10px', display: 'inline-block' }}>
            <span className="powered-by">
              <Link style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }} target="_blank" to='https://www.theflanzer.com/'>
                supported by</Link></span>
            <img style={{ height: '18px', paddingLeft: '5px', }} src={flanzer1} alt='flanzer1' />
          </div>
        </div>

      </nav>

      {error && <p>{error}</p>}
      {userDetails && (
        <div id="printable-content" style={{ overflow: "hidden" }}>
          <div
            className="showdetails"
            style={{
              boxShadow: "0 0 10px rgba(255, 255, 0, 0.9)",
              marginBottom: "100px",
              backgroundColor: 'black',
            }}
          >
            <form>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    width: "100px",
                    borderRadius: "50px",
                    marginTop: "30px",
                    height: '100px',
                    objectFit: 'cover'
                  }}
                  src={userDetails.profileImage}
                />
                <p
                  style={{
                    color: "#E42A3C",
                    fontSize: "50px",
                    textAlign: "center",
                    position: "absolute",
                    right: "0",
                    bottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  {userDetails.bloodGroup}
                </p>
              </div>
              <p style={{ color: "white", fontSize: "18px", marginTop: "8px" }}>
                {userDetails.personName}
              </p>

              <div style={{ marginTop: "15px" }}>
                <a href="tel:7904262162">
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      objectFit: "cover",
                      paddingRight: "5px",
                    }}
                    src={call}
                    alt="call"
                  />
                </a>
                <a href="tel:102">
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      objectFit: "cover",
                      paddingRight: "5px",
                      paddingLeft: "5px",
                    }}
                    src={ambulance}
                    alt="ambulance"
                  />
                </a>
                <img
                  style={{
                    height: "70px",
                    width: "70px",
                    objectFit: "cover",
                    paddingLeft: "5px",
                  }}
                  src={conversation}
                  alt="conversation"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "22px",
                    letterSpacing: "1px",
                  }}
                >
                  Verification status
                </p>
                <img
                  style={{ height: "30px", width: "30px" }}
                  src={cross}
                  alt="cross"
                />
              </div>

              <div>
                <p
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginTop: "30px",
                    backgroundColor: "#41a3e9",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    letterSpacing: "1px",
                  }}
                >
                  Personal Details
                </p>

                <div
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginTop: "10px",
                    textAlign: "left",
                    lineHeight: "28px",
                    letterSpacing: "1px",
                  }}
                >
                  <p>Gender: {userDetails.gender}</p>
                  <p>Contact no: {userDetails.phoneNumber}</p>
                  <p>Emergency contact: {userDetails.emergencyNumber}</p>
                  <p>Address: {userDetails.address}</p>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <p
                  style={{
                    color: "white",
                    fontSize: "18px",
                    backgroundColor: "#E42A3C",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    letterSpacing: "1px",
                  }}
                >
                  Medical Information
                </p>

                <div
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginTop: "10px",
                    textAlign: "left",
                    lineHeight: "25px",
                    letterSpacing: "1px",
                  }}
                >
                  <p>Disease: {userDetails.disease}</p>
                  <p>Allegries: {userDetails.allergies}</p>
                  <p style={{ marginTop: "20px" }}>
                    Regular hospital: {userDetails.regularHospital}
                  </p>
                  <p>Doctor: {userDetails.doctor}</p>
                </div>
              </div>

              <button
                style={{
                  backgroundColor: "#16B40A",
                  border: "none",
                  color: "white",
                  height: "40px",
                  width: "200px",
                  borderRadius: "8px",
                  marginTop: "40px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                onClick={handleContactDownload}
              >
                Downloads
              </button>

              <div style={{ marginTop: "20px" }}>
                <img
                  style={{
                    height: "30px",
                    width: "30px",
                    objectFit: "cover",
                    paddingRight: "5px",
                  }}
                  src={card}
                  alt="card"
                />
                <img
                  style={{
                    height: "30px",
                    width: "30px",
                    objectFit: "cover",
                    paddingRight: "10px",
                  }}
                  src={download}
                  alt="download"
                />
                <img
                  style={{
                    height: "30px",
                    width: "30px",
                    objectFit: "cover",
                    paddingRight: "5px",
                  }}
                  src={history}
                  alt="history"
                />
                <img
                  style={{
                    height: "30px",
                    width: "30px",
                    objectFit: "cover",
                    paddingRight: "10px",
                  }}
                  src={download}
                  alt="download"
                />
                <img
                  style={{ height: "30px", width: "30px", objectFit: "cover" }}
                  src={update}
                  alt="update"
                />
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
    personName: "",
    gender: "",
    bloodGroup: "",
    phoneNumber: "",
    emergencyNumber: "",
    address: "",
    profileImage: "",
    disease: "",
    allergies: "",
    regularHospital: "",
    doctor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfoData((prevData) => ({
      ...prevData,
      [name]: value,
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
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const res = reader.result;
      setInfoData((prevData) => ({
        ...prevData,
        profileImage: res,
      }));
    };
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "30px",
          padding: "20px",
        }}
      >
        <p className="head" style={{
          fontSize: "25px",
          '@media (max-width: 768px)': {
            fontSize: "15pxpx"
          }
        }}>
          Welcome to RayyanScanhub!,
        </p>

        <div id="details-container">
          <p className="head1" style={{ fontSize: "25px", height: "65px" }}>
            Oops! We couldn't find your data. Do read through instructions and
            fill in the form below to ensure your information is securely
            stored.{" "}
          </p>
        </div>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "600" }}>
            Prior to filling in your details, carefully review the instructions.
          </h1>
          <div
            style={{
              fontSize: "18px",
              lineHeight: "25px",
              letterSpacing: "0.5px",
              paddingLeft: "20px",
              marginTop: "10px",
            }}
          >
            <ul>
              <li style={{ marginBottom: "10px" }}>
                Your details shape your safety net. Fill the columns
                accurately—this one-time entry ensures precision. For any
                adjustments, the shop or the provided contact awaits your
                request.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Be proactive in emergencies. Fill out all columns for thorough
                details. Your information is crucial for swift assistance in
                case of lost items or emergencies.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Empower your safety plan. Complete all fields for robust
                details. In case of QR loss or damage, our shop is your go-to
                for replacements or restoration.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Precision matters. Provide comprehensive details in one go. For
                any necessary tweaks, the shop or the contact person listed
                below is ready to assist.
              </li>
            </ul>
          </div>
        </div>

        <button className="buttons">Input your details</button>
      </div>

      {/* input section user */}
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <hr style={{ flex: 1, marginRight: "10px" }} />
          <p style={{ color: "gray" }}>Personal Details</p>
          <hr style={{ flex: 1, marginLeft: "10px" }} />
        </div>
        <form style={{ marginTop: "5px" }} onSubmit={handleSubmit}>
          <label className="label" htmlFor="Name">
            Upload image as .png
          </label>
          <input
            style={{ marginBottom: "25px" }}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {selectedImage && (
            <img
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
            />
          )}
          <label className="label" htmlFor="Name">
            Name
          </label>
          <input
            className="input-field"
            type="text"
            placeholder="Name..."
            name="personName"
            value={infoData.personName}
            onChange={handleInputChange}
          />
          <label className="label" htmlFor="gender">
            Gender
          </label>
          <select
            className="select-field"
            name="gender"
            value={infoData.gender}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              --Select gender--
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <label className="label" htmlFor="Primary">
            Contact No
          </label>
          <input
            className="input-field"
            type="number"
            placeholder="Primary No..."
            step="0.01"
            name="phoneNumber"
            value={infoData.phoneNumber}
            onChange={handleInputChange}
          />
          <label className="label" htmlFor="Secondary">
            Emergency contact
          </label>
          <input
            className="input-field"
            type="number"
            placeholder="Emergency contact..."
            step="0.01"
            name="emergencyNumber"
            value={infoData.emergencyNumber}
            onChange={handleInputChange}
          />
          <label className="label" htmlFor="group">
            Blood Group
          </label>
          <select
            className="select-field"
            name="bloodGroup"
            value={infoData.bloodGroup}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              --Select Blood group--
            </option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <label className="label" htmlFor="address">
            Address:
          </label>
          <textarea
            className="textarea-field"
            name="address"
            value={infoData.address}
            onChange={handleInputChange}
          />

          {/* medical details */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              marginTop: "30px",
            }}
          >
            <hr style={{ flex: 1, marginRight: "10px" }} />
            <p style={{ color: "gray" }}>Medical Details</p>
            <hr style={{ flex: 1, marginLeft: "10px" }} />
          </div>

          <div>
            <label className="label" htmlFor="disease">
              Disease
            </label>
            <textarea
              className="textarea-field"
              name="disease"
              value={infoData.disease}
              onChange={handleInputChange}
            />
            <label className="label" htmlFor="allegry">
              Allegries
            </label>
            <textarea
              className="textarea-field"
              name="allergies"
              value={infoData.allergies}
              onChange={handleInputChange}
            />
            <label className="label" htmlFor="hospital">
              Regular Hospital
            </label>
            <textarea
              className="textarea-field"
              name="regularHospital"
              value={infoData.regularHospital}
              onChange={handleInputChange}
            />
            <label className="label" htmlFor="doctor">
              Doctor
            </label>
            <textarea
              className="textarea-field"
              name="doctor"
              value={infoData.doctor}
              onChange={handleInputChange}
            />
          </div>

          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
      {/* <div>
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
      </form> */}
    </div>
  );
}

export default QRCodeScanner;
