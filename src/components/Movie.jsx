import React from "react";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function Movie({ movieDeArray, setMovieForModal, handleShow }) {
  const navigate = useNavigate();
  function showModal() {
    setMovieForModal(movieDeArray);
    handleShow();
  }
  function Redirect() {
    navigate(`/pelicula/${movieDeArray.id}`);
  }
  return (
    <Col xs={3} onClick={Redirect} className="mb-4 movie-card ">
      <img
        className="img-fluid movie-poster"
        src={"http://image.tmdb.org/t/p/w500" + movieDeArray.poster_path}
        alt="poster"
      />
    </Col>
  );
}

export default Movie;
