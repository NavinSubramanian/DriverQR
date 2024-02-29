// frontend/src/App.js

import React from 'react';

import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeScanner from './components/QRCodeScanner';
import Details from './components/Details'
import Login from './components/Login'
import Navbar from './Navbar'
import Qrcode from './components/Qrcode'
import Dashboard from './components/Dashboard'

import { Route,BrowserRouter,Routes } from 'react-router-dom'


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={QRCodeGenerator}></Route>
          <Route path='/user-details/:uniqueNumber' Component={QRCodeScanner}></Route>
          <Route path="login" element={<Login />} />
          <Route path="navbar" element={<Navbar />} />
          <Route path="details" element={<Details />} />
          <Route path="qrcode" element={<Qrcode />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
