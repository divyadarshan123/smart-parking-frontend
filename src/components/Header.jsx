export default function Header({ title, subtitle }) {
  return (
    <div className="app-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
