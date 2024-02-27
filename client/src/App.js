// frontend/src/App.js

import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeScanner from './components/QRCodeScanner';

function App() {
  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <QRCodeGenerator />
      <h1>QR Code Scanner</h1>
      <QRCodeScanner />
    </div>
  );
}

export default App;
