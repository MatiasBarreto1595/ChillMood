import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
function MovieDetails() {
  const navigate = useNavigate();
  // const [products, setProducts] = useState([]);
  const [movies, setMovies] = React.useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [page, setPage] = useState(1);

  let { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [isHovered, setIsHovered] = useState(false);
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

  /////////////////////////////////////////////////////////

  // const fetchMoreData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?api_key=b96e9e6aefb2fa33936d055a6e07fa83&language=es&page=${page}`
  //     );
  //     if (response.data.results.length > 0) {
  //       console.log(response);
  //       setMovies([...movies, ...response.data.results]);
  //     }
  //   } catch (error) {
  //     console.error("Error al obtener datos de la API: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMoreData();
  // }, []);
  /////////////////////////////////////////////////////////

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
  // ACA HAY QUE VER PORQUE NO FUNCIONA CON LOS LLAMADOS DE LA API, EXPLOTA PERO VAMOS POR BUEN CAMINO, PROBA CON CHATGPT
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
          <h2 className="textMovie">{movie.overview}</h2>
        </div>
        <img
          className="imageMovie"
          src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt="poster"
        />
      </div>
      <h1 className="text-center  mt-5">YOU MAY ALSO LIKE</h1>
      <div className="d-flex flex-md-row flex-column align-items-center justify-content-around ">
        {randomMovies &&
          randomMovies.map((movieRandom) => (
            <div key={movieRandom.id} className="d-flex">
              <div className="align-self-baseline">
                <Link to={`/pelicula/${movieRandom.id}`} key={movieRandom.id}>
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
                </Link>
              </div>
            </div>
          ))}
      </div>

      <button onClick={Redirect}>Regresar Home</button>
    </div>
  );
}

export default MovieDetails;
