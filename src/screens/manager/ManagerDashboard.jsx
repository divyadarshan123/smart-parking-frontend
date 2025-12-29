import { useEffect, useState } from "react";
import { api } from "../../api";
import BottomNav from "../../components/BottomNav";

export default function ManagerDashboard({ manager }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await api(`/manager/stats/${manager.id}`);
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <>
      <div className="app">
        {/* HEADER */}
        <div className="app-header">
          <h2>Manager Dashboard</h2>
          <p>Welcome, {manager.name}</p>
        </div>

        {/* CONTENT */}
        {loading && <p className="small">Loading stats...</p>}

        {!loading && !stats && (
          <div className="card">
            <p>No data available</p>
          </div>
        )}

        {stats && (
          <div className="card">
            <h3 className="section-title">Overview</h3>

            <div className="stats-grid">
              <div className="stat-box">
                <p>Total Bookings</p>
                <h2>{stats.total_bookings}</h2>
              </div>

              <div className="stat-box">
                <p>Total Revenue</p>
                <h2>₹{stats.total_revenue}</h2>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <BottomNav active="manager" />
    </>
  );
}
