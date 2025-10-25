// frontend/src/components/Navbar/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // Use 'navbar-expand-md' to collapse on medium screens and down
    <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-3 px-lg-5"> {/* Added horizontal padding */}
        {/* Brand/Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Job Tracker 💼
        </Link>
        
        {/* Toggler button for mobile view */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation Links (Collapse container) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* ms-auto pushes links to the right on larger screens */}
          <ul className="navbar-nav ms-auto"> 
            <li className="nav-item">
              <Link className="nav-link" to="/">
                View All
              </Link>
            </li>
            <li className="nav-item mt-2 mt-md-0 ms-md-3"> {/* Added margin for spacing on small/medium screens */}
              <Link className="nav-link btn btn-warning text-dark" to="/add">
                ➕ Add New
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;