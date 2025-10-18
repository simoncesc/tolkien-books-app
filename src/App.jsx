import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BibliografiaItaliana from "./pages/BibliografiaItaliana";
import SchedaLibro from "./pages/SchedaLibro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bibliografia-italiana" element={<BibliografiaItaliana />} />
        <Route path="/scheda/:Id" element={<SchedaLibro />} /> {/* :Id parametro */}
      </Routes>
    </BrowserRouter>
  );
}
