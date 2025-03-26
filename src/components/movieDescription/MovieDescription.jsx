import { useEffect, useState } from "react";
import devFlix from "/favicon.png";

const MovieDescription = (props) => {

const {movie} = props;

  const poster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  const [movieDesc, setMovieDesc] = useState([]);

  // useEffect(() => {
  //   fetch(`${props.apiUrl}${props.movieID}`)
  //     .then((response) => response.json())
  //     .then((data) => setMovieDesc(data))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      onClick={props.click}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content bg-dark text-white">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={props.click}
            ></button>
          </div>
          <div className="modal-body p-0">
            <img
              src={poster}
              alt={`Imagem da capa do filme ${movie.title}`}
              className="img-fluid w-100"
              style={{ objectFit: "cover", maxHeight: "480px" }}
            />
            <div className="position-absolute bottom-0 w-100 p-3 bg-gradient">
              <img src={devFlix} alt="" width="40" className="me-2" />
              <span className="text-uppercase ">{movie.media_type || "Movie"}</span>
              <h1 className="h4 mt-2">{movie.title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                className="btn btn-light btn-sm mt-2"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
          <div className="modal-footer flex-column align-items-start">
            <p className="mb-1">
              <strong>Avaliação:</strong> {movie.vote_average} |{" "}
              <strong>Duração:</strong> {movie.popularity} |{" "}
              <strong>Lançamento:</strong> {movie.release_date}
            </p>
            <p className="mb-1">
              <strong>Idioma:</strong> {movie.original_language}
            </p>
            <p className="mb-1">
              <strong>Gênero:</strong> Gênero
            </p>
            <p className="mt-2">
              <strong>Sinopse:</strong> {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
