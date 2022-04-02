import React, { useState } from "react";
import useSearchMovies from "../queries/useSearchMovies";
import useGetMovieById from "../queries/useGetMovieById";
import MoviesList from "./MoviesList";
import debounce from "lodash/debounce";

const Movies = () => {
  const [search, setSearch] = useState("");
  const { movies, loadingMovies } = useSearchMovies({ search });

  const handleSearch = debounce((e) => {
    console.log("input", e.target.value);
    setSearch(e.target.value);
  }, 500);

  return (
    <>
      <input onChange={handleSearch} />
      {!loadingMovies && movies?.results?.length > 0 && (
        <MoviesList movies={movies} />
      )}
    </>
  );
};

export default Movies;
