import { useEffect, useState } from "react";
import { api } from "../../api";

export default function ParkingHistory({ user }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    api(`/bookings/recent/${user.id}`).then((res) => {
      if (res.success) setList(res.data);
    });
  }, [user.id]);

  return (
    <div className="app">
      <div className="app-header">
        <h2>Parking History</h2>
        <p>Your past parkings</p>
      </div>

      {list.length === 0 && <p>No history found</p>}

      {list.map((b) => (
        <div className="booking-card" key={b.id}>
          <b>{b.location_name || "Parking Location"}</b>
          <p className="small">
            {new Date(b.start_time).toLocaleString()}
          </p>
          <span className="status">{b.status}</span>
        </div>
      ))}
    </div>
  );
}
