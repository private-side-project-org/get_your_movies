import React, { useEffect, useRef } from "react";

import MoviesListItem from "./MoviesListItem";
import SyncLoader from "react-spinners/SyncLoader";
import PropTypes from "prop-types";

import "./moviesList.scss";

const propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }).isRequired
  ),
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func.isRequired,
  onSetSelectedMovie: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

const MoviesList = ({
  movies,
  hasNextPage,
  fetchNextPage,
  onSetSelectedMovie,
  selectedTab,
}) => {
  const ref = useRef();
  const callback = (entries) => {
    entries.forEach((entry) => {
      const intersecting = entry.isIntersecting;
      if (intersecting && hasNextPage) {
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
    if (loader) {
      observer.observe(loader);
    }
  }, []);

  return (
    <div ref={ref} className="moviesList-container">
      {movies.map((movie, index) => {
        return (
          <MoviesListItem
            key={movie.id}
            movie={movie}
            isFirstMovie={index === 0}
            onSetSelectedMovie={onSetSelectedMovie}
            selectedTab={selectedTab}
          />
        );
      })}
      {hasNextPage && selectedTab !== "favorite" && (
        <div id="loader">
          <SyncLoader color="#000000" size={15} />
        </div>
      )}
    </div>
  );
};

MoviesList.propTypes = propTypes;

MoviesList.defaultProps = {
  hasNextPage: false,
};

export default MoviesList;
