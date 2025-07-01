import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from  '../../ui/avatar';
import '../../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faUserCircle,
  faEdit,
  faCog
} from '@fortawesome/free-solid-svg-icons';

type Section =
  | 'personal'
  | 'contact'
  | 'education'
  | 'experience'
  | 'skills'
  | 'certifications'
  | 'languages'
  | 'security';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [cvFileName, setCvFileName] = useState('');
  const [editMode, setEditMode] = useState<Record<Section, boolean>>({
    personal: false,
    contact: false,
    education: false,
    experience: false,
    skills: false,
    certifications: false,
    languages: false,
    security: false
  });

  const toggleEditMode = (section: Section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const saveSection = (section: Section) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const cancelEdit = (section: Section) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  return (
    <div className="profile-page">
      <header
        className="profile-header"
        style={{
          position: 'relative',
          paddingTop: 48,         // Increased from 24
          paddingBottom: 32,      // Increased from 16
          minHeight: 130          // Increased from 90
        }}
      >
        <button
          onClick={() => navigate('/graduate/dashboard')}
          className="back-btn"
          style={{
            position: 'absolute',
            left: 20,
            top: 60,
            background: 'none',
            border: 'none',
            color: '#1d4368',
            fontSize: 22,
            cursor: 'pointer',
            zIndex: 2
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {/* BUTTONS ON TOP RIGHT */}
        <div
          className="header-actions"
          style={{
            position: 'absolute',
            right: 32,
            top: 60,
            display: 'flex',
            gap: '12px',
            zIndex: 2
          }}
        >
          <button className="action-btn" style={{ background: '#4c0f92', color: '#fff', borderRadius: 20, padding: '8px 16px', border: 'none', fontSize: 18, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="action-btn" style={{ background: '#4c0f92', color: '#fff', borderRadius: 20, padding: '8px 16px', border: 'none', fontSize: 18, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faCog} />
          </button>
        </div>
        {/* CENTERED HEADER */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <h1
            className="profile-title"
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#001f4d',
              textShadow: '0 2px 6px rgba(0,0,0,0.15)',
              margin: 0,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.85)',
              padding: '0 24px',
              borderRadius: 12,
              zIndex: 1
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 12 }} />
            My Profile
          </h1>
          <p className="profile-subtitle" style={{ color: '#ff6f61', marginTop: 8, marginBottom: 0, textAlign: 'center' }}>
            Manage your account settings
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="profile-details-row">
          {/* Upload CV Section */}
          <section className="profile-details">
            <h3 className="section-title" style={{ color: '#1d4368' }}>Upload CV</h3>
            <label className="upload-label" style={{ color: '#ff8a65' }}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="upload-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCvFileName(file.name);
                  }
                }}
              />
              Upload a file
            </label>
            {cvFileName && (
              <p className="upload-selected-file" style={{ color: '#ff8a65' }}>
                Selected: {cvFileName}
              </p>
            )}
          </section>

          {/* Personal Info Section */}
          <section className="profile-details">
            <h3 className="section-title" style={{ color: '#1d4368' }}>Personal Information</h3>
            {editMode.personal ? (
              <div className="edit-mode active" style={{ color: '#ff8a65' }}>Edit mode for personal info</div>
            ) : (
              <div className="view-mode" style={{ color: '#ff8a65' }}>View mode for personal info</div>
            )}

            <div className="edit-actions">
              {editMode.personal ? (
                <>
                  <button
                    onClick={() => saveSection('personal')}
                    className="save-btn"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => cancelEdit('personal')}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => toggleEditMode('personal')}
                  className="edit-btn"
                >
                  Edit
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;