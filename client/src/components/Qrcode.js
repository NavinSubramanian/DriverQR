import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';


const Qrcode = ({ detailsString, showQRCode, animate, handleClosePopup }) => {
  const qrCodeAnimation = useSpring({
    opacity: showQRCode ? 1 : 0,
    transform: showQRCode ? 'scale(1)' : 'scale(0)',
  });

  const qrCodeRef = useRef(null);

  // Function to handle saving the QR code as a PNG image
  const handleSaveAsPNG = () => {
    if (qrCodeRef.current) {
      // Use html2canvas to convert the QR code image to a canvas
      html2canvas(qrCodeRef.current).then((canvas) => {
        // Convert the canvas to a data URL representing a PNG image
        const imageDataUrl = canvas.toDataURL('image/png');

        // Create a temporary link element to download the PNG image
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = 'qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    showQRCode && (
      <>
        <div className={`overlay ${animate ? 'zoom-in white-popup' : ''}`} />
        <animated.div className={`qr-code ${animate ? 'zoom-in white-popup' : ''}`} style={qrCodeAnimation} onTransitionEnd={handleClosePopup}>
          <div>
            <p className='qr-header'>Your information has been submitted successfully.</p>
          </div>
          <img ref={qrCodeRef} src={detailsString}/>
          <div>
            <button className='button1' onClick={handleSaveAsPNG}>Save as PNG</button>
            <span className="close-btn" onClick={handleClosePopup}><Link to='' style={{textDecoration:'none',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>X</Link></span>
          </div>
        </animated.div>
      </>
    )
  );
};

export default Qrcode;
