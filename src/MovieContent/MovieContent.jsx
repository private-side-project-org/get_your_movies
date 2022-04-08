import React, { useState } from "react";
import useSearchMovies from "../queries/useSearchMovies";
import MovieList from "./MovieList/MovieList";
import MoviePanel from "./MoviePanel/MoviePanel";
import debounce from "lodash/debounce";
import CONSTANTS from "utils/constants";
import useSavedMovies from "hooks/useSavedMovies";

import "./movieContent.scss";

const clapperBoard = require("assets/icons/clapperboard.svg");
const { FAVORITE, SEARCH } = CONSTANTS.TAB_OPTIONS;

const MovieContent = () => {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTab, setSelectedTab] = useState(SEARCH);

  // query to get search result
  const {
    searchedMovies,
    loadingMovies,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchMovies({ search });

  // context movie list from localstorage
  const { favoriteMovieList } = useSavedMovies();

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const handleClickTab = (tab) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
    }
  };

  const movielist =
    selectedTab === FAVORITE && favoriteMovieList
      ? favoriteMovieList
      : searchedMovies;

  // list field render
  const movieListRender = () => {
    // render no favorite
    if (selectedTab === FAVORITE && movielist.length === 0) {
      return (
        <div className="moviesContent-no-result">
          <img src={clapperBoard} alt="clapper_board" />
          <h2>No favorite movie yet</h2>
          <p>You can save your favorite movies here.</p>
        </div>
      );
    }

    return (
      <>
        {!loadingMovies && movielist?.length > 0 ? (
          // render search result
          <MovieList
            movies={movielist}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onSetSelectedMovie={setSelectedMovie}
            selectedTab={selectedTab}
          />
        ) : (
          // render no result found
          <div className="moviesContent-no-result">
            <img src={clapperBoard} alt="clapper_board" />
            <h2>No result found</h2>
            <p>
              Or, you didn&apos;t try search? <br /> Get your movie from search
              bar.
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="moviesContent-container">
      <div
        className={`moviesContent-left-panel ${
          selectedMovie ? "movie-selected" : ""
        }`}
      >
        <h2>Movie Search</h2>
        <input onChange={handleSearch} placeholder="type keyword here..." />
        <div className="moviesContent-tabs">
          <h4
            className={selectedTab === SEARCH ? "active" : ""}
            onClick={() => handleClickTab(SEARCH)}
          >
            Search result
          </h4>
          <h4
            className={`${selectedTab === FAVORITE ? "active" : ""}`}
            onClick={() => handleClickTab(FAVORITE)}
          >
            Your favorites
          </h4>
        </div>
        <div
          className={`moviesContent-list-wrapper ${
            movielist.length === 0 ? "no-result" : ""
          }`}
        >
          {movieListRender()}
        </div>
        <a href="#top" className="moviesContent-anchor-to-top">
          <span>Top</span>
        </a>
      </div>
      {selectedMovie && (
        <MoviePanel
          selectedMovie={selectedMovie}
          onSetSelectedMovie={setSelectedMovie}
        />
      )}
    </div>
  );
};

export default MovieContent;
