import React, { useEffect, useRef } from "react";

import MoviesListItem from "./MoviesListItem";
import SyncLoader from "react-spinners/SyncLoader";
import PropTypes from "prop-types";

import "./moviesList.scss";

const propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }).isRequired
  ),
  hasNextPage: PropTypes.bool.isRequired,
  fetchNextPage: PropTypes.func.isRequired,
};

const MoviesList = ({ movies, hasNextPage, fetchNextPage }) => {
  const ref = useRef();
  const callback = (entries) => {
    entries.forEach((entry) => {
      const intersecting = entry.isIntersecting;
      if (intersecting && hasNextPage) {
        console.log("fetch netxt page");
        fetchNextPage();
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    root: ref.current,
    threshold: 1,
  });

  useEffect(() => {
    const loader = document.getElementById("loader");
    console.log("loader", loader);
    if (loader) {
      observer.observe(loader);
    }
  }, []);

  return (
    <div ref={ref} className="movies-list">
      {movies.map((movie) => {
        return <MoviesListItem key={movie.id} movie={movie} />;
      })}
      {hasNextPage && (
        <div id="loader">
          <SyncLoader color="#000000" size={15} />
        </div>
      )}
    </div>
  );
};

MoviesList.propTypes = propTypes;

export default MoviesList;
