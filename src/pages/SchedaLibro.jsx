import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SchedaLibro() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);

  useEffect(() => {
    fetch("/BibliografiaItaliana.json")
      .then(res => res.json())
      .then(data => {
        const l = data.find(b => b.Id === id);
        setLibro(l);
      });
  }, [id]);

  if (!libro) return <p>Caricamento...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">🏠 Torna alla Home</Link>
      <h2>{libro.Titolo}</h2>
      <img src={libro.Copertina || "/copertina_placeholder.png"} alt={libro.Titolo} style={{ width: "250px" }} />
      <p>Autore: {libro.Autore}</p>
      <p>Casa Editrice: {libro["Casa Editrice"]}</p>
      <p>Rilegatura: {libro.Rilegatura}</p>
      <p>Prima Edizione: {libro["Prima Edizione"]}</p>
      <p>Lingua: {libro.Lingua}</p>
    </div>
  )
}
