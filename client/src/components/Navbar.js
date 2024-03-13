import React from 'react';
import '../app.css'
import { Link,useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import flanzer1 from '../images/flanzer1.png'

const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    }

    return (
        <nav className="navbar" style={{backgroundColor:'black',padding:'8px'}}>

            <div className="left-section">
                <img className='logo' src={logo} alt='logo' style={{height:'80px',width:'90px',marginLeft:'20px'}} />

                <div style={{ display: 'flex', marginLeft: '10px', display: 'inline-block' }}>
                    <span className="powered-by">
                        <Link style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }} target="_blank"  to='https://www.theflanzer.com/'>
                            supported by <img style={{ height: '18px', paddingLeft: '5px' }} src={flanzer1} alt='flanzer1' /></Link></span>                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
