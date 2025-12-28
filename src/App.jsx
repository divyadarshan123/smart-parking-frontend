import { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";

function App() {
  // 🔁 ROLE SWITCH (NO LOGIN)
  const [role, setRole] = useState("user");

  // 🔹 FIXED USERS (DB IDs se match hone chahiye)
  const USERS = {
    user: {
      id: "1605d5f3-6d96-41de-ad38-a376082dd374",
      name: "Divya Darshan",
      role: "user",
    },
    manager: {
      id: "a9ef0a6b-1427-4b69-a4d2-f3f224e483d2",
      name: "Udit",
      role: "manager",
    },
    driver: {
      id: "7426cfbe-a751-43af-8250-cc5bda3639a4",
      name: "Rohit Kumar",
      role: "driver",
    },
    admin: {
      id: "ad7266fc-207c-435d-9ba9-7bb6ef9912a2",
      name: "Kamal",
      role: "admin",
    },
  };

  const user = USERS[role];

  // 📦 STATES
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState(null);
  const [driverBooking, setDriverBooking] = useState(null);

  // 👤 USER – RECENT PARKING
  useEffect(() => {
    if (role === "user") {
      api(`/bookings/recent/${user.id}`).then((res) => {
        if (res.success) setRecent(res.data);
      });
    }
  }, [role]);

  // 👔 MANAGER – STATS
  useEffect(() => {
    if (role === "manager") {
      api(`/manager/stats/${user.id}`).then((res) => {
        if (res.success) setStats(res.data);
      });
    }
  }, [role]);

  // 🚗 DRIVER – CURRENT ASSIGNMENT (AUTO REFRESH)
  useEffect(() => {
    if (role === "driver") {
      const load = () => {
        api(`/driver/current/${user.id}`).then((res) => {
          if (res.success) setDriverBooking(res.data);
        });
      };
      load();
      const i = setInterval(load, 5000);
      return () => clearInterval(i);
    }
  }, [role]);

  const startParking = async (id) => {
    await api(`/driver/start-parking/${id}`, { method: "POST" });
  };

  const retrieveVehicle = async (id) => {
    await api(`/driver/retrieve/${id}`, { method: "POST" });
  };

  return (
    <div className="app">
      {/* 🔷 HEADER */}
      <div className="header">
        <h2>Smart Parking</h2>
        <p>Welcome back, {user.name}</p>
      </div>

      {/* 👤 USER DASHBOARD */}
      {role === "user" && (
        <>
          <div className="scan-card">
            <div className="scan-icon">🔳</div>
            <div>
              <h3>Scan to Park</h3>
              <p>Scan QR code at parking entrance</p>
            </div>
          </div>

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
        </>
      )}

      {/* 👔 MANAGER DASHBOARD */}
      {role === "manager" && stats && (
        <div className="card">
          <h3>Manager Dashboard</h3>
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
        </div>
      )}

      {/* 🚗 DRIVER DASHBOARD */}
      {role === "driver" && (
        <div className="card">
          <h3>Driver Console</h3>

          {!driverBooking && <p>No assignment</p>}

          {driverBooking && (
            <>
              <p><b>Customer:</b> {driverBooking.customer_name}</p>
              <p><b>Vehicle:</b> {driverBooking.vehicle_number}</p>
              <p><b>Location:</b> {driverBooking.location_name}</p>
              <p><b>Slot:</b> {driverBooking.slot}</p>
              <p><b>Status:</b> {driverBooking.status}</p>

              {driverBooking.status === "active" && (
                <button onClick={() => startParking(driverBooking.id)}>
                  Start Parking
                </button>
              )}

              {driverBooking.status === "parked" && (
                <button onClick={() => retrieveVehicle(driverBooking.id)}>
                  Retrieve Vehicle
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* 🔁 ROLE SWITCHER */}
      <div className="role-switch">
        <button onClick={() => setRole("user")}>User</button>
        <button onClick={() => setRole("manager")}>Manager</button>
        <button onClick={() => setRole("driver")}>Driver</button>
        <button onClick={() => setRole("admin")}>Super Admin</button>
      </div>
    </div>
  );
}

export default App;
