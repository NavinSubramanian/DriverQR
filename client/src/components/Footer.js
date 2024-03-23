import React from 'react'
import logo from '../images/logo2.png'
import '../app.css'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <div style={{overflow:'hidden'}}>
            <div className="footerSection">
                <div className="footerTop">
                    <div className="footerLeft">
                        <img style={{height:'60px',width:'130px'}} src={logo} alt='logo' />
                        <p style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Meet Rayyanscan - 
                        <br/>Generate discreet QR codes with essential contact details for emergency access. Elevate security and
                         professionalism through our user-centric platform.</p>
                    </div>
                    <div className="footerRight">
                        <h3 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Contact Us,</h3>
                        <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Address: 360, 640, Anna Salai, Thousand Lights West, Thousand Lights, Chennai, Tamil Nadu 600006</h4>
                        <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Tel:  044 4864 1135 <br />Instagram: <Link style={{color: '#ffdd00'}} to='https://www.instagram.com/rayyan_progear_official/'>rayyan_progear_official</Link></h4>
                    </div>
                </div>
                <div className="footerBottom">
                    <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Copyright © 2024 Rayyanscan </h4>
                </div>
            </div>
        </div>
    )
}

export default Footer