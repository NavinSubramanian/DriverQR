import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Footer from './Footer'
import '../app.css'
import logo from '../images/logo.png'
import flanzer1 from '../images/flanzer1.png'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        if (email === "admin@gmail.com" && password === "123") {
            console.log("yes")
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/')
        } else {
            console.log("no")
        }
    }

    return (
        <>
            <nav className="navbar" style={{ backgroundColor: 'black', padding: '8px',display:'flex', alignItems:'center',zIndex:'100', justifyContent:'center',position:'sticky',top:'0',flexDirection:'column',boxShadow: "0 0 10px rgba(255, 255, 0, 0.9)", }}>
                <div className="left-section">
                <img className='logo' src={logo} alt='logo' style={{ height: '80px', width: '80px' }} />
                </div>
                <div style={{ display: 'flex', marginLeft: '10px', display: 'inline-block' }}>
                    <span className="powered-by">
                    <Link style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }} target="_blank" to='https://www.theflanzer.com/'>
                        supported by</Link></span>
                    <img style={{ height: '18px', paddingLeft: '5px', }} src={flanzer1} alt='flanzer1' />
                </div>
            </nav>

            <div className='loginContainer' style={{ marginBottom: '50px' }}>
                <form style={{ display: 'flex', flexDirection: 'column' }}>
                    <button className="close-button"><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>X</Link></button>
                    <h1 style={{ margin: '10px 0', }}>Lets Sign you in</h1>
                    <p style={{ margin: '10px 0', }}>Welcome Back ,<br />You have been missed</p>
                    <input typeof='text' placeholder='Email , Register number' onChange={(e) => { setEmail(e.target.value) }} className='username' style={{}}></input>
                    <input typeof='text' placeholder='Password' className='password' onChange={(e) => { setPassword(e.target.value) }}></input>
                    <button className='loginButton' onClick={handleSubmit}>Sign in</button>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <hr style={{ flex: 1, marginRight: '10px' }} />
                        <p>OR</p>
                        <hr style={{ flex: 1, marginLeft: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <a href="/">
                            <img src="https://banner2.cleanpng.com/20180324/ote/kisspng-google-logo-g-suite-google-search-chrome-5ab6e608a40b46.8129931915219358806719.jpg" alt="Google Logo" style={{ width: '30px', marginRight: '5px' }} />
                        </a>
                        <a href="/">
                            <img src="https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png" alt="Facebook Logo" style={{ width: '59px', marginRight: '5px' }} />
                        </a>
                    </div>
                </form >
            </div >

            <Footer />
        </>
    )
}