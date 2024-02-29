import React from 'react';
import './app.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="left-section">
                <span className="logo">Scanhubgen</span>
            </div>

            <div className="right-section">
                <ul className="nav-links">
                    <li>
                        Home
                    </li>
                    <li>
                        <Link to='/dashboard' style={{textDecoration:'none',color:'white'}}>Dashboard</Link>
                    </li>
                </ul>
                <button className="login-button"><Link style={{color:'black',textDecoration:'none'}} to='/login'>Login</Link></button>
            </div>
        </nav>
    );
};

export default Navbar;
