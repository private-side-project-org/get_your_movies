import React, { useEffect, useRef } from "react";

import MoviesListItem from "./MovieListItem/MovieListItem";
import SyncLoader from "react-spinners/SyncLoader";
import PropTypes from "prop-types";

import "./movieList.scss";

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

const MovieList = ({
  movies,
  hasNextPage,
  fetchNextPage,
  onSetSelectedMovie,
  selectedTab,
}) => {
  // ref hook to get root node(moviesList-container)
  const ref = useRef();

  // callback to execute pagination
  const callback = (entries) => {
    entries.forEach((entry) => {
      const intersecting = entry.isIntersecting;
      if (intersecting && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  // observer to execute callback when target node(loader) show up 100%(threshold 1) in root node
  const observer = new IntersectionObserver(callback, {
    root: ref.current,
    threshold: 1,
  });

  // set target node(loader) on observer
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
        <div id="loader" data-test-id="loader">
          <SyncLoader color="#000000" size={15} />
        </div>
      )}
    </div>
  );
};

MovieList.propTypes = propTypes;

MovieList.defaultProps = {
  hasNextPage: false,
};

export default MovieList;
