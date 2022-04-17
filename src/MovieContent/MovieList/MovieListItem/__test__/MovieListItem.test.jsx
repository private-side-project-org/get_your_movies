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

let renderedMovieListItem;

beforeEach(() => {
  renderedMovieListItem = render(
    <MovieListItem
      movie={movie}
      onSetSelectedMovie={onSetSelectedMovie}
      selectedTab="search"
      isFirstMovie={false}
    />,
    { wrapper: SavedMovieProvider }
  );
});

describe("MovieListItem component test", () => {
  it("gets props and generate snapshot", () => {
    expect(renderedMovieListItem.baseElement).toMatchSnapshot();
  });

  it("get correct title, overview", () => {
    const { getByText } = renderedMovieListItem;

    getByText("test title");
    getByText("this is test overview");
  });

  it("renders, get proper image src", async () => {
    const { findByAltText } = renderedMovieListItem;
    const targetImg = await findByAltText("movie_label");

    expect(targetImg.src).toContain(
      "https://image.tmdb.org/t/p/w300abcde12345"
    );
  });

  it("fire click event", () => {
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
