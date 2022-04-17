import React from "react";
import PropTypes from "prop-types";
import { screen, fireEvent, render } from "@testing-library/react";
import MoviePanel from "../MoviePanel";
import { SavedMovieProvider } from "hooks/useSavedMovies";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";

const mockedMovie = {
  title: "test title",
  genres: [
    { id: 1, name: "genre1" },
    { id: 2, name: "genre2" },
  ],
  spoken_languages: [{ english_name: "test english name", name: "en" }],
  overview: "test overview",
  production_companies: [
    { id: 1, name: "test company1" },
    { id: 2, name: "test company2" },
  ],
};

jest.mock("../../../queries/useGetMovieById", () =>
  jest.fn(() => ({ movie: mockedMovie, isLoading: false, isFetching: false }))
);

const client = new QueryClient();

const WrapperComponent = ({ children }) => (
  <QueryClientProvider client={client}>
    <SavedMovieProvider>{children}</SavedMovieProvider>
    <ToastContainer />
  </QueryClientProvider>
);

WrapperComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

describe("MoviePanel component test", () => {
  it("renders and snapshot component", () => {
    const props = {
      selectedMovie: {},
      onSetSelectedMovie: jest.fn(),
    };

    const renederedComponent = render(<MoviePanel {...props} />, {
      wrapper: WrapperComponent,
    });

    expect(renederedComponent.baseElement).toMatchSnapshot();
  });

  it("clicks action button and save movie", async () => {
    const props = {
      selectedMovie: {},
      onSetSelectedMovie: jest.fn(),
    };

    render(<MoviePanel {...props} />, {
      wrapper: WrapperComponent,
    });

    const actionButton = await screen.findByTestId("action_button");
    fireEvent.click(actionButton);

    expect(await screen.findByText("Movie has been saved")).toBeDefined();
  });

  it("click to back to list", async () => {
    const props = {
      selectedMovie: {},
      onSetSelectedMovie: jest.fn(),
    };

    render(<MoviePanel {...props} />, {
      wrapper: WrapperComponent,
    });

    const backToListArrow = await screen.findByTestId("back_to_list_arrow");
    fireEvent.click(backToListArrow);

    expect(props.onSetSelectedMovie).toHaveBeenCalled();
  });

  it("clicks action button and remove movie", async () => {
    const mockedGetFavoriteMovie = jest.fn(() => mockedMovie);
    const mockedFavoriteMovieList = [];
    const mockedSetFavoriteMovieList = jest.fn(() => {});

    const mockedHooks = jest.fn(() => ({
      favoriteMovieList: mockedFavoriteMovieList,
      getFavoriteMovie: mockedGetFavoriteMovie,
      setFavoriteMovieList: mockedSetFavoriteMovieList,
    }));

    React.useContext = mockedHooks;

    const props = {
      selectedMovie: {},
      onSetSelectedMovie: jest.fn(),
    };

    render(<MoviePanel {...props} />, {
      wrapper: WrapperComponent,
    });

    const actionButton = await screen.findByTestId("action_button");
    fireEvent.click(actionButton);

    expect(await screen.findByText("Movie has been removed")).toBeDefined();
  });
});
