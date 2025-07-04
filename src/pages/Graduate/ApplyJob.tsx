// src/pages/Graduate/ApplyJob.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  writeBatch, // <-- Add this import
  Timestamp,  // <-- Add this import
} from "firebase/firestore";

const ApplyJob: React.FC = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const job = location.state?.job;

  const [motivation, setMotivation] = useState("");
  const [status, setStatus] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !jobId) return;

      try {
        // 1. Check if already applied
        const appQuery = query(
          collection(db, "applications"),
          where("graduateId", "==", user.uid),
          where("jobId", "==", jobId)
        );
        const appSnap = await getDocs(appQuery);
        if (!appSnap.empty) {
          setAlreadyApplied(true);
          return;
        }

        // 2. Get CV URL from graduate profile
        const gradRef = doc(db, "graduates", user.uid);
        const gradSnap = await getDoc(gradRef);
        if (gradSnap.exists()) {
          const gradData = gradSnap.data();
          setCvUrl(gradData.cvUrl || "");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (motivation.length < 30) {
      setStatus("Motivation must be at least 30 characters long.");
      return;
    }

    if (!cvUrl) {
      setStatus("You must upload a CV before applying.");
      return;
    }

    try {
      // 1. Save application doc
      const appRef = await addDoc(collection(db, "applications"), {
        jobId,
        graduateId: user?.uid,
        motivation,
        cvUrl,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      // 2. Get employerId & job title from job doc
      const jobDocRef = doc(db, "jobs", jobId as string);
      const jobSnap = await getDoc(jobDocRef);
      if (!jobSnap.exists()) throw new Error("Job not found");
      const employerId = jobSnap.data()?.employerId;
      const jobTitle = jobSnap.data()?.title;

      // 3. Prepare batch write for notifications
      const batch = writeBatch(db);

      const employerNotifRef = doc(collection(db, "notifications"));
      batch.set(employerNotifRef, {
        recipientId: employerId,
        type: "job_application",
        applicationId: appRef.id,
        jobId,
        graduateId: user?.uid,
        message: `${user?.displayName || "A graduate"} applied for your job "${jobTitle}"`,
        createdAt: Timestamp.now(),
        read: false,
      });

      const adminId = "adminUserId"; // TODO: Replace with real admin uid
      const adminNotifRef = doc(collection(db, "notifications"));
      batch.set(adminNotifRef, {
        recipientId: adminId,
        type: "job_application",
        applicationId: appRef.id,
        jobId,
        graduateId: user?.uid,
        message: `${user?.displayName || "A graduate"} applied for the job "${jobTitle}"`,
        createdAt: Timestamp.now(),
        read: false,
      });

      // 4. Commit batch
      await batch.commit();

      setStatus("✅ Application submitted successfully!");
    } catch (error) {
      console.error("Application error:", error);
      setStatus("❌ Error submitting application.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (alreadyApplied) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">You've already applied for this job.</h1>
        <p className="text-gray-600">Please wait for a response or apply to a different position.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Apply for {job?.title}</h1>
      <p className="text-gray-600 mb-4">{job?.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Motivation Letter:
          <textarea
            className="w-full mt-1 p-2 border rounded"
            rows={6}
            placeholder="Explain why you're a great fit..."
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            required
          />
        </label>

        <p className="text-sm text-gray-500">
          ✅ CV on file:{" "}
          {cvUrl ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Uploaded CV
            </a>
          ) : (
            "No CV uploaded"
          )}
        </p>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Application
        </button>
      </form>

      {status && <p className="mt-4 text-sm font-semibold">{status}</p>}
    </div>
  );
};

export default ApplyJob;
