import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import CONSTANTS from "utils/constants";

const { MOVIES } = CONSTANTS.LOCAL_STORAGE_KEYS;

// create context
const SavedMovieContext = createContext({});

// function that return values to be set on context
const savedMovieContextValues = () => {
  const [favoriteMovieList, setFavoriteMovieList] = useState(
    JSON.parse(localStorage.getItem(MOVIES)) || []
  );
  const getFavoriteMovie = (movie) =>
    favoriteMovieList.find((favMovie) => favMovie.id === movie.id);

  return {
    favoriteMovieList,
    setFavoriteMovieList,
    getFavoriteMovie,
  };
};

// provider
export const SavedMovieProvider = ({ children }) => {
  return (
    <SavedMovieContext.Provider value={savedMovieContextValues()}>
      {children}
    </SavedMovieContext.Provider>
  );
};

SavedMovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// consumer hook
export default () => useContext(SavedMovieContext);
