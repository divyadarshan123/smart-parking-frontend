import { useState } from "react";

import UserHome from "./screens/user/UserHome";
import DriverConsole from "./screens/driver/DriverConsole";
import ManagerDashboard from "./screens/manager/ManagerDashboard";
import SuperAdmin from "./screens/admin/SuperAdmin";

import RoleSwitch from "./components/RoleSwitch";
import "./App.css";

function App() {
  // 🔁 ROLE SWITCH (demo / testing purpose)
  const [role, setRole] = useState("user");

  // 👤 FIXED USERS (DB ke UUID se match)
  const USERS = {
    user: {
      id: "1605d5f3-6d96-41de-ad38-a376082dd374",
      name: "Divya Darshan",
      role: "user",
    },
    driver: {
      id: "7426cfbe-a751-43af-8250-cc5bda3639a4",
      name: "Rohit Kumar",
      role: "driver",
    },
    manager: {
      id: "a9ef0a6b-1427-4b69-a4d2-f3f224e483d2",
      name: "Udit",
      role: "manager",
    },
    admin: {
      id: "ad7266fc-207c-435d-9ba9-7bb6ef9912a2",
      name: "Kamal",
      role: "admin",
    },
  };

  const currentUser = USERS[role];

  return (
    <>
      {/* 🔁 ROLE SWITCH (sirf demo ke liye) */}
      <RoleSwitch role={role} setRole={setRole} />

      {/* 🧠 ROLE BASED SCREENS */}
      {role === "user" && <UserHome user={currentUser} />}

      {role === "driver" && (
        <DriverConsole driver={currentUser} />
      )}

      {role === "manager" && (
        <ManagerDashboard manager={currentUser} />
      )}

      {role === "admin" && (
        <SuperAdmin admin={currentUser} />
      )}
    </>
  );
}

export default App;
