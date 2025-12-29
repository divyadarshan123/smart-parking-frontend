import { useEffect, useState } from "react";
import { api } from "../../api";
import BottomNav from "../../components/BottomNav";

export default function DriverConsole({ driver }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 LOAD CURRENT ASSIGNMENT (auto refresh)
  const loadBooking = async () => {
    try {
      const res = await api(`/driver/current/${driver.id}`);
      if (res.success) {
        setBooking(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooking();
    const interval = setInterval(loadBooking, 5000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const startParking = async () => {
    await api(`/driver/start-parking/${booking.id}`, {
      method: "POST",
    });
    loadBooking();
  };

  const retrieveVehicle = async () => {
    await api(`/driver/retrieve/${booking.id}`, {
      method: "POST",
    });
    loadBooking();
  };

  return (
    <>
      <div className="app">
        {/* HEADER */}
        <div className="app-header">
          <h2>Driver Console</h2>
          <p>Welcome, {driver.name}</p>
        </div>

        {/* CONTENT */}
        {loading && <p className="small">Loading...</p>}

        {!loading && !booking && (
          <div className="card">
            <p>No active assignment</p>
          </div>
        )}

        {booking && (
          <div className="card driver-card">
            <p><b>Customer:</b> {booking.customer_name}</p>
            <p><b>Vehicle:</b> {booking.vehicle_number}</p>
            <p><b>Location:</b> {booking.location_name}</p>
            <p><b>Slot:</b> {booking.slot}</p>
            <p><b>Status:</b> {booking.status}</p>

            {booking.status === "active" && (
              <button className="btn" onClick={startParking}>
                Start Parking
              </button>
            )}

            {booking.status === "parked" && (
              <button className="btn danger" onClick={retrieveVehicle}>
                Retrieve Vehicle
              </button>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <BottomNav active="driver" />
    </>
  );
}
