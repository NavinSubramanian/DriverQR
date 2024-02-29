import React from 'react';
import './app.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="left-section">
                <span className="logo" style={{fontFamily:'montserrat'}}>Scanhubgen</span>
            </div>

            <div className="right-section">
                <ul className="nav-links">
                    <li style={{fontFamily:'montserrat'}}>
                        Home
                    </li>
                    <li style={{fontFamily:'montserrat'}}>
                        Dashboard
                    </li>
                </ul>
                <button className="login-button"><Link style={{color:'black',textDecoration:'none'}} to='/login'>Login</Link></button>
            </div>
        </nav>
    );
};

export default Navbar;
