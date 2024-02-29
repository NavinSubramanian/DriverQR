// frontend/src/App.js

import React, { useState } from 'react';

import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeScanner from './components/QRCodeScanner';
import Details from './components/Details'
import Login from './components/Login'
import Navbar from './Navbar'
import Qrcode from './components/Qrcode'
import Dashboard from './components/Dashboard'
import PrivateRoutes from './utils/PrivateRoutes';

import { Route,BrowserRouter,Routes,PrivateRoute, Navigate } from 'react-router-dom'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<QRCodeGenerator />} exact></Route>
            <Route path="/dashboard" element={<Dashboard />} exact></Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path='/user-details/:uniqueNumber' element={<QRCodeScanner />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
