import React from 'react';
import '../app.css'
import { Link,useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="left-section">
                <span className="logo">Scanhubgen</span>
            </div>

            <div className="right-section">
                <ul className="nav-links">

                    <li>
                        <Link to='/dashboard' style={{textDecoration:'none',color:'white'}}>Dashboard</Link>
                    </li>
                </ul>
                <button className="login-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
