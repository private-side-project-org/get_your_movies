import React from "react";
import PropTypes from "prop-types";
import { fireEvent, render, screen } from "@testing-library/react";
import MovieContent from "../MovieContent";
import { QueryClientProvider, QueryClient } from "react-query";
import _ from "lodash";

_.debounce = jest.fn();

jest.mock("../../queries/useSearchMovies", () => {
  return jest.fn(() => ({
    searchedMovies: [],
    loadingMovies: false,
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
  }));
});

const client = new QueryClient();

const WrapperComponent = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

WrapperComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

describe("MovieContent test", () => {
  it("snapshots movieContent", async () => {
    const renderedComponent = render(<MovieContent />, {
      wrapper: WrapperComponent,
    });
    expect(renderedComponent.baseElement).toMatchSnapshot();
  });

  it("set value in input", async () => {
    render(<MovieContent />, {
      wrapper: WrapperComponent,
    });

    const searchInput = await screen.findByTestId("search_input");
    fireEvent.change(searchInput, { target: { value: "abc" } });
    expect(searchInput.value).toBe("abc");
  });

  it("switch favorite tab", async () => {
    render(<MovieContent />, {
      wrapper: WrapperComponent,
    });

    const favoriteTab = await screen.findByTestId("favorite_tab");
    fireEvent.click(favoriteTab);
    expect(favoriteTab.className).toBe("active");
  });

  it("switch search tab", async () => {
    render(<MovieContent />, {
      wrapper: WrapperComponent,
    });

    const searchTab = await screen.findByTestId("search_tab");
    fireEvent.click(searchTab);
    expect(searchTab.className).toBe("active");
  });
});
