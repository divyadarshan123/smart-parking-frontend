import { useEffect, useState } from "react";
import { api } from "../../api";
import BottomNav from "../../components/BottomNav";
import ParkingHistory from "./ParkingHistory";
import Settings from "./Settings";

export default function UserHome({ user }) {
  const [recent, setRecent] = useState([]);
  const [tab, setTab] = useState("home");

  // USER – RECENT PARKING
  useEffect(() => {
    if (tab === "home") {
      api(`/bookings/recent/${user.id}`).then((res) => {
        if (res.success) setRecent(res.data);
      });
    }
  }, [tab, user.id]);

  /* ================= HISTORY TAB ================= */
  if (tab === "history") {
    return (
      <>
        <ParkingHistory user={user} />
        <BottomNav active="history" onChange={setTab} />
      </>
    );
  }

  /* ================= SETTINGS TAB ================= */
  if (tab === "settings") {
    return (
      <>
        <Settings />
        <BottomNav active="settings" onChange={setTab} />
      </>
    );
  }

  /* ================= HOME TAB ================= */
  return (
    <>
      {/* HEADER (FULL WIDTH, GRADIENT) */}
      <div className="app-header">
        <h2>Smart Parking</h2>
        <p>Welcome back, {user.name}</p>
      </div>

      {/* CONTENT */}
      <div className="app">
        {/* HERO / PROMO (optional but screenshot-like) */}
        <div className="card" style={{ marginTop: -30 }}>
          <b>🏆 #1 in India</b>
          <p className="small">
            Premium parking solution trusted by 1M+ users
          </p>
        </div>

        {/* SCAN TO PARK */}
        <div className="scan-card">
          <div className="scan-icon">🔳</div>
          <div>
            <h3>Scan to Park</h3>
            <p className="small">Scan QR code at parking entrance</p>
          </div>
        </div>

        {/* RECENT PARKING */}
        <h3 className="section-title">Recent Parking</h3>

        {recent.length === 0 && (
          <p className="small">No recent parking</p>
        )}

        {recent.map((b) => (
          <div className="booking-card" key={b.id}>
            <div className="row">
              <b>{b.location_name || "Parking Location"}</b>
              <span className="status">{b.status}</span>
            </div>

            <p className="small">
              {new Date(b.start_time).toLocaleDateString()} ·{" "}
              {new Date(b.start_time).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <BottomNav active="home" onChange={setTab} />
    </>
  );
}
