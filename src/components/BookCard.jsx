import { Link } from "react-router-dom";

export default function BookCard({ libro }) {
  return (
    <Link to={`/scheda/${libro.Id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        borderRadius: "10px",
        backgroundColor: "#1E1E1E",
        padding: "10px",
        width: "180px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <img src={libro.Copertina || "/copertina_placeholder.png"} alt={libro.Titolo}
             style={{ width: "100%", height: "270px", objectFit: "cover", borderRadius: "8px" }} />
        <h4 style={{ margin: 0 }}>{libro.Titolo}</h4>
        <p style={{ margin: 0 }}>{libro.Autore}</p>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
          <span>{libro["Casa Editrice"]}</span>
          <span>{libro["Prima Edizione"]}</span>
        </div>
      </div>
    </Link>
  )
}
