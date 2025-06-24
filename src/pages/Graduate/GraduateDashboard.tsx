import { Link } from "react-router-dom";

const GraduateDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold">Graduate Dashboard</h1>
        <span className="text-sm text-gray-600">Welcome back</span>
      </header>

      <main className="flex-1 p-8">
        {/* Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-600">Track your progress and navigate your placement journey.</p>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Profile Completion</h3>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: "75%" }} />
            </div>
            <p className="text-sm text-gray-500 mt-2">75% complete</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Job Matches</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-500">New this week</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Applications</h3>
            <p className="text-3xl font-bold text-purple-600">5</p>
            <p className="text-sm text-gray-500">In progress</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/graduate/profile"
            className="bg-white border border-gray-200 hover:border-blue-400 transition rounded-xl p-6 shadow-sm hover:shadow-md"
          >
            <h4 className="text-lg font-semibold mb-2 text-blue-700">Edit Profile</h4>
            <p className="text-sm text-gray-600">Update your CV, skills and portfolio.</p>
          </Link>

          <Link
            to="/graduate/jobs"
            className="bg-white border border-gray-200 hover:border-green-400 transition rounded-xl p-6 shadow-sm hover:shadow-md"
          >
            <h4 className="text-lg font-semibold mb-2 text-green-700">View Job Matches</h4>
            <p className="text-sm text-gray-600">Explore jobs tailored to your skills.</p>
          </Link>

          <Link
            to="/graduate/applications"
            className="bg-white border border-gray-200 hover:border-purple-400 transition rounded-xl p-6 shadow-sm hover:shadow-md"
          >
            <h4 className="text-lg font-semibold mb-2 text-purple-700">Track Applications</h4>
            <p className="text-sm text-gray-600">Check status of your job applications.</p>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-center p-4 text-sm text-gray-500">
        © {new Date().getFullYear()} CAPACITI Graduate Placement Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default GraduateDashboard;
