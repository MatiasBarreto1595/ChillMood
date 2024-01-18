import React, { useEffect } from "react";
import Movie from "./Movie";

function Movies({
  movies,
  //   moviesArray,
  rating,
  setMovieForModal,
  handleShow,
}) {
  const filtered = movies.filter(
    (movieDeArray) => movieDeArray.vote_average >= rating
  );
  return (
    <>
      {filtered.length > 0
        ? filtered.map((movieDeArray) => (
            <Movie
              key={movieDeArray.id}
              movieDeArray={movieDeArray}
              setMovieForModal={setMovieForModal}
              handleShow={handleShow}
            />
          ))
        : "Lo sentimos, no se encotraron películas con el rating solicitado"}
    </>
  );
}

export default Movies;
