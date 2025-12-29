export default function Settings() {
  return (
    <div className="app">
      <div className="app-header">
        <h2>Settings</h2>
        <p>Manage your account</p>
      </div>

      <ul className="list">
        <li>Manage Vehicles</li>
        <li>Transaction History</li>
        <li>Help & Support</li>
        <li>FAQ</li>
      </ul>

      <button className="btn danger">Logout</button>
    </div>
  );
}
