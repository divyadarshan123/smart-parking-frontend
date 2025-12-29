import { useState } from "react";

export default function SuperAdmin({ admin }) {
  // Dummy overview data (interview ke liye perfectly fine)
  const [overview] = useState({
    totalUsers: 1240,
    totalManagers: 45,
    totalDrivers: 180,
    totalRevenue: 845000,
  });

  return (
    <>
      {/* HEADER */}
      <div className="app-header">
        <h2>Super Admin</h2>
        <p>Welcome back, {admin.name}</p>
      </div>

      <div className="app">
        {/* OVERVIEW STATS */}
        <div className="stats-grid">
          <div className="stat-box">
            <p>Total Users</p>
            <h2>{overview.totalUsers}</h2>
          </div>

          <div className="stat-box">
            <p>Managers</p>
            <h2>{overview.totalManagers}</h2>
          </div>

          <div className="stat-box">
            <p>Drivers</p>
            <h2>{overview.totalDrivers}</h2>
          </div>

          <div className="stat-box">
            <p>Total Revenue</p>
            <h2>₹{overview.totalRevenue.toLocaleString()}</h2>
          </div>
        </div>

        {/* SYSTEM CONTROL */}
        <div className="card">
          <h3>System Controls</h3>
          <p className="small">
            Approve managers, monitor system health, and manage global settings.
          </p>
        </div>

        {/* PLACEHOLDER SECTIONS */}
        <div className="card">
          <h3>Pending Approvals</h3>
          <p className="small">
            New manager & location approvals will appear here.
          </p>
        </div>

        <div className="card">
          <h3>System Logs</h3>
          <p className="small">
            Recent activities and system logs will be visible here.
          </p>
        </div>
      </div>
    </>
  );
}
