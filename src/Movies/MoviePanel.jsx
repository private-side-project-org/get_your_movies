import React from "react";
import PropTypes from "prop-types";
import useGetMovieById from "queries/useGetMovieById";
import getMovieImage from "utils/getMovieImage";
import ClipLoader from "react-spinners/ClipLoader";

import "./moviePanel.scss";

const propTypes = {
  selectedMovie: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

const loaderStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
};

const MoviePanel = ({ selectedMovie }) => {
  const { movie, isLoading, isFetching } = useGetMovieById(selectedMovie.id);
  console.log("movie detail", movie);

  const poster = getMovieImage(movie?.poster_path, 400);

  return (
    <div className="moviePanel-container">
      {isLoading || isFetching || !poster ? (
        <ClipLoader color="#000000" css={loaderStyle} size={80} />
      ) : (
        <>
          <div className="moviePanel-image-container">
            <img src={poster} alt="poster" />
          </div>
          <div className="moviePanel-detail-container">
            <h2>{movie.title}</h2>
            <ul className="flex-row">
              <h4>Genre</h4>
              {movie.genres.map((genre) => {
                return (
                  <li key={genre.id} className="label">
                    {genre.name}
                  </li>
                );
              })}
            </ul>
            <ul className="flex-row">
              <h4>Language</h4>
              {movie.spoken_languages.map((lang) => {
                return (
                  <li key={lang.english_name} className="label">
                    {lang.name}
                  </li>
                );
              })}
            </ul>
            <p>{movie.overview}</p>
            <ul className="flex-column">
              <h4>Productions:</h4>
              {movie.production_companies.map((company) => {
                return <li key={company.id}>{company.name}</li>;
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

MoviePanel.propTypes = propTypes;

export default MoviePanel;
