import React from "react";
import PropTypes from "prop-types";
import getMoviePath from "utils/getMovieImage";

import "./moviesListItem.scss";

const noImageAvailable = require("assets/icons/camera-reel.svg");

const propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    backdrop_path: PropTypes.string,
  }).isRequired,
  onSetSelectedMovie: PropTypes.func.isRequired,
  isFirstMovie: PropTypes.bool.isRequired,
};

const MoviesListItem = ({ movie, onSetSelectedMovie, isFirstMovie }) => {
  const { original_title, overview, backdrop_path } = movie;
  return (
    <div
      className="moviesListItem-container"
      onClick={() => onSetSelectedMovie(movie)}
      id={isFirstMovie ? "top" : ""}
    >
      <h3>{original_title}</h3>
      {backdrop_path ? (
        <img src={getMoviePath(backdrop_path, 300)} alt="movie_label" />
      ) : (
        <img
          src={noImageAvailable}
          alt="no_image_available"
          className="moviesListItem-no-image"
        />
      )}
      <p>{overview}</p>
    </div>
  );
};

MoviesListItem.propTypes = propTypes;

export default MoviesListItem;
