import React from "react";

import MoviesListItem from "./MoviesListItem";
import PropTypes from "prop-types";

const MoviesList = ({ movies }) => {
  console.log("movies", movies);
  return (
    <>
      {movies.results.map((movie) => {
        console.log("movie", movie);
        return <MoviesListItem key={movie.id} movie={movie} />;
      })}
    </>
  );
};

export default MoviesList;
