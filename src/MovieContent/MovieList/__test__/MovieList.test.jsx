import React from "react";
import { render } from "@testing-library/react";
import MovieList from "../MovieList";

const movies = [
  {
    id: 1,
    original_title: "test title1",
    overview: "this is test overview1",
    backdrop_path: "abcde12345",
  },
  {
    id: 2,
    original_title: "test title2",
    overview: "this is test overview2",
    backdrop_path: "abcde12345",
  },
  {
    id: 3,
    original_title: "test title3",
    overview: "this is test overview3",
    backdrop_path: "abcde12345",
  },
];

// mocked variables
let hasNextPage = true;
let entries = [{ isIntersecting: true }];
const selectedTab = "search";

// mocked functions
const fetchNextPage = jest.fn();
const onSetSelectedMovie = jest.fn();

// prep mock intersectionObserver
const observe = jest.fn(() => {
  entries.forEach((entry) => {
    const intersecting = entry.isIntersecting;
    if (intersecting && hasNextPage) {
      fetchNextPage();
    }
  });
});

// mock intersectionObserver
window.IntersectionObserver = jest.fn(() => ({
  observe,
}));

let renderedMovieList;

beforeEach(() => {
  renderedMovieList = render(
    <MovieList
      movies={movies}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      onSetSelectedMovie={onSetSelectedMovie}
      selectedTab={selectedTab}
    />
  );
});

describe("MovieList test", () => {
  it("get props and generate snapshot", () => {
    expect(renderedMovieList.baseElement).toMatchSnapshot();
    hasNextPage = false;
  });

  test("not call fetchnextPage when loader is not on display", () => {
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
    hasNextPage = true;
  });

  test("call fetchnextPage once when loader is on display", () => {
    expect(fetchNextPage).toHaveBeenCalledTimes(2);
  });
});
