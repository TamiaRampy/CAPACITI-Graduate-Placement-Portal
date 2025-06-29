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
    // Save logic
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const cancelEdit = (section: Section) => {
    // Cancel logic
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="flex items-center justify-between bg-white p-4 shadow rounded">
        <button onClick={() => navigate('/graduate/dashboard')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FontAwesomeIcon icon={faUserCircle} /> My Profile
          </h1>
          <p className="text-sm text-gray-500">Manage your account settings</p>
        </div>
        <div className="space-x-2">
          <button><FontAwesomeIcon icon={faEdit} /></button>
          <button><FontAwesomeIcon icon={faCog} /></button>
        </div>
      </header>

      <main className="mt-6">
        {/* Avatar Section */}
        <section className="bg-white p-6 rounded shadow mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="profile-pic-upload" className="cursor-pointer">
              <div className="relative w-24 h-24">
                <Avatar>
                  <AvatarImage
                    src="https://ui-avatars.com/api/?name=User&background=ff6b35&color=ffffff&size=200"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                  {/* Optional overlay (e.g., camera icon) */}
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Upload CV Section */}
        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-4">Upload CV</h3>
          <label className="inline-block cursor-pointer text-blue-600 font-medium">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
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
            <p className="text-green-600 text-sm mt-2">Selected: {cvFileName}</p>
          )}
        </section>

        {/* Personal Info Section */}
        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          {editMode.personal ? (
            <div>Edit mode for personal info</div>
          ) : (
            <div>View mode for personal info</div>
          )}

          <div className="mt-4 space-x-2">
            {editMode.personal ? (
              <>
                <button
                  onClick={() => saveSection('personal')}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => cancelEdit('personal')}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => toggleEditMode('personal')}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
