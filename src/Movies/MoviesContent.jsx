import React, { useState } from "react";
import useSearchMovies from "../queries/useSearchMovies";
import MoviesList from "./MoviesList";
import debounce from "lodash/debounce";

import "./moviesContent.scss";

const Movies = () => {
  const [search, setSearch] = useState("");
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
    <div id="top">
      <input onChange={handleSearch} />
      {!loadingMovies && movies?.length > 0 && (
        <>
          <MoviesList
            movies={movies}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
      <a href="#top" className="to-top-anchor">
        <span>Top</span>
      </a>
    </div>
  );
};

export default Movies;
