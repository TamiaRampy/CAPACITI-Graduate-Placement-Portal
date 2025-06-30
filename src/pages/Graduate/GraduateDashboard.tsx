import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/GraduateDashboard.css";

const GraduateDashboard = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="graduate-dashboard">
      {/* Header */}
      <header className="header">
        <h1 className="header-title">Graduate Dashboard</h1>
        <span className="header-greeting">Welcome back</span>
      </header>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="profile-picture-section">
            <div className="profile-picture-wrapper" style={{ cursor: "pointer", position: "relative" }}>
              <div className="profile-picture">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  // Placeholder content if no image uploaded
                  null
                )}
              </div>
              <button className="upload-button" type="button" onClick={handlePictureClick} aria-label="Upload Image">
                <span className="plus-icon">+</span> Upload
              </button>
              <div className="upload-overlay">
                <span>Upload Image</span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <nav>
            <Link to="/graduate/profile" className="nav-link">
              <h4 className="nav-title">Edit Profile</h4>
              <p className="nav-description">Update your CV, skills and portfolio.</p>
            </Link>
            <Link to="/graduate/jobs" className="nav-link">
              <h4 className="nav-title">View Job Matches</h4>
              <p className="nav-description">Explore jobs tailored to your skills.</p>
            </Link>
            <Link to="/graduate/applications" className="nav-link">
              <h4 className="nav-title">Track Applications</h4>
              <p className="nav-description">Check status of your job applications.</p>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Overview */}
          <section>
            <h2 className="section-title">Overview</h2>
            <p className="section-description">Track your progress and navigate your placement journey.</p>
          </section>

          {/* Stats Cards */}
          <section className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-title">Profile Completion</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }}></div>
              </div>
              <p className="progress-text">75% complete</p>
            </div>

            <div className="stat-card">
              <h3 className="stat-title">Job Matches</h3>
              <p className="stat-value">12</p>
              <p className="stat-subtext">New this week</p>
            </div>

            <div className="stat-card">
              <h3 className="stat-title">Applications</h3>
              <p className="stat-value">5</p>
              <p className="stat-subtext">In progress</p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} CAPACITI Graduate Placement Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default GraduateDashboard;
