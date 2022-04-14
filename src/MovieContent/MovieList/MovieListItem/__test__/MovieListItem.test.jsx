import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MovieListItem from "../MovieListItem";
import { SavedMovieProvider } from "hooks/useSavedMovies";

const onSetSelectedMovie = () => null;
const movie = {
  original_title: "test title",
  overview: "this is test overview",
  backdrop_path: "abcde12345",
};

describe("MovieListItem test", () => {
  it("get correct title, overview and backdrop_path", () => {
    const { getByText } = render(
      <MovieListItem
        movie={movie}
        onSetSelectedMovie={onSetSelectedMovie}
        selectedTab="search"
        isFirstMovie={false}
      />
    );

    getByText("test title");
    getByText("this is test overview");
  });

  it("render correctly, get proper image src", async () => {
    const { findByAltText } = render(
      <MovieListItem
        movie={movie}
        onSetSelectedMovie={onSetSelectedMovie}
        selectedTab="search"
        isFirstMovie={false}
      />
    );
    const targetImg = await findByAltText("movie_label");

    expect(targetImg.src).toContain(
      "https://image.tmdb.org/t/p/w300abcde12345"
    );
  });

  it("fire click event properly", () => {
    render(
      <MovieListItem
        movie={movie}
        onSetSelectedMovie={onSetSelectedMovie}
        selectedTab="search"
        isFirstMovie
      />,
      { wrapper: SavedMovieProvider }
    );

    const targetElem = screen.getByTestId("set-movie-button");

    fireEvent(
      targetElem,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });
});
