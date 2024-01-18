import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RedirectMovies() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/pelicula/${id}`);
  }, []);

  return null;
}

export default RedirectMovies;
