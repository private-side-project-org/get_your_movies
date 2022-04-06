import React from "react";
import PropTypes from "prop-types";
import useGetMovieById from "queries/useGetMovieById";
import getMovieImage from "utils/getMovieImage";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

import "./moviePanel.scss";

const arrow = require("assets/icons/arrow.svg");
const noImageAvailable = require("assets/icons/camera-reel.svg");

const propTypes = {
  selectedMovie: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onSetSelectedMovie: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

const loaderStyle = {
  position: "absolute",
  top: "45%",
  left: "40%",
};

const MoviePanel = ({ selectedMovie, onSetSelectedMovie, selectedTab }) => {
  const { movie, isLoading, isFetching } = useGetMovieById(selectedMovie.id, {
    enabled: selectedTab !== "favorite",
  });

  const displayMovie = selectedTab !== "favorite" ? movie : selectedMovie;
  console.log("displaymovie", displayMovie);

  const poster = displayMovie?.poster_path
    ? getMovieImage(displayMovie?.poster_path, 400)
    : noImageAvailable;

  const handleSaveMovie = () => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    const hasSaved = savedMovies?.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (!hasSaved) {
      localStorage.setItem(
        "movies",
        JSON.stringify([...savedMovies, { ...movie }])
      );
      onSetSelectedMovie(movie);
      toast.success("Movie has been saved");
    } else {
      toast.error("You've already saved movie");
    }
  };

  return (
    <div className="moviePanel-container">
      {isLoading || isFetching || !poster ? (
        <ClipLoader color="#000000" css={loaderStyle} size={80} />
      ) : (
        <>
          <div className="moviePanel-image-container">
            <div
              className="moviePanel-arrow"
              onClick={() => onSetSelectedMovie(null)}
            >
              <img src={arrow} alt="back_to_list_arrow" />
              <p>Back to the list</p>
            </div>
            <img src={poster} alt="poster" />
          </div>
          <div className="moviePanel-detail-container">
            <div className="moviePanel-title-wrapper">
              <h2>{displayMovie.title}</h2>
              {selectedTab !== "favorite" && (
                <button type="button" onClick={handleSaveMovie}>
                  Save movie
                </button>
              )}
            </div>
            <div className="flex-row">
              <h4>Genre</h4>
              <ul className="flex-row">
                {displayMovie?.genres.map((genre) => {
                  return (
                    <li key={genre.id} className="label">
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex-row">
              <h4>Language</h4>
              <ul className="flex-row">
                {displayMovie?.spoken_languages.map((lang) => {
                  return (
                    <li key={lang.english_name} className="label">
                      {lang.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <p>{displayMovie.overview}</p>
            <div className="flex-row">
              <h4>Productions:</h4>
              <ul className="flex-column">
                {displayMovie.production_companies.map((company) => {
                  return <li key={company.id}>{company.name}</li>;
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

MoviePanel.propTypes = propTypes;

export default MoviePanel;
