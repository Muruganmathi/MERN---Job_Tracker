// frontend/src/App.jsx (UPDATED for Absolute Centering)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import AddApplication from './pages/AddApplication';
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar /> 
      {/* FIX: Use 'container-lg' to give it a maximum width on large screens (keeping it from stretching too far) 
         and 'mx-auto' (margin-x auto) to center this block element horizontally. 
         We use 'p-3' for general padding.
      */}
      <div className="container-lg mx-auto mt-4 p-3"> 
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/add" element={<AddApplication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;