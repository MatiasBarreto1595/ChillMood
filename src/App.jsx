import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Error404 from "./pages/Error404";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";
import Buscar from "./pages/Buscar";
import RedirectMovies from "./components/RedirectMovie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pelicula/:id" element={<MovieDetails />} />
      <Route path="/movie/:id" element={<RedirectMovies />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/buscar" element={<Buscar />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
