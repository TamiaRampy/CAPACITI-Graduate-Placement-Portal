import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/PlacementTracker.css";

interface Graduate {
  id: string;
  fullName: string;
  skillset: string;
  cohort: string;
}

interface Application {
  id: string;
  graduateId: string;
  jobId: string;
  status: string;
}

interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
}

interface PlacementData {
  id: string;
  fullName: string;
  skillset: string;
  cohort: string;
  companyName: string;
  status: string;
}

const PlacementTracker: React.FC = () => {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobsMap, setJobsMap] = useState<Map<string, Job>>(new Map());
  const [placementData, setPlacementData] = useState<PlacementData[]>([]);
  const [filters, setFilters] = useState({
    skillset: "",
    companyName: "",
  });
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch graduates
        const gradsSnapshot = await getDocs(collection(db, "graduates"));
        const gradsData: Graduate[] = gradsSnapshot.docs.map(doc => ({
          id: doc.id,
          fullName: doc.data().fullName || "N/A",
          skillset: doc.data().skillset || "N/A",
          cohort: doc.data().cohort || "N/A",
        }));
        setGraduates(gradsData);

        // Fetch applications
        const appsSnapshot = await getDocs(collection(db, "applications"));
        const appsData: Application[] = appsSnapshot.docs.map(doc => ({
          id: doc.id,
          graduateId: doc.data().graduateId,
          jobId: doc.data().jobId,
          status: doc.data().status || "pending",
        }));
        setApplications(appsData);

        // Fetch jobs and map by id
        const jobsSnapshot = await getDocs(collection(db, "jobs"));
        const jobsMapTemp = new Map<string, Job>();
        jobsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          jobsMapTemp.set(doc.id, {
            id: doc.id,
            companyName: data.companyName || "N/A",
            jobTitle: data.jobTitle || "N/A",
          });
        });
        setJobsMap(jobsMapTemp);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Join graduates with applications and jobs
    const data: PlacementData[] = [];

    graduates.forEach(grad => {
      // Find applications for this graduate
      const gradApps = applications.filter(app => app.graduateId === grad.id);
      if (gradApps.length === 0) {
        // No application, still show graduate with empty company and status
        data.push({
          id: grad.id,
          fullName: grad.fullName,
          skillset: grad.skillset,
          cohort: grad.cohort,
          companyName: "N/A",
          status: "No Application",
        });
      } else {
        gradApps.forEach(app => {
          const job = jobsMap.get(app.jobId);
          data.push({
            id: grad.id,
            fullName: grad.fullName,
            skillset: grad.skillset,
            cohort: grad.cohort,
            companyName: job ? job.companyName : "N/A",
            status: app.status,
          });
        });
      }
    });

    setPlacementData(data);
  }, [graduates, applications, jobsMap]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredData = placementData.filter(item => {
    return (
      (filters.skillset === "" || item.skillset === filters.skillset) &&
      (filters.companyName === "" || item.companyName === filters.companyName)
    );
  });

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  // Extract unique filter options
  const skillsets = Array.from(new Set(graduates.map(g => g.skillset)));
  const cohorts = Array.from(new Set(graduates.map(g => g.cohort)));
  const companies = Array.from(new Set(placementData.map(d => d.companyName)));

  return (
    <div className="placement-tracker-container">
      <h1>Graduate Placement Tracker</h1>
      <div className="filters">
        <select name="skillset" value={filters.skillset} onChange={handleFilterChange}>
          <option value="">All Skillsets</option>
          {skillsets.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        {/* Removed cohort filter */}
        <select name="companyName" value={filters.companyName} onChange={handleFilterChange}>
          <option value="">All Companies</option>
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>
      <table className="placement-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skillset</th>
            {/* Removed Cohort header */}
            <th>Company Applied For</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <React.Fragment key={`${item.id}-${index}`}>
              <tr onClick={() => toggleRow(`${item.id}-${index}`)} style={{ cursor: "pointer" }}>
                <td style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>{item.fullName}</td>
                <td style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>{item.skillset}</td>
              {/* Removed cohort column */}
              <td style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>{item.companyName}</td>
              <td style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>{item.status}</td>
              </tr>
              {expandedRows.has(`${item.id}-${index}`) && (
                <tr className="expanded-row">
                  <td colSpan={4} style={{ whiteSpace: "normal" }}>
                    <strong>Full Skillset:</strong> {item.skillset} <br />
                    <strong>Full Company Name:</strong> {item.companyName} <br />
                    <strong>Full Status:</strong> {item.status}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlacementTracker;
