// src/pages/Graduate/JobMatchingFeed.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  [key: string]: any; // Optional: for any other fields like companyName, location etc.
}

const JobMatchingFeed: React.FC = () => {
  const [matchingJobs, setMatchingJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) return;

        // 1. Get graduate's skills
        const gradRef = doc(db, "graduates", user.uid);
        const gradSnap = await getDoc(gradRef);
        if (!gradSnap.exists()) return;

        const gradSkills = gradSnap.data().skills || [];

        // 2. Fetch all jobs
        const jobsRef = collection(db, "jobs");
        const jobSnap = await getDocs(jobsRef);

        const matches: Job[] = [];

        jobSnap.forEach((doc) => {
          const jobData = doc.data();
          const requiredSkills = jobData.requiredSkills || [];

          const gradSkillsLower = gradSkills.map((s: string) => s.toLowerCase());

        const isMatch = requiredSkills.some((skill: string) =>
          gradSkillsLower.includes(skill.toLowerCase())
        );


          if (isMatch) {
            matches.push({
  id: doc.id,
  title: jobData.title,
  description: jobData.description,
  requiredSkills: jobData.requiredSkills,
});

          }
        });

        setMatchingJobs(matches);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jobs Matching Your Skills</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : matchingJobs.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : (
        <div className="grid gap-4">
          {matchingJobs.map((job) => (
            <div key={job.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.description}</p>
              <p className="mt-2 text-sm">
                <strong>Required Skills:</strong> {job.requiredSkills.join(", ")}
              </p>
              <button
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => navigate(`/apply-job/${job.id}`, { state: { job } })}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobMatchingFeed;
