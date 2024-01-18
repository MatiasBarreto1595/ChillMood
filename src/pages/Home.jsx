import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar";
import Movies from "../components/Movies";
import Rating from "../components/Rating";
import Header from "../components/Header";
import DescriptionModal from "../components/DescriptionModal";

function Home() {
  const [movies, setMovies] = React.useState([]);
  const [rating, setRating] = useState(0);
  const [movieForModal, setMovieForModal] = useState({});
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchMoreData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=b96e9e6aefb2fa33936d055a6e07fa83&language=es&page=${page}`
      );
      if (response.data.results.length > 0) {
        console.log(response);
        setMovies([...movies, ...response.data.results]);
      }

      if (response.data.total_pages >= page + 1) {
        setPage(page + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error al obtener datos de la API: ", error);
    }
    // setTimeout(() => {
    //   setDataSource(dataSource.concat(response.data.results.length === 20));
    // }, 500);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return !movies ? (
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <>
      <Navbar />
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>You are all set!</p>}
      >
        <div className="body">
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center rating-div">
                <Rating setRating={setRating} />
              </div>
              <Movies
                movies={movies}
                handleShow={handleShow}
                rating={rating}
                setMovieForModal={setMovieForModal}
              />
              <DescriptionModal
                show={show}
                handleClose={handleClose}
                movieForModal={movieForModal}
              />
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Home;
