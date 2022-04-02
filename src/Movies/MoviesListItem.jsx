import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

const MoviesListItem = ({ movie }) => {
  console.log("moie", movie);
  const { original_title, overview, backdrop_path } = movie;
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const imageSize = "w300";
  return (
    <div>
      <h3>{original_title}</h3>
      {backdrop_path && (
        <img
          src={`${imageBaseUrl}${imageSize}${backdrop_path}`}
          alt="movie_label"
        />
      )}
      <p>{overview}</p>
    </div>
  );
};

MoviesListItem.propTypes = propTypes;

export default MoviesListItem;