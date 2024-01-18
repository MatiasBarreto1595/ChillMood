import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
function Buscar() {
  const [movieSearch, setMovieSearch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMoreData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=c70a7781517a23c0322947050a8c501f`
      );
      setMovieSearch(response.data.results);
    } catch (error) {
      console.error("Error al buscar la película ", error);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setMovieSearch(null);
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          value={searchTerm}
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Buscar"
          aria-label="Buscar"
          aria-describedby="basic-addon1"
        />
      </div>
      <div>
        <div className="container">
          {movieSearch == [] && searchTerm.trim() !== "" && (
            <h2>
              Lo sentimos, no se encontraron películas con el título buscado.
            </h2>
          )}
          <Row>
            {movieSearch &&
              movieSearch.map((movie) => (
                <Col xs={4} className="mb-4 movie-card" key={movie.id}>
                  <h1>{movie.original_title}</h1>
                  <img
                    className="img-fluid movie-poster"
                    src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt="poster"
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Buscar;
