import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BibliografiaItaliana from "./pages/BibliografiaItaliana.jsx";
import SchedaLibro from "./pages/SchedaLibro.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#EEE" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bibliografia-italiana" element={<BibliografiaItaliana />} />
        <Route path="/bibliografia-italiana/scheda/:Id" element={<SchedaLibro />} />
      </Routes>
    </div>
  );
}
