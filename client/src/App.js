// frontend/src/App.js

import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeScanner from './components/QRCodeScanner';
import { Route,BrowserRouter,Routes } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={QRCodeGenerator}></Route>
          <Route path='/user-details/:uniqueNumber' Component={QRCodeScanner}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
