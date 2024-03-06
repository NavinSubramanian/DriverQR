import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import logo from '../logo.png'
import Flanzer from '../flanzer.png'

const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const Generateqr = () => {
    const [numQRCodes, setNumQRCodes] = useState(0);
    const [qrCodes, setQRCodes] = useState([]);

    const handleGenerate = () => {
        const numCodes = parseInt(numQRCodes, 10);

        if (isNaN(numCodes) || numCodes <= 0) {
            alert('Please enter a valid number greater than 0.');
            return;
        }

        const generatedCodes = Array.from({ length: numCodes }, (_, index) => ({
            id: generateRandomCode(),
            index: index + 1,
        }));

        setQRCodes(generatedCodes);
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <p style={{textAlign:'center',fontFamily:'montserrat',marginBottom:'40px',marginTop:'20px',fontSize:'30px',fontWeight:'600'}}>Mass qr generator...</p>
            <div style={{ textAlign: 'center' }}>
                <label className="label1">
                    Number of QR Codes:
                    <input className="input1" type="number" value={numQRCodes} onChange={(e) => setNumQRCodes(e.target.value)} />
                </label>
            </div>
            <button className="button3" onClick={handleGenerate}>Generate QR Codes</button>

            <div className="qr-code-container">
                {qrCodes.map((code) => (
                    <div key={code.index} className="qr-code" style={{height:'75.59px',width:'185.197px'}}>
                        <div className="qr-code-content">
                            <div style={{display:'flex',position:'relative',height:'75.59px',width:'92.598px',alignItems:'center',justifyContent:'center'}}>
                                <h6 className='float' style={{fontSize:'5px',width:'100%',}}>SCAN FOR EMERGENCY/LOST</h6>
                                <div className='floatdiv'>
                                    <h6 style={{fontWeight:'300',display:'flex',justifyContent:'space-between',fontSize:'3px',alignItems:'center',textAlign:'center'}}>powered by <span style={{marginLeft:'2px',fontWeight:'500',fontSize:'4px'}}>
                                        <img src={Flanzer} style={{height:'5px',width:'4.5px',position:'relative',top:'1.2px',right:'1px'}}></img>
                                        theflanzer.com
                                        </span>
                                    </h6>
                                </div>
                                <div className="tilted-wrapper">
                                    <p className="tilted-text">{code.id}</p>
                                </div>
                                <QRCode size={55} value={code.id} />
                            </div>
                            <img style={{ height: '75.59px', width: '92.598px' }} src={logo} alt='Logo' />
                        </div>
                    </div>
                ))}
            </div>
            <button className="close-button"><Link to='/details' style={{ color: 'white', textDecoration: 'none' }}>X</Link></button>
        </div>
    );
};

export default Generateqr;