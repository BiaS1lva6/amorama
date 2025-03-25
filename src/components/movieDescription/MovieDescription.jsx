import { useEffect, useState } from "react";
import devFlix from "/favicon.png";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);

  useEffect(() => {
    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then((data) => setMovieDesc(data))
      .catch((error) => console.error(error));
  }, []);

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
              src={movieDesc.Poster}
              alt={`Imagem da capa do filme ${movieDesc.Title}`}
              className="img-fluid w-100"
              style={{ objectFit: "cover", maxHeight: "480px" }}
            />
            <div className="position-absolute bottom-0 w-100 p-3 bg-gradient">
              <img src={devFlix} alt="" width="40" className="me-2" />
              <span className="text-uppercase ">{movieDesc.Type}</span>
              <h1 className="h4 mt-2">{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(
                  movieDesc.Title
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
              <strong>Avaliação:</strong> {movieDesc.imdbRating} |{" "}
              <strong>Duração:</strong> {movieDesc.Runtime} |{" "}
              <strong>Lançamento:</strong> {movieDesc.Released}
            </p>
            <p className="mb-1">
              <strong>Elenco:</strong> {movieDesc.Actors}
            </p>
            <p className="mb-1">
              <strong>Gênero:</strong> {movieDesc.Genre}
            </p>
            <p className="mt-2">
              <strong>Sinopse:</strong> {movieDesc.Plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
