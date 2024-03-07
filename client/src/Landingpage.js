import React from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { Link } from 'react-router-dom'



const Landingpage = () => {
    return (
        <div>
            <Navbar />
            <div>
                <p className='head' style={{ fontSize: '25px', marginTop: '30px', marginLeft: '100px' }}>
                    Welcome to Scanhubgen!,</p>
            </div>
            <div>
                <p style={{ marginTop: '20px', fontWeight: '400', fontSize: '20px', marginLeft: '150px', lineHeight: '30px', maxWidth: '1300px' }}>
                    Scanhubgen, seamlessly <b>generate and affix QR code</b> embedding your crucial contact particulars at your discretion.
                    In situations of lost belongings or emergencies, individuals can effortlessly scan the QR code, expeditiously accessing
                    the requisite information and establishing a prompt and effective connection with the designated owner.
                    Elevate security and convenience through our sophisticated, user-centric platform, guaranteeing the safeguarding of
                    possessions and well-being with utmost professionalism.</p>
                <hr style={{ marginTop: '20px', marginLeft: '100px', maxWidth: '1400px' }} />
            </div>
            <div>
                <p className='head' style={{ fontSize: '25px', marginTop: '30px', marginLeft: '100px' }}>
                    Secure Connections Made Simple</p>
            </div>
            <div className="item__layout">
                <div className="flex-item">
                    <img className="item1" src='https://me-qr.com/data/front/static_preview/651415ebca4c28.80230463.png' />
                    <p class="item-body">Admin site generation</p>
                    <p class="item-stat">Take control with your personalized QR code—swiftly connect with others in times of need,
                        enhancing the safety of your belongings effortlessly.</p>
                    <button className='button2'>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to='/generate'>Enter</Link>
                    </button>
                </div>

                <div className="flex-item">
                    <img className="item1" src='https://me-qr.com/data/front/static_preview/651415ebca4c28.80230463.png' />
                    <p class="item-body">Mass Generation QR</p>
                    <p class="item-stat">Enter the required number and generate the qr which are readymade to be printed when needed.</p>
                    <button className='button2'>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to='/massgen'>Enter</Link>
                    </button>
                </div>

                <div className="flex-item">
                    <img className="item1" src='https://s39613.pcdn.co/wp-content/uploads/2023/07/hand-holding-and-touching-smartphone-screen-with-thumb-scan-qr-code-vector-illustration_s1024x1024wisk20c60ak_N87cngM8pJ6hVHVh6NAmiFfMW_OJLL8csVewzc.jpg' />
                    <h1 class="item-body">Dashboard</h1>
                    <p class="item-stat">Swiftly access all the user details, upto date and edit the details when needed for the changes.</p>
                    <button className='button2'> <Link to='/dashboard' style={{ color: 'white', textDecoration: 'none' }}>Enter</Link> </button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Landingpage