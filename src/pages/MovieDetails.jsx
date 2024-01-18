import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MovieDetails() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b96e9e6aefb2fa33936d055a6e07fa83&language=es`
      )
      .then((response) => {
        if (response.data) {
          setMovie(response.data);
        }
      })
      .catch((error) => {
        console.error(
          "Error al cargar la película con la respectiva id",
          error
        );
        setMovie({ error: "Error al cargar la película con la respectiva id" });
      });
  }, []);

  function Redirect() {
    navigate(`/`);
  }

  return !movie ? (
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : movie.error ? (
    <h2>{movie.error}</h2>
  ) : (
    <div>
      <h1>{movie.title}</h1>
      <h2>{movie.overview}</h2>
      <button onClick={Redirect}>Regresar Home</button>
    </div>
  );
}

export default MovieDetails;
