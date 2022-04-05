import React, { useState } from "react";
import useSearchMovies from "../queries/useSearchMovies";
import MoviesList from "./MoviesList";
import MoviePanel from "./MoviePanel";
import debounce from "lodash/debounce";

import "./moviesContent.scss";

const Movies = () => {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
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

  return (
    <div className="moviesContent-container">
      <div
        className={`moviesContent-movies-list-wrapper ${
          selectedMovie ? "movie-selected" : ""
        }`}
      >
        <input onChange={handleSearch} />
        {!loadingMovies && movies?.length > 0 && (
          <>
            <MoviesList
              movies={movies}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onSetSelectedMovie={setSelectedMovie}
            />
          </>
        )}
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

export default Movies;
