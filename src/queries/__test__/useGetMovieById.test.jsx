import "whatwg-fetch";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useGetMovieById from "../useGetMovieById";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderHook } from "@testing-library/react-hooks";

// mock response with specific URL
const server = setupServer(
  rest.get(
    `${process.env.BASE_URL}/movie/76341?api_key=${process.env.API_KEY}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          adult: false,
          backdrop_path: "abcde12345",
          id: 12345,
        })
      );
    }
  )
);

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
});

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

it("should get movie by id", async () => {
  const { result, waitFor } = renderHook(
    () => useGetMovieById(76341, { enabled: true }),
    { wrapper }
  );
  await waitFor(() => result.current.isSuccess);
  expect(result.current.movie.id).toBe(12345);
});
