import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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

const GraduateProfile = () => {
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState("");
  const [loading, setLoading] = useState(false);
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

  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    // Load existing profile if any
    if (!user) return;

    const fetchProfile = async () => {
      const docRef = doc(db, "graduates", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFullName(data.fullName || "");
        setSkills(data.skills || []);
        setLocation(data.location || "");
        setCvUrl(data.cvUrl || "");
      }
    };

    fetchProfile();
  }, [user]);

  const toggleEditMode = (section: Section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const saveSection = async (section: Section) => {
    if (!user) return;
    setLoading(true);

    try {
      const docRef = doc(db, "graduates", user.uid);
      const data = {
        uid: user.uid,
        fullName,
        email: user.email,
        skills,
        location,
        cvUrl,
        isProfileComplete: true,
      };
      await setDoc(docRef, data, { merge: true });
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Try again.");
    }
    setLoading(false);
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const cancelEdit = (section: Section) => {
    // Cancel logic
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // split by commas and trim spaces
    const skillsArray = value.split(",").map(s => s.trim()).filter(Boolean);
    setSkills(skillsArray);
  };

  const handleCvUpload = async (file: File) => {
    if (!user) return;
    setLoading(true);
    const storageRef = ref(storage, `cvs/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        // you can add progress indicator here if you want
      },
      error => {
        console.error("Upload failed:", error);
        setLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setCvUrl(downloadURL);
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const docRef = doc(db, "graduates", user.uid);
      const data = {
        uid: user.uid,
        fullName,
        email: user.email,
        skills,
        location,
        cvUrl,
        isProfileComplete: true,
      };
      await setDoc(docRef, data, { merge: true });
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Try again.");
    }
    setLoading(false);
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
                  setCvFile(file);
                  setCvUrl(URL.createObjectURL(file));
                }
              }}
            />
            Upload a file
          </label>
          {cvUrl && (
            <p className="text-green-600 text-sm mt-2">
              Selected:{" "}
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {cvUrl.split("/").pop()}
              </a>
            </p>
          )}
        </section>

        {/* Personal Info Section */}
        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          {editMode.personal ? (
            <div>
              <label className="block mb-2">
                Full Name
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </label>

              <label className="block mb-2">
                Skills (comma separated)
                <input
                  type="text"
                  value={skills.join(", ")}
                  onChange={handleSkillInput}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="React, JavaScript, Node.js"
                  required
                />
              </label>

              <label className="block mb-4">
                Location (City or Region)
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </label>
            </div>
          ) : (
            <div>
              <p className="text-gray-700">
                <strong>Name:</strong> {fullName}
              </p>
              <p className="text-gray-700">
                <strong>Skills:</strong> {skills.join(", ")}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {location}
              </p>
            </div>
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

export default GraduateProfile;
