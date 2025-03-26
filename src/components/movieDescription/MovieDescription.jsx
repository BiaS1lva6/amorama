import { useEffect, useState } from "react";
import devFlix from "/favicon.png";

const MovieDescription = (props) => {
  const [videoKey, setVideoKey] = useState("");
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const poster = `https://image.tmdb.org/t/p/original/${props.poster_path}`;

  // Use TMDB API to fetch video key
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${
            props.media_type === "movie" ? "movie" : "tv"
          }/${props.id}/videos?language=pt-BR`, // Removendo a chave da URL
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const trailer = data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) {
            setVideoKey(trailer.key);
          }
        }
      } catch (error) {
        console.error("Error fetching video", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [props.id, props.media_type]);

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
              alt={`Imagem da capa do filme ${props.name}`}
              className="img-fluid w-100"
              style={{ objectFit: "cover", maxHeight: "480px" }}
            />
            <div className="position-absolute bottom-0 w-100 p-3 bg-gradient">
              <img src={devFlix} alt="" width="40" className="me-2" />
              <span className="text-uppercase ">
                {props.media_type || "Movie"}
              </span>
              <h1 className="h4 mt-2">{props.name}</h1>
              {/* Verificar se a chave do vídeo existe antes de renderizar o link */}
              {loading ? (
                <p>Carregando trailer...</p>
              ) : videoKey ? (
                <a
                  href={`https://www.youtube.com/watch?v=${videoKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light btn-sm mt-2"
                >
                  ▶️ Assistir Trailer
                </a>
              ) : (
                <p className="text-warning mt-2">Trailer não disponível</p>
              )}
            </div>
          </div>
          <div className="modal-footer flex-column align-items-start">
            <p className="mb-1">
              <strong>Avaliação:</strong> {props.vote_average} |{" "}
              <strong>Duração:</strong> {props.popularity} |{" "}
              <strong>Lançamento:</strong> {props.release_date}
            </p>
            <p className="mb-1">
              <strong>Idioma:</strong> {props.original_language}
            </p>
            <p className="mb-1">
              <strong>Gênero:</strong> Gênero
            </p>
            <p className="mt-2">
              <strong>Sinopse:</strong> {props.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
