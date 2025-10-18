import { useEffect, useState } from "react";
import BookCard from "../components/BookCard.jsx";

export default function BibliografiaItaliana() {
  const [libri, setLibri] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtroTitolo, setFiltroTitolo] = useState("Tutti");
  const [filtroCasa, setFiltroCasa] = useState("Tutti");
  const [filtroAnno, setFiltroAnno] = useState("Tutti");

  useEffect(() => {
    fetch("/BibliografiaItaliana.json")
      .then(res => res.json())
      .then(data => {
        setLibri(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Caricamento libri...</p>;

  // Filtra libri
  const libriFiltrati = libri.filter(l => {
    return (filtroTitolo === "Tutti" || l.Titolo === filtroTitolo) &&
           (filtroCasa === "Tutti" || l["Casa Editrice"] === filtroCasa) &&
           (filtroAnno === "Tutti" || l["Prima Edizione"] === filtroAnno);
  });

  const titoli = ["Tutti", ...new Set(libri.map(l => l.Titolo))];
  const caseEditrici = ["Tutti", ...new Set(libri.map(l => l["Casa Editrice"]))];
  const anni = ["Tutti", ...new Set(libri.map(l => l["Prima Edizione"]))];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📚 Bibliografia Italiana</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select value={filtroTitolo} onChange={e => setFiltroTitolo(e.target.value)}>
          {titoli.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filtroCasa} onChange={e => setFiltroCasa(e.target.value)}>
          {caseEditrici.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filtroAnno} onChange={e => setFiltroAnno(e.target.value)}>
          {anni.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {libriFiltrati.map(libro => <BookCard key={libro.Id} libro={libro} />)}
      </div>
    </div>
  )
}
