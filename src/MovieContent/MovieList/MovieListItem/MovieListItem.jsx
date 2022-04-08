import React from "react";
import PropTypes from "prop-types";
import getMovieImagePath from "utils/getMovieImagePath";
import useSavedMovies from "hooks/useSavedMovies";

import "./movieListItem.scss";

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
  selectedTab: PropTypes.string.isRequired,
};

const MovieListItem = ({ movie, onSetSelectedMovie, isFirstMovie }) => {
  const { getFavoriteMovie } = useSavedMovies();
  const { original_title, overview, backdrop_path } = movie;
  return (
    <div
      className="moviesListItem-container"
      onClick={() => {
        const favoriteMovie = getFavoriteMovie(movie);

        // set favoriteMovie to prevent extra api call if exists
        const movieToBeSet = favoriteMovie || { id: movie.id };
        onSetSelectedMovie(movieToBeSet);
      }}
      // set id #top to get user to go top when click `top` button
      id={isFirstMovie ? "top" : ""}
    >
      <h3>{original_title}</h3>
      {backdrop_path ? (
        <img src={getMovieImagePath(backdrop_path, 300)} alt="movie_label" />
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

MovieListItem.propTypes = propTypes;

export default MovieListItem;
