import React from "react";
import PropTypes from "prop-types";
import useGetMovieById from "queries/useGetMovieById";
import getMovieImage from "utils/getMovieImage";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import useSavedMovies from "hooks/useSavedMovies";

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
  const { favoriteMovieList, getFavoriteMovie, setFavoriteMovieList } =
    useSavedMovies();
  const favoriteMovie = getFavoriteMovie(selectedMovie);

  const { movie, isLoading, isFetching } = useGetMovieById(selectedMovie.id, {
    enabled: selectedTab !== "favorite" && !favoriteMovie,
  });

  const displayMovie = favoriteMovie || movie;

  const poster = displayMovie?.poster_path
    ? getMovieImage(displayMovie?.poster_path, 400)
    : noImageAvailable;

  const handleSaveMovie = () => {
    const hasSaved = favoriteMovieList?.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (!hasSaved) {
      localStorage.setItem(
        "movies",
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
    const favoriteMovieList = JSON.parse(localStorage.getItem("movies"));
    const removeMovieIndex = favoriteMovieList.findIndex(
      (movie) => movie.id === selectedMovie.id
    );
    favoriteMovieList.splice(removeMovieIndex, 1);
    setFavoriteMovieList(favoriteMovieList);
    localStorage.setItem("movies", JSON.stringify(favoriteMovieList));
    onSetSelectedMovie({ id: selectedMovie.id });
    toast.error("Movie has been removed");
  };

  return (
    <div className="moviePanel-container">
      <div className="moviePanel-scroll-wrapper">
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
