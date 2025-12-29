export default function BottomNav({ active, onChange }) {
  return (
    <div className="bottom-nav">
      <button
        className={active === "home" ? "active" : ""}
        onClick={() => onChange("home")}
      >
        Home
      </button>

      <button
        className={active === "history" ? "active" : ""}
        onClick={() => onChange("history")}
      >
        History
      </button>

      <button
        className={active === "settings" ? "active" : ""}
        onClick={() => onChange("settings")}
      >
        Settings
      </button>
    </div>
  );
}
