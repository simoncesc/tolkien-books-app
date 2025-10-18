import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BibliografiaItaliana() {
  const [libri, setLibri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [filtroTitolo, setFiltroTitolo] = useState("Tutti");
  const [filtroCasa, setFiltroCasa] = useState("Tutti");
  const [filtroAnno, setFiltroAnno] = useState("Tutti");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/BibliografiaItaliana.json")
      .then(res => res.json())
      .then(data => {
        setLibri(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore fetch JSON:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={loadingStyle}>⏳ Caricamento libri...</p>;
  if (error) return <p style={loadingStyle}>Errore: {error.message}</p>;

  // Filtraggio
  let libriFiltrati = libri.filter(libro => {
    let matchQuery = query === "" || Object.values(libro).some(val =>
      val && val.toString().toLowerCase().includes(query.toLowerCase())
    );
    let matchTitolo = filtroTitolo === "Tutti" || libro.Titolo === filtroTitolo;
    let matchCasa = filtroCasa === "Tutti" || libro["Casa Editrice"] === filtroCasa;
    let matchAnno = filtroAnno === "Tutti" || libro["Prima Edizione"] === filtroAnno;
    return matchQuery && matchTitolo && matchCasa && matchAnno;
  });

  // Opzioni filtri
  const titoli = ["Tutti", ...Array.from(new Set(libri.map(l => l.Titolo)))];
  const caseEditrici = ["Tutti", ...Array.from(new Set(libri.map(l => l["Casa Editrice"])))];
  const anni = ["Tutti", ...Array.from(new Set(libri.map(l => l["Prima Edizione"])))];

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <button onClick={() => navigate("/")} style={buttonHomeStyle}>🏠 Home</button>
        <h1 style={{ margin: 0, color: "#6BC282" }}>Bibliografia Italiana</h1>
      </div>

      {/* Hero */}
      <div style={heroStyle}>
        <img
          src="/assets/copertina_bg_it.jpg"
          alt="Hero"
          style={heroImageStyle}
        />
        <div style={heroTextStyle}>
          <h2>Scopri, aggiungi, colleziona</h2>
          <p>Benvenuto nella sezione dedicata alle opere italiane. Sfoglia i titoli, consulta le copertine e costruisci la tua collezione personale.</p>
        </div>
      </div>

      {/* Filtri */}
      <div style={filtroContainerStyle}>
        <input
          type="text"
          placeholder="🔎 Cerca..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={filtroInputStyle}
        />
        <select value={filtroTitolo} onChange={e => setFiltroTitolo(e.target.value)} style={filtroSelectStyle}>
          {titoli.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filtroCasa} onChange={e => setFiltroCasa(e.target.value)} style={filtroSelectStyle}>
          {caseEditrici.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filtroAnno} onChange={e => setFiltroAnno(e.target.value)} style={filtroSelectStyle}>
          {anni.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Griglia libri */}
      <div style={gridStyle}>
        {libriFiltrati.map(libro => (
          <div key={libro.Id} style={cardStyle} onClick={() => navigate(`/scheda/${libro.Id}`)}>
            <img
              src={libro.Copertina || "https://via.placeholder.com/180x270?text=Nessuna+Immagine"}
              alt={libro.Titolo}
              style={cardImageStyle}
            />
            <h4 style={{ margin: "0.5rem 0 0.2rem 0" }}>{libro.Titolo}</h4>
            <p style={{ margin: "0.2rem 0", fontSize: "0.9rem" }}>{libro.Autore}</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#BDBDBD" }}>
              <span>{libro["Casa Editrice"]}</span>
              <span>{libro["Prima Edizione"]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Stili
const containerStyle = { minHeight: "100vh", backgroundColor: "#121212", color: "#E0E0E0", paddingBottom: "4rem", fontFamily: "sans-serif" };
const loadingStyle = { color: "#E0E0E0", padding: "2rem" };
const headerStyle = { display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 8%" };
const buttonHomeStyle = { backgroundColor: "#1A1A1A", color: "#E0E0E0", border: "1px solid #333", borderRadius: "8px", padding: "0.5rem 1rem", cursor: "pointer" };
const heroStyle = { display: "flex", flexWrap: "wrap", gap: "2rem", padding: "2rem 8%" };
const heroImageStyle = { width: "250px", borderRadius: "12px", objectFit: "cover" };
const heroTextStyle = { flex: "1", minWidth: "250px" };
const filtroContainerStyle = { display: "flex", flexWrap: "wrap", gap: "1rem", padding: "0 8%", marginBottom: "2rem" };
const filtroInputStyle = { flex: "1", minWidth: "150px", padding: "0.5rem", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#1A1A1A", color: "#E0E0E0" };
const filtroSelectStyle = { flex: "1", minWidth: "120px", padding: "0.5rem", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#1A1A1A", color: "#E0E0E0" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", padding: "0 8%" };
const cardStyle = { backgroundColor: "#1D1D1D", borderRadius: "12px", padding: "0.5rem", cursor: "pointer", transition: "transform 0.2s", hover: { transform: "scale(1.02)" } };
const cardImageStyle = { width: "100%", height: "270px", objectFit: "cover", borderRadius: "8px" };
