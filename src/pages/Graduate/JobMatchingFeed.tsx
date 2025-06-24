import React, { useEffect, useState } from "react";
import { calculateMatchScore } from '../../services/matchServices';

// Mock job data
const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Co.',
    description: 'Work with React and TypeScript to build web apps.',
    requirements: ['React', 'TypeScript', 'CSS'],
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Data Corp.',
    description: 'Develop APIs and manage cloud databases.',
    requirements: ['Node.js', 'Firebase', 'MongoDB'],
  },
  {
    id: '3',
    title: 'Full Stack Intern',
    company: 'StartupHub',
    description: 'Work on all parts of the app with mentorship.',
    requirements: ['JavaScript', 'React', 'Firebase'],
  },
];

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
}

const JobMatchingFeed = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const userSkills = ['JavaScript', 'React', 'Node.js']; // Example user skills

  useEffect(() => {
    setJobs(mockJobs); // No async call needed
  }, []);
  
  return(
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Job Matching Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const matchScore = calculateMatchScore(userSkills, job.requirements);
          return (
            <div key={job.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="mt-2">{job.description}</p>
              <p className="mt-2 text-sm text-gray-500">Match Score: {matchScore}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JobMatchingFeed;