import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>📚 Tolkien Books Italia</h1>
      <p>Benvenuto nella tua libreria interattiva.</p>
      <Link to="/bibliografia-italiana">Vai alla Bibliografia →</Link>
    </div>
  );
}
