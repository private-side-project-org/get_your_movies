import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { request } from "utils/request";

// mock response with specific URL
const server = setupServer(
  rest.get(
    `${process.env.BASE_URL}/movie/76341?api_key=${process.env.API_KEY}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ adult: false, backdrop_path: "abcde12345", id: 12345 })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("request fetch test", () => {
  const url = `/movie/76341?api_key=${process.env.API_KEY}`;
  it("fetches request and response with mocked server", async () => {
    const response = await request(url, {
      method: "GET",
    });

    // response.id must be custom one instead the one in url
    expect(response.id).toBe(12345);
  });
});
