// src/pages/Graduate/ApplicationTracker.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

interface Application {
  id: string;
  jobTitle: string;
  status: string;
  createdAt: Timestamp;
  interviewDate?: string;
  interviewLink?: string;
}

export const ApplicationTracker: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) return;

        const appsRef = collection(db, "applications");
        const q = query(appsRef, where("graduateId", "==", user.uid));
        const appSnap = await getDocs(q);

        const appsData: Application[] = [];

        for (const docSnap of appSnap.docs) {
          const appData = docSnap.data();
          const jobRef = doc(db, "jobs", appData.jobId);
          const jobSnap = await getDoc(jobRef);
          const jobTitle = jobSnap.exists() ? jobSnap.data().jobTitle : "Unknown Job";

          let interviewDate = "";
          let interviewLink = "";

          if (appData.status === "accepted") {
            const interviewsRef = collection(db, "interviews");
            const interviewQuery = query(
              interviewsRef,
              where("graduateId", "==", appData.graduateId),
              where("jobId", "==", appData.jobId)
            );
            const interviewSnap = await getDocs(interviewQuery);

            if (!interviewSnap.empty) {
              const interviewData = interviewSnap.docs[0].data();
              interviewDate = interviewData.date ? interviewData.date.toDate().toLocaleString("en-ZA") : "";
              interviewLink = interviewData.link || "";
            }
          }

          appsData.push({
            id: docSnap.id,
            jobTitle,
            status: appData.status || "pending",
            createdAt: appData.createdAt,
            interviewDate,
            interviewLink,
          });
        }

        setApplications(appsData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Job Applications</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        <ul className="grid gap-4">
          {applications.map((app) => (
            <li key={app.id} className="p-4 border rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{app.jobTitle}</h2>
              <p className="text-sm mt-1">
                <strong>Date Applied:</strong>{" "}
                {app.createdAt?.toDate().toLocaleDateString("en-ZA")}
              </p>
              <p className="text-sm mt-1">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    app.status === "accepted"
                      ? "text-green-600 font-bold"
                      : app.status === "declined"
                      ? "text-red-600 font-bold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {app.status.toUpperCase()}
                </span>
              </p>

              {app.status === "accepted" && app.interviewDate && (
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <p className="text-sm">
                    <strong>Interview Date:</strong> {app.interviewDate}
                  </p>
                  <p className="text-sm">
                    <strong>Join Link:</strong>{" "}
                    <a
                      href={app.interviewLink}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {app.interviewLink}
                    </a>
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
