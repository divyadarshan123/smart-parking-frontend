import { useEffect, useState } from "react";
import { api } from "../../api";

export default function UserHome({ user }) {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    api(`/bookings/recent/${user.id}`).then((res) => {
      if (res.success) setRecent(res.data);
    });
  }, []);

  return (
    <div className="app">
      {/* HEADER */}
      <div className="header">
        <h2>Smart Parking</h2>
        <p>Welcome back, {user.name}</p>
      </div>

      {/* SCAN CARD */}
      <div className="scan-card">
        <div className="scan-icon">🔳</div>
        <div>
          <h3>Scan to Park</h3>
          <p>Scan QR code at parking entrance</p>
        </div>
      </div>

      {/* RECENT */}
      <h3 className="section-title">Recent Parking</h3>

      {recent.length === 0 && (
        <p style={{ opacity: 0.6 }}>No recent parking</p>
      )}

      {recent.map((b) => (
        <div className="booking-card" key={b.id}>
          <div className="row">
            <b>{b.location_name || "Parking Location"}</b>
            <span className="status">{b.status}</span>
          </div>
          <p className="small">
            {new Date(b.start_time).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
