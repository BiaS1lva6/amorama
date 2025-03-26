import { useState } from "react";
import MovieDescription from "../movieDescription/MovieDescription";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const poster = `https://image.tmdb.org/t/p/w300/${props.poster_path}`;
  const title = props.title || props.name || props.original_title;

  return (
    <>
      <div
        className={`card m-3 shadow-sm ${styles.movie}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className={`card-img-overlay d-flex align-items-center justify-content-center ${styles.overlay}`}
        >
          <p className="text-warning fw-bold">{props.release_date}</p>
        </div>

        <img
          src={poster}
          alt={`Poster do filme ${title}`}
          className="card-img-top img-fluid"
        />

        <div
          className={`card-body bg-dark text-light position-absolute bottom-0 w-100 p-3 ${styles.cardBody}`}
        >
          <span className="text-uppercase fw-bold small text-secondary">
            {props.media_type || "Filme"}
          </span>
          <h3 className="mt-2" style={{ color: "#FFBCD9" }}>
            {title}
          </h3>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription click={() => setIsModalOpen(false)} {...props} />
      )}
    </>
  );
};
export default MovieCard;
