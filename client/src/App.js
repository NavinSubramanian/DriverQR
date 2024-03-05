// frontend/src/App.js

import React, { useState } from 'react';

import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeScanner from './components/QRCodeScanner';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoutes from './utils/PrivateRoutes';
import MassQRCodeGenerator from './components/MassQRCodeGenerator';

import { Route,BrowserRouter,Routes,PrivateRoute, Navigate } from 'react-router-dom'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<QRCodeGenerator />} exact></Route>
            <Route path='/massgen' element={<MassQRCodeGenerator />} exact></Route>
            <Route path="/dashboard" element={<Dashboard />} exact></Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path='/user-details/:uniqueNumber' element={<QRCodeScanner />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
