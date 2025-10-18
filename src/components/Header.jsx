import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "#1F1F1F" }}>
      <Link to="/" style={{ color: "#EEE", fontSize: "1.5rem" }}>🏠 Home</Link>
      <Link to="/bibliografia-italiana" style={{ color: "#EEE" }}>Bibliografia Italiana</Link>
    </header>
  )
}
