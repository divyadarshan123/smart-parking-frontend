import { useEffect, useState } from "react";
import { api } from "../../api";

export default function ManagerDashboard({ manager }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD MANAGER STATS
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await api(`/manager/stats/${manager.id}`);
      if (res.success) setStats(res.data);
      setLoading(false);
    };

    load();
  }, [manager.id]);

  return (
    <>
      {/* HEADER */}
      <div className="app-header">
        <h2>Manager Dashboard</h2>
        <p>Welcome back, {manager.name}</p>
      </div>

      <div className="app">
        {loading && <p className="small">Loading dashboard…</p>}

        {!loading && stats && (
          <>
            {/* STATS GRID */}
            <div className="stats-grid">
              <div className="stat-box">
                <p>Total Bookings</p>
                <h2>{stats.total_bookings}</h2>
              </div>

              <div className="stat-box">
                <p>Total Revenue</p>
                <h2>₹{stats.total_revenue || 0}</h2>
              </div>
            </div>

            {/* INFO CARD */}
            <div className="card">
              <h3>Today’s Overview</h3>
              <p className="small">
                Track parking usage and revenue across your locations.
              </p>
            </div>

            {/* PLACEHOLDER LIST */}
            <div className="card">
              <h3>Active Parking</h3>
              <p className="small">
                Live parking list will appear here.
              </p>
            </div>
          </>
        )}

        {!loading && !stats && (
          <div className="card">
            <p>No data available</p>
          </div>
        )}
      </div>
    </>
  );
}
