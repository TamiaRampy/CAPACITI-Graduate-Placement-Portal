import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-box">
<img src="/CAPCITI-LOGO.jpg" alt="CAPACITI Logo" className="welcome-logo" />
        <h1 className="welcome-title">
          CAPACITI Graduate Placement Portal
        </h1>
        <p className="welcome-subtitle">
          Empowering graduates. Connecting employers. Driving impact.
        </p>

        <div className="welcome-cards">
          <div className="welcome-card">
            <h2 className="welcome-card-title">
              For Graduates <span role="img" aria-label="graduation cap">🎓</span>
            </h2>
            <p className="welcome-card-text">
              Discover job opportunities, track your applications, and build your career. Create a profile with your CV, skills, and certifications.
            </p>
          </div>

          <div className="welcome-card">
            <h2 className="welcome-card-title employers">
              For Employers <span role="img" aria-label="briefcase">💼</span>
            </h2>
            <p className="welcome-card-text">
              Post jobs and access a curated pool of skilled, CAPACITI-trained graduates. Save time with smart candidate matching and easy interview scheduling.
            </p>
          </div>

          <div className="welcome-card">
            <h2 className="welcome-card-title admins">
              For CAPACITI Admins <span role="img" aria-label="chart">📊</span>
            </h2>
            <p className="welcome-card-text">
              Gain insights into graduate placements, employer activity, and engagement metrics. Showcase success to funders and partners.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/signup')}
          className="welcome-button"
        >
          Get Started
        </button>

        <p className="welcome-footer">
          © 2025 CAPACITI Programme
        </p>
      </div>
    </div>
  );
};

export default Welcome;
