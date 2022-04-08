import React from "react";
import PropTypes from "prop-types";
import useGetMovieById from "queries/useGetMovieById";
import getMovieImage from "utils/getMovieImage";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import useSavedMovies from "hooks/useSavedMovies";
import CONSTANTS from "utils/constants";

import "./moviePanel.scss";

const { MOVIES } = CONSTANTS.LOCAL_STORAGE_KEYS;

const arrow = require("assets/icons/arrow.svg");
const noImageAvailable = require("assets/icons/camera-reel.svg");

const propTypes = {
  selectedMovie: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onSetSelectedMovie: PropTypes.func.isRequired,
};

const loaderStyle = {
  position: "absolute",
  top: "45%",
  left: "40%",
};

const MoviePanel = ({ selectedMovie, onSetSelectedMovie }) => {
  const { favoriteMovieList, getFavoriteMovie, setFavoriteMovieList } =
    useSavedMovies();

  // single movie to be displayed on panel if exists
  const favoriteMovie = getFavoriteMovie(selectedMovie);

  // query to get single movie to be displayed if favorite doesn't exist
  const { movie, isLoading, isFetching } = useGetMovieById(selectedMovie.id, {
    enabled: !favoriteMovie,
  });

  // define which movie(favorite or movie from query) to be displayed
  const displayMovie = favoriteMovie || movie;

  const handleSaveMovie = () => {
    const hasSaved = favoriteMovieList?.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (!hasSaved) {
      localStorage.setItem(
        MOVIES,
        JSON.stringify([...favoriteMovieList, { ...movie }])
      );
      setFavoriteMovieList([...favoriteMovieList, { ...movie }]);
      onSetSelectedMovie(movie);
      toast.success("Movie has been saved");
    } else {
      toast.error("You've already saved movie");
    }
  };

  const handleRemoveMovie = () => {
    // get index of the movie to be removed
    const removeMovieIndex = favoriteMovieList.findIndex(
      (movie) => movie.id === selectedMovie.id
    );
    // take out target movie from favorite list
    favoriteMovieList.splice(removeMovieIndex, 1);
    // set updated movie on context
    setFavoriteMovieList(favoriteMovieList);
    // set updated movie list on local storage
    localStorage.setItem("movies", JSON.stringify(favoriteMovieList));

    // set id on selectedMovie to run query after remove movie in order to persist to display movie on panel
    onSetSelectedMovie({ id: selectedMovie.id });
    toast.success("Movie has been removed");
  };

  const poster = displayMovie?.poster_path
    ? getMovieImage(displayMovie?.poster_path, 400)
    : noImageAvailable;

  return (
    <div className="moviePanel-container">
      <div className="moviePanel-scroll-wrapper">
        {isLoading || isFetching ? (
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
                {
                  <button
                    type="button"
                    onClick={
                      favoriteMovie ? handleRemoveMovie : handleSaveMovie
                    }
                    className={`${favoriteMovie ? "remove" : ""}`}
                  >
                    {favoriteMovie ? "Remove" : "Save movie"}
                  </button>
                }
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
    </div>
  );
};

MoviePanel.propTypes = propTypes;

export default MoviePanel;
