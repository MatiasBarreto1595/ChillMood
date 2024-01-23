import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TruncateText from "../components/TruncateText";
function MovieDetails() {
  const navigate = useNavigate();

  const [movies, setMovies] = React.useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [page, setPage] = useState(1);

  let { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [estrellas, setEstrellas] = useState(0);
  const handleClick = () => {
    setIsClicked(true);

    // Después de 1 segundo, vuelve a establecer isClicked en false
    setTimeout(() => {
      setIsClicked(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
  console.log("informacion de movie", movie);

  function calcularEstrellas(voteAverage) {
    if (voteAverage >= 1 && voteAverage < 2) {
      return 1;
    } else if (voteAverage >= 2 && voteAverage <= 4) {
      return 2;
    } else if (voteAverage > 4 && voteAverage <= 6) {
      return 3;
    } else if (voteAverage > 6 && voteAverage <= 8) {
      return 4;
    } else if (voteAverage > 8 && voteAverage <= 10) {
      return 5;
    } else {
      // Valor fuera de rango, manejar según sea necesario
      return 0; // Por ejemplo, podrías devolver 0 para indicar un valor inválido
    }
  }

  React.useEffect(() => {
    if (movie && movie.vote_average) {
      const voteAverage = movie.vote_average;
      const estrellasCalculadas = calcularEstrellas(voteAverage);
      console.log(`El número de estrellas a mostrar es: ${estrellas}`);
      setEstrellas(estrellasCalculadas);
    }
  }, [movie]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=b96e9e6aefb2fa33936d055a6e07fa83&language=es&page=${page}`
        );
        if (response.data.results.length > 0) {
          console.log(response);
          setMovies(response.data.results);
        }
        // console.log("API Response:", response.data);
        // setMovies(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la API: ", error);
      }
    };

    getMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      console.log("Movies totales:", movies);
      let updatedRandomMovie = [];
      const maxRandomMovies = Math.min(5, movies.length);

      while (updatedRandomMovie.length < maxRandomMovies) {
        const random = Math.floor(Math.random() * movies.length);
        const selectedMovie = movies[random];

        // Verifica si el producto no está ya en updatedRandomProduct
        if (
          !updatedRandomMovie.some((movie) => movie.id === selectedMovie.id)
        ) {
          updatedRandomMovie.push(selectedMovie);
          console.log("Producto aleatorio añadido:", selectedMovie);
        }
      }

      setRandomMovies(updatedRandomMovie);
    }
  }, [movies]);

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
    <div className="d-flex flex-column bg bg-dark">
      <div className="d-flex flex-row">
        <div className="d-flex flex-column">
          <p className="titleMovie">{movie.title}</p>

          <TruncateText
            className="textMovie text-limit"
            text={movie.overview}
            wordLimit={30}
          />

          {/* <p className="textMovie text-limit">{movie.overview}</p> */}

          <p className="text-white ">{movie.release_date}</p>
          <p className="text-white ">{movie.tagline}</p>

          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={estrellas > 1 ? "yellow" : "currentColor"}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={estrellas > 2 ? "yellow" : "currentColor"}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={estrellas >= 3 ? "yellow" : "currentColor"}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={estrellas >= 4 ? "yellow" : "currentColor"}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={estrellas >= 5 ? "yellow" : "currentColor"}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </p>
          <div className="divButton">
            <a
              href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
              className="link"
            >
              <button className="d-flex align-items-center justify-contenct-center trailerButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  fill="currentColor"
                  className="bi bi-play-btn-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                </svg>{" "}
                Trailer
              </button>
            </a>
          </div>
        </div>
        <div className="shadow">
          <img
            className="imageMovie"
            src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt="poster"
          />
        </div>
      </div>

      <div className="d-flex position-relative flex-md-row flex-column align-items-center justify-content-around mb-3">
        <h1 className="text-white secondaryMoviestitle">You May Also Like</h1>
        {randomMovies &&
          randomMovies.map((movieRandom) => (
            <div key={movieRandom.id} className="d-flex">
              <div className="align-self-baseline">
                <a href={`/pelicula/${movieRandom.id}`} key={movieRandom.id}>
                  <div
                    className="secondaryMoviesSize"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      className="secondaryMovies"
                      src={`http://image.tmdb.org/t/p/w500${movieRandom.poster_path}`}
                      alt="Original"
                      onClick={handleClick}
                    />
                  </div>
                </a>
              </div>
            </div>
          ))}
      </div>

      <button onClick={Redirect}>Regresar Home</button>
    </div>
  );
}

export default MovieDetails;
