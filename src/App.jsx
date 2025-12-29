import { useState } from "react";
import UserHome from "./screens/user/UserHome";
import "./App.css";

function App() {
  // 🔁 ROLE (sirf demo ke liye)
  const [role, setRole] = useState("user");

  // 👤 FIXED USER (DB se match karta hai)
  const USERS = {
    user: {
      id: "1605d5f3-6d96-41de-ad38-a376082dd374",
      name: "Divya Darshan",
      role: "user",
    },
  };

  const user = USERS[role];

  // 👉 ABHI SIRF USER SCREEN
  if (role === "user") {
    return <UserHome user={user} />;
  }

  return null;
}

export default App;
