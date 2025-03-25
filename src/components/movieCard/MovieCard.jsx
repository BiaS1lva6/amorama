import { useState } from "react";
import MovieDescription from "../movieDescription/MovieDescription";
import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="card m-3 shadow-sm movie" onClick={toggleModal} style={{ width: '310px', height: '460px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
        <div className="card-img-overlay d-flex align-items-center justify-content-center text-center" style={{ opacity: 0, transition: 'opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <p className="text-warning">{props.Year}</p>
        </div>

        <div className="card-img-top" style={{ height: '100%', width: '100%' }}>
          <img src={props.Poster} alt="" style={{ height: '100%', width: '100%' }} />
        </div>

        <div className="card-body bg-dark text-light position-absolute bottom-0 start-0 end-0 p-3" style={{ zIndex: 2, transition: 'background 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <span className="text-uppercase fw-bold" style={{ fontSize: '13px', letterSpacing: '2px' }}>{props.Type}</span>
          <h3 className="mt-2 text-warning">{props.Title}</h3>
        </div>
      </div>
      {isModalOpen && (
        <MovieDescription
          apiUrl={props.apiUrl}
          movieID={props.imdbID}
          click={toggleModal}
        />
      )}
    </>
  );
};

export default MovieCard;
