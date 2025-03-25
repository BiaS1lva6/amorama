import { useState } from "react";
import MovieDescription from "../movieDescription/MovieDescription";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./MovieCard.module.css";

const MovieCard = ({ Poster, Title, Type, Year, imdbID, apiUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`card m-3 shadow-sm ${styles.movie}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={`card-img-overlay d-flex align-items-center justify-content-center ${styles.overlay}`}>
          <p className="text-warning fw-bold">{Year}</p>
        </div>

        <img src={Poster} alt={`Poster do filme ${Title}`} className="card-img-top img-fluid" />

        <div className={`card-body bg-dark text-light position-absolute bottom-0 w-100 p-3 ${styles.cardBody}`}>
          <span className="text-uppercase fw-bold small text-secondary">{Type}</span>
          <h3 className="mt-2 text-pink">{Title}</h3>
        </div>
      </div>

      {isModalOpen && <MovieDescription apiUrl={apiUrl} movieID={imdbID} click={() => setIsModalOpen(false)} />}
    </>
  );
};

export default MovieCard;
