import React from 'react';
import QRCode from 'qrcode.react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';


const Qrcode = ({ detailsString, showQRCode, animate, handleGenerateQRCode }) => {
  const qrCodeAnimation = useSpring({
    opacity: showQRCode ? 1 : 0,
    transform: showQRCode ? 'scale(1)' : 'scale(0)',
  });

  return (
    showQRCode && (
      <>
        <div className={`overlay ${animate ? 'zoom-in white-popup' : ''}`} />
        <animated.div className={`qr-code ${animate ? 'zoom-in white-popup' : ''}`} style={qrCodeAnimation} onTransitionEnd={handleGenerateQRCode}>
          <div>
            <p className='qr-header'>Your information has been submitted successfully.</p>
          </div>
          <QRCode value={detailsString} size={200} />
          <div>
            <button className='button1'>Save as PNG</button>
            <span className="close-btn"><Link to='/details'>X</Link></span>
          </div>
        </animated.div>
      </>
    )
  );
};

export default Qrcode;
