import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const SavedMovieContext = createContext({});

const savedMovieContextValues = () => {
  const [favoriteMovieList, setFavoriteMovieList] = useState(
    JSON.parse(localStorage.getItem("movies"))
  );
  const getFavoriteMovie = (movie) =>
    favoriteMovieList.find((favMovie) => favMovie.id === movie.id);

  return {
    favoriteMovieList,
    setFavoriteMovieList,
    getFavoriteMovie,
  };
};

export const SavedMoviesProvider = ({ children }) => {
  return (
    <SavedMovieContext.Provider value={savedMovieContextValues()}>
      {children}
    </SavedMovieContext.Provider>
  );
};

SavedMoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default () => useContext(SavedMovieContext);
