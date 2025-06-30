import React, { useEffect, useState } from 'react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: string;
}

export const ApplicationTracker = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Replace with real API call
    setApplications([
      { id: '1', jobTitle: 'Frontend Developer', company: 'TechCorp', dateApplied: '2025-06-15', status: 'In Review' },
      { id: '2', jobTitle: 'Backend Developer', company: 'DataWorks', dateApplied: '2025-06-10', status: 'Interview' },
    ]);
  }, []);

  return (
    <div>
      <h2>Application Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Date Applied</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.jobTitle}</td>
              <td>{app.company}</td>
              <td>{app.dateApplied}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};