import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Footer from './Footer'
import Navbar from './Navbar1'

export default function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = () => {
        if (email === "admin@gmail.com" && password === "123"){
            console.log("yes")
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/')
        }else{
            console.log("no")
        }
    }

    return (
        <>
            <Navbar />

            <div className='loginContainer' style={{marginBottom:'50px'}}>
                <form style={{ display: 'flex', flexDirection: 'column' }}>
                    <button className="close-button"><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>X</Link></button>
                    <h1 style={{ margin: '10px 0', }}>Lets Sign you in</h1>
                    <p style={{ margin: '10px 0', }}>Welcome Back ,<br />You have been missed</p>
                    <input typeof='text' placeholder='Email , Register number' onChange={(e)=>{setEmail(e.target.value)}} className='username' style={{ }}></input>
                    <input typeof='text' placeholder='Password' className='password' onChange={(e)=>{setPassword(e.target.value)}}></input>
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