import React from 'react'
import flanzer1 from '../images/flanzer1.png'

import '../app.css'

const Footer = () => {
    return (
        <div style={{overflow:'hidden'}}>
            <div className="footerSection">
                <div className="footerTop">
                    <div className="footerLeft">
                        <img style={{height:'40px',}} src={flanzer1} alt='flanzer1' />
                        <p style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Meet Scanhubgen - a product from theflanzer.com Effortlessly create discreet QR codes with vital contact details.
                            A quick scan in emergencies grants prompt access, forging efficient connections.
                            Elevate security through our user-centric platform,
                            ensuring professionalism in safeguarding possessions and well-being.</p>
                    </div>
                    <div className="footerRight">
                        <h3 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Contact Us</h3>
                        <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA</h4>
                        <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Tel: + (123) 2500-567-8988 <br />Mail: supportlms@gmail.com</h4>
                    </div>
                </div>
                <div className="footerBottom">
                    <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Copyright © 2024 Scabhubgen | Powered by Flanzer</h4>
                </div>
            </div>
        </div>
    )
}

export default Footer