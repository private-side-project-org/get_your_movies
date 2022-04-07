import React, { useState } from "react";
import useSearchMovies from "../queries/useSearchMovies";
import MoviesList from "./MoviesList";
import MoviePanel from "./MoviePanel";
import debounce from "lodash/debounce";

import "./moviesContent.scss";

const clapperBoard = require("assets/icons/clapperboard.svg");

const Movies = () => {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTab, setSelectedTab] = useState("search");
  const {
    movies,
    loadingMovies,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchMovies({ search });

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const handleClickTab = (tab) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
    }
  };

  const favoriteMovieList = JSON.parse(localStorage.getItem("movies"));
  const movielist =
    selectedTab === "favorite" && favoriteMovieList
      ? favoriteMovieList
      : movies;

  const movieListRender = () => {
    if (selectedTab === "favorite" && movielist.length === 0) {
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
          <MoviesList
            movies={movielist}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onSetSelectedMovie={setSelectedMovie}
            selectedTab={selectedTab}
          />
        ) : (
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
            className={selectedTab === "search" ? "active" : ""}
            onClick={() => handleClickTab("search")}
          >
            Search result
          </h4>
          <h4
            className={`${selectedTab === "favorite" ? "active" : ""}`}
            onClick={() => handleClickTab("favorite")}
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
          selectedTab={selectedTab}
        />
      )}
    </div>
  );
};

export default Movies;
