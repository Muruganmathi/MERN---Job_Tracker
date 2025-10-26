import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-3 px-lg-5">
        {/* Brand/Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Job Application Tracker 💼
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

        {/* Collapsible navigation section */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex flex-column flex-md-row align-items-center">
            <li className="nav-item my-2 my-md-0">
              <Link className="nav-link text-center" to="/">
                View All
              </Link>
            </li>
            <li className="nav-item my-2 my-md-0 ms-md-3">
              <Link className="nav-link btn btn-warning text-dark text-center" to="/add">
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
