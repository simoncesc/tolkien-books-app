import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SchedaLibro() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "BibliografiaItaliana.json")
      .then(res => res.json())
      .then(data => {
        setLibro(data.find(l => l.Id === Id) || null);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [Id]);

  if (loading) return <p style={{ color: "#141414ff", padding: "2rem" }}>⏳ Caricamento...</p>;
  if (!libro) return (
    <div style={{ color: "#E0E0E0", padding: "2rem" }}>
      <button onClick={() => navigate("/bibliografia-italiana")} style={buttonStyle}>🏠 Torna alla Bibliografia</button>
      <p>Libro non trovato.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#121212", color: "#E0E0E0", minHeight: "100vh", paddingBottom: "4rem" }}>
      <div style={{ padding: "1.5rem 8%" }}>
        <button onClick={() => navigate("/bibliografia-italiana")} style={buttonStyle}>🏠 Torna alla Bibliografia</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", padding: "2rem 8%", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 250px", maxWidth: "300px" }}>
          <img src={libro.Copertina || "https://via.placeholder.com/300x450?text=Nessuna+Immagine"} alt={libro.Titolo} style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }} />
        </div>

        <div style={{ flex: "2 1 400px" }}>
          <h1 style={{ color: "#6BC282", marginBottom: "0.5rem" }}>{libro.Titolo}</h1>
          <p style={{ color: "#BDBDBD", fontSize: "1.1rem", margin: "0.3rem 0" }}><strong>Autore:</strong> {libro.Autore}</p>
          <p style={{ color: "#BDBDBD", fontSize: "1.1rem", margin: "0.3rem 0" }}><strong>Casa Editrice:</strong> {libro["Casa Editrice"]}</p>
          <p style={{ color: "#BDBDBD", fontSize: "1.1rem", margin: "0.3rem 0" }}><strong>Rilegatura:</strong> {libro.Rilegatura}</p>
          <p style={{ color: "#BDBDBD", fontSize: "1.1rem", margin: "0.3rem 0" }}><strong>Prima Edizione:</strong> {libro["Prima Edizione"]}</p>
          <p style={{ color: "#BDBDBD", fontSize: "1.1rem", margin: "0.3rem 0" }}><strong>Lingua:</strong> {libro.Lingua}</p>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#1A1A1A",
  color: "#E0E0E0",
  border: "1px solid #333",
  borderRadius: "8px",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  fontSize: "0.95rem",
  transition: "all 0.2s ease",
};
