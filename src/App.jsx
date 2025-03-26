import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Logo from "./assets/logo.png";
import Lupa from "./assets/search.svg";

const App = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };

  const apiUrl = `https://api.themoviedb.org/3/`;

  // Atualiza o tema conforme o sistema operacional
  const mudaTema = () => {
    const tema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-bs-theme", tema);
  };
  mudaTema();

  useEffect(() => {
    mudaTema();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", mudaTema);
  }, []);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(
      `${apiUrl}search/multi?query=${title}&language=pt&region=KR`,
      options
    );
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    searchMovies("드라마");
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(search);
    }
  };

  const handleSearchClick = () => {
    searchMovies(search);
  };

  return (
    <div id="app" className="container text-center py-5">
      {/* Logo */}
      <div className="d-flex justify-content-center">
        <img className="img-fluid w-50" src={Logo} alt="Logo" />
      </div>

      {/* Barra de Pesquisa (corrigida e centralizada) */}
      <div className="d-flex justify-content-center mt-5">
        <div className="search py-3 px-4 d-flex w-75 justify-content-between align-items-center rounded-pill shadow-sm bg-light">
          <input
            className="form-control bg-transparent border-0 text-dark "
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Pesquise por doramas"
          />

          <img
            src={Lupa}
            alt="Pesquisar"
            width="35"
            height="35"
            className="ms-2"
            onClick={handleSearchClick}
          />
        </div>
      </div>

      {/* Grid de Filmes */}
      {movies?.length > 0 ? (
        <div className="container">
          <div className="row">
            {movies.map((movie) => (
              <div key={movie.id} className="col-md-4 col-lg-3 mb-4">
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-muted mt-4">Nenhum K-Drama encontrado 🫰🏻</h2>
      )}

      {/* Rodapé */}
      <Footer devName="Livia e Bia" devLink="https://github.com/BiaS1lva6" />
    </div>
  );
};

export default App;
