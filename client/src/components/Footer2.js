import React from 'react'
import logo from '../images/logo2.png'
import '../app.css'
import { Link } from 'react-router-dom'


const Footer2 = () => {
    return (
        <div style={{boxShadow: "0 0 10px rgba(255, 255, 0, 0.9)",overflow:'hidden'}} >
            <div className="footerSection newFooter" >
                <div className="footerRight">
                    <h3 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Contact Us,</h3>
                    <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Address: 360, 640, Anna Salai, Thousand Lights West, Thousand Lights, Chennai, Tamil Nadu 600006</h4>
                    <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Tel:  044 4864 1135 <br />Instagram: <Link style={{color: '#ffdd00'}} to='https://www.instagram.com/rayyan_progear_official/'>rayyan_progear_official</Link></h4>
                </div>
                <div className="footerBottom">
                    <h4 style={{fontSize: '14px',lineHeight: '22px',letterSpacing:'1px'}}>Copyright © 2024 Rayyanscan</h4>
                </div>
            </div>
        </div>
    )
}

export default Footer2