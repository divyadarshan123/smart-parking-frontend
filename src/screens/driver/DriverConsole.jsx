import { useEffect, useState } from "react";
import { api } from "../../api";

export default function DriverConsole({ driver }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD CURRENT ASSIGNMENT
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await api(`/driver/current/${driver.id}`);
      if (res.success) setBooking(res.data);
      setLoading(false);
    };

    load();
    const i = setInterval(load, 5000);
    return () => clearInterval(i);
  }, [driver.id]);

  const startParking = async (id) => {
    await api(`/driver/start-parking/${id}`, { method: "POST" });
  };

  const retrieveVehicle = async (id) => {
    await api(`/driver/retrieve/${id}`, { method: "POST" });
  };

  return (
    <>
      {/* HEADER */}
      <div className="app-header">
        <h2>Driver Console</h2>
        <p>Welcome back, {driver.name}</p>
      </div>

      <div className="app">
        {loading && <p className="small">Loading assignment…</p>}

        {!loading && !booking && (
          <div className="card">
            <p>No active assignment</p>
          </div>
        )}

        {!loading && booking && (
          <div className="driver-card">
            <h3>{booking.vehicle_number}</h3>

            <p>
              <b>Customer:</b> {booking.customer_name}
            </p>
            <p>
              <b>Location:</b> {booking.location_name}
            </p>
            <p>
              <b>Slot:</b> {booking.slot}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className="status">{booking.status}</span>
            </p>

            {booking.status === "active" && (
              <button
                className="btn"
                onClick={() => startParking(booking.id)}
              >
                Start Parking
              </button>
            )}

            {booking.status === "parked" && (
              <button
                className="btn secondary"
                onClick={() => retrieveVehicle(booking.id)}
              >
                Retrieve Vehicle
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
