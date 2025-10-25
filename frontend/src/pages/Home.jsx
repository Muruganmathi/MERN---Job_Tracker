// frontend/src/pages/Home.jsx (FINAL CENTERING FIX)

import React from 'react';
import ApplicationList from '../components/ApplicationList/ApplicationList';

const Home = () => {
  return (
    <section>
      <h2 className="mb-4">📋 All Job Applications</h2>
      {/* Key Fix: Ensure the card is centered within the main container on large screens. */}
      {/* We use 'col-lg-10' to limit the width on large screens and 'mx-auto' to center it. */}
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10"> {/* Col-12 ensures full width on mobile, Col-xl-10 limits width on desktop */}
          <div className="card shadow p-4">
            <ApplicationList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;