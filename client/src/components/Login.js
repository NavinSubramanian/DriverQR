import { Link } from 'react-router-dom'


export default function Login() {
    return (
        <div className='loginContainer'>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <button className="close-button"><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>X</Link></button>

                <h1 style={{ margin: '10px 0', }}>Lets Sign you in</h1>

                <p style={{ margin: '10px 0', }}>Welcome Back ,<br />You have been missed</p>

                <input typeof='text' placeholder='Email , Register number' className='username' style={{ }}></input>

                <input typeof='text' placeholder='Password' className='password' style={{ }}></input>

                <a href="/" style={{ textDecoration: 'none', }}>Forgot Password?</a>

                <button className='loginButton' style={{ }}>Sign in</button>

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
    )
}