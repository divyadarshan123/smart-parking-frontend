export default function RoleSwitch({ role, setRole }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        padding: "10px",
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <button onClick={() => setRole("user")}>User</button>
      <button onClick={() => setRole("driver")}>Driver</button>
      <button onClick={() => setRole("manager")}>Manager</button>
      <button onClick={() => setRole("admin")}>Admin</button>
    </div>
  );
}
