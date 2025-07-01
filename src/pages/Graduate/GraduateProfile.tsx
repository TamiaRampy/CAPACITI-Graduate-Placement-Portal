// src/pages/GraduateProfile.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // Make sure this path is correct for your project
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUserCircle,
  faEdit,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Profile.css";

type Section =
  | "personal"
  | "contact"
  | "education"
  | "experience"
  | "skills"
  | "certifications"
  | "languages"
  | "security";

const GraduateProfile = () => {
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
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
  const [profileSaved, setProfileSaved] = useState(false); // <-- Add this line

  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const docRef = doc(db, "graduates", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        // Possibly a new user – start profile creation
        console.log("New user - no profile found");
        return;
      }
      const data = docSnap.data();
      setFullName(data.fullName || "");
      setSkills(data.skills || []);
      setLocation(data.location || "");
      setCvUrl(data.cvUrl || "");
    };

    fetchProfile();
  }, [user]);

  const toggleEditMode = (section: Section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const cancelEdit = (section: Section) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const skillsArray = value.split(",").map(s => s.trim()).filter(Boolean);
    setSkills(skillsArray);
  };

  // 📄 Handle CV upload

const handleCvUpload = async (file: File) => {
  if (!user) return;
  setLoading(true);

  try {
    // 🔐 Get Firebase token
    const token = await user.getIdToken();
   await supabase.auth.setSession({
  access_token: token,
  refresh_token: token // using the same token for both
});


    // 📁 Define upload path and upload file
    const filePath = `${user.uid}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("cv-uploads")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) throw error;

    // 🌐 Get public URL
    const { data: publicData } = supabase.storage
      .from("cv-uploads")
      .getPublicUrl(filePath);

    const publicUrl = publicData?.publicUrl;
    if (!publicUrl) throw new Error("Failed to get public URL");

    setCvUrl(publicUrl);

    // 💾 Save URL to Firestore
    const docRef = doc(db, "graduates", user.uid);
    await setDoc(docRef, { cvUrl: publicUrl }, { merge: true });

    setLoading(false);
    alert("CV uploaded and saved successfully!");
  } catch (error) {
    console.error("CV Upload failed:", error);
    alert("CV upload failed. Try again.");
    setLoading(false);
  }
};



  const saveSection = async (section: Section) => {
    if (!user) return;
    setLoading(true);

    try {
      const docRef = doc(db, "graduates", user.uid);
      const data = {
        uid: user.uid,
        email: user.email,
        fullName,
        location,
        skills,
        cvUrl,
        isProfileComplete: true,
      };
      await setDoc(docRef, data, { merge: true });

      setProfileSaved(true);  // <-- Show success message here
      setEditMode((prev) => ({ ...prev, [section]: false }));
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="flex items-center justify-between bg-white p-4 shadow rounded">
        <button onClick={() => navigate("/graduate/dashboard")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FontAwesomeIcon icon={faUserCircle} /> My Profile
          </h1>
          <p className="text-sm text-gray-500">Manage your account info</p>
        </div>
        <div className="space-x-2">
          <button><FontAwesomeIcon icon={faEdit} /></button>
          <button><FontAwesomeIcon icon={faCog} /></button>
        </div>
      </header>

      <main className="mt-6">
        {/* Avatar */}
        <section className="bg-white p-6 rounded shadow mb-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src="https://ui-avatars.com/api/?name=User&background=ff6b35&color=ffffff&size=200"
                alt="Avatar"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* CV Upload */}
        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-4">Upload CV</h3>
          <label className="text-blue-600 cursor-pointer font-medium">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleCvUpload(file);
              }}
            />
            Upload a file
          </label>
          {cvUrl && (
            <p className="text-green-600 text-sm mt-2">
              Uploaded:{" "}
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {cvUrl.split("/").pop()}
              </a>
            </p>
          )}
        </section>

        {/* Personal Info */}
        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          {editMode.personal ? (
            <>
              <label className="block mb-2">
                Full Name
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </label>
              <label className="block mb-2">
                Skills (comma separated)
                <input
                  value={skills.join(", ")}
                  onChange={handleSkillInput}
                  className="w-full border rounded p-2"
                />
              </label>
              <label className="block mb-4">
                Location
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </label>
            </>
          ) : (
            <div>
              <p><strong>Name:</strong> {fullName}</p>
              <p><strong>Skills:</strong> {skills.join(", ")}</p>
              <p><strong>Location:</strong> {location}</p>
            </div>
          )}

          <div className="mt-4 space-x-2">
            {editMode.personal ? (
              <>
                <button onClick={() => saveSection("personal")} className="bg-green-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button onClick={() => cancelEdit("personal")} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => toggleEditMode("personal")} className="bg-blue-600 text-white px-4 py-2 rounded">
                Edit
              </button>
            )}
          </div>
        </section>

        {/* Success message and proceed button */}
        {profileSaved && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p>Profile created successfully!</p>
            <button
              onClick={() => navigate("/graduate/dashboard")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Dashboard
            </button>
          </div>
        )}

        {/* ...rest of your sections... */}
      </main>
    </div>
  );
};

export default GraduateProfile;
