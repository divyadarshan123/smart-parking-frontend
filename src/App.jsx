import { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";

function App() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [recent, setRecent] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [stats, setStats] = useState(null);
  const [driverBooking, setDriverBooking] = useState(null);

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const res = await api("/login", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });

      if (!res.success) {
        setError(res.error);
        return;
      }

      setUser(res.user);
      setError("");
    } catch {
      setError("Backend not reachable");
    }
  };

  // 📦 USER RECENT BOOKINGS
  useEffect(() => {
    if (user && user.role === "user") {
      api(`/bookings/recent/${user.id}`)
        .then((res) => {
          if (res.success) setRecent(res.data);
        })
        .catch(() => {});
    }
  }, [user]);

  // 📜 USER BOOKING HISTORY
  const loadHistory = async () => {
    try {
      const res = await api(`/bookings/history/${user.id}`);
      if (res.success) {
        setHistory(res.data);
        setShowHistory(true);
      }
    } catch (err) {
      console.log("History error", err);
    }
  };

  // 📊 MANAGER STATS
  const loadManagerStats = async () => {
    try {
      const res = await api(`/manager/stats/${user.id}`);
      if (res.success) setStats(res.data);
    } catch (err) {
      console.log("Manager stats error", err);
    }
  };

  useEffect(() => {
    if (user && user.role === "manager") {
      loadManagerStats();
    }
  }, [user]);

  // 🚗 DRIVER CURRENT BOOKING
  const loadDriverCurrent = async () => {
    try {
      const res = await api(`/driver/current/${user.id}`);
      if (res.success) setDriverBooking(res.data);
    } catch (err) {
      console.log("Driver current error", err);
    }
  };

  useEffect(() => {
    if (user && user.role === "driver") {
      loadDriverCurrent();
    }
  }, [user]);

  useEffect(() => {
  if (user && user.role === "driver") {
    loadDriverCurrent();

    const interval = setInterval(() => {
      loadDriverCurrent();
    }, 5000); // har 5 second

    return () => clearInterval(interval);
  }
}, [user]);


  const startParking = async (bookingId) => {
    await api(`/driver/start-parking/${bookingId}`, { method: "POST" });
    loadDriverCurrent();
  };

  const retrieveVehicle = async (bookingId) => {
    await api(`/driver/retrieve/${bookingId}`, { method: "POST" });
    loadDriverCurrent();
  };

  // 🔹 LOGIN SCREEN
  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <h2 className="title">Smart Parking Login</h2>

          <input
            className="input"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="btn" onClick={handleLogin}>
            Login
          </button>

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }

  // 🔹 DASHBOARD
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome {user.name}</h2>
        <p className="role">Role: {user.role}</p>
      </div>

      {/* 👤 USER DASHBOARD */}
      {user.role === "user" && (
        <div className="card">
          <h3 className="section-title">Recent Bookings</h3>

          {recent.length === 0 && <p>No bookings yet</p>}

          <ul className="list">
            {recent.map((b) => (
              <li key={b.id}>
                <b>{b.status}</b><br />
                {new Date(b.start_time).toLocaleString()}
              </li>
            ))}
          </ul>

          <button className="btn" onClick={loadHistory}>
            View Full History
          </button>

          {showHistory && (
            <>
              <h3 className="section-title">Booking History</h3>
              <ul className="list">
                {history.map((b) => (
                  <li key={b.id}>
                    {b.status}<br />
                    {new Date(b.start_time).toLocaleString()}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* 👔 MANAGER DASHBOARD */}
      {user.role === "manager" && stats && (
  <div className="card">
    <h3 className="section-title">Manager Dashboard</h3>

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
      {user.role === "driver" && (
        <div className="card">
          <h3 className="section-title">Driver Assignment</h3>

          {!driverBooking && <p>No active booking assigned</p>}

          {driverBooking && (
            <>
              <p><b>Customer:</b> {driverBooking.customer_name}</p>
              <p><b>Vehicle:</b> {driverBooking.vehicle_number}</p>
              <p><b>Location:</b> {driverBooking.location_name}</p>
              <p><b>Slot:</b> {driverBooking.slot}</p>
              <p><b>Status:</b> {driverBooking.status}</p>

              {driverBooking.status === "active" && (
                <button
                  className="btn secondary"
                  onClick={() => startParking(driverBooking.id)}
                >
                  Start Parking
                </button>
              )}

              {driverBooking.status === "parked" && (
                <button
                  className="btn danger"
                  onClick={() => retrieveVehicle(driverBooking.id)}
                >
                  Retrieve Vehicle
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

