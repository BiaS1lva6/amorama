import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Logo from "./assets/logo.png";
import Lupa from "./assets/search.svg";

const App = () => {


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTFjZjFiOWYxNjk5Y2ZiOTEwMzI2NzJkZDA5MWQ0ZCIsIm5iZiI6MTc0MjMyNzA5Ny44OTEsInN1YiI6IjY3ZDljZDM5M2QyNTQ2ODIzMWQ0YmEwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.opxVVZu22N00l54A_VxfzGLxhDABlSsHjnBPMO3lw7w'
    }
  };

  const apiUrl = `https://api.themoviedb.org/3/`

  const mudaTema = () => {
    const tema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-bs-theme", tema);
  };

  useEffect(() => {
    mudaTema();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", mudaTema);
  }, []);



  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  // const apiKey = "e4d577fa";
  // const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;



  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}search/tv?query=${title}&language=pt-BR`, options);
    const data = await response.json();
    setMovies(data.results);
  };


  useEffect(() => {
    searchMovies("Drama");
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(search);
    }
  };

  return (
    <div id="app">
      <img className="logo" src={Logo} alt="Logo" />

      <div className="search bg-custom">
        <input
          className="form-control border-0"
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquise por filmes"
        />
        <img  src={Lupa} alt="Pesquisar" />

        onClick={() => searchMovies(search)}
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
             key={movie.id}
             movie={movie}
              />
          ))}
        </div>
      ) : (
        <h2 className="empty">Nenhum K-Drama encontrado 🫰🏻</h2>
      )}

      <Footer devName={"Livia e Bia"} devLink={"https://github.com/BiaS1lva6"} />
    </div>
  );
};

export default App;
