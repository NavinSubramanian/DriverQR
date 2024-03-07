// frontend/src/App.js

import React, { useState } from 'react';

import QRCodeGenerator from './QRCodeGenerator';
import QRCodeScanner from './QRCodeScanner';
import Login from './components/Login'
import Dashboard from './Dashboard'
import PrivateRoutes from './utils/PrivateRoutes';
import MassQRCodeGenerator from './MassQRCodeGenerator';
import Landingpage from './Landingpage';

import { Route,BrowserRouter,Routes,PrivateRoute, Navigate } from 'react-router-dom'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Landingpage />} exact></Route>
            <Route path='/generate' element={<QRCodeGenerator />} exact></Route>
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
