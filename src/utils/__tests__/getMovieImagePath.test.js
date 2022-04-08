import getMovieImagePath from "../getMovieImagePath";

describe("getMovieImagePath unit test", () => {
  it("should get error when pass wrong type of width", () => {
    const wrongTypeWidth = "300";
    const imagePath = "12345abcde";

    const errorMessage = new Error(
      "Type error: type of given params in getMovieImagePath is wrong"
    );

    expect(() => getMovieImagePath(imagePath, wrongTypeWidth)).toThrow(
      errorMessage
    );
  });

  it("should get error when pass wrong type of imagePath", () => {
    const width = "300";
    const wrongTypeImagePath = 12345;

    const errorMessage = new Error(
      "Type error: type of given params in getMovieImagePath is wrong"
    );

    expect(() => getMovieImagePath(wrongTypeImagePath, width)).toThrow(
      errorMessage
    );
  });

  it("should returns full image path to be set to img tag", () => {
    const width = 400;
    const imagePath = "abcde12345";
    const imageBaseUrl = "https://image.tmdb.org/t/p/";
    const fullImagePath = `${imageBaseUrl}w${width}${imagePath}`;

    expect(getMovieImagePath(imagePath, width)).toEqual(fullImagePath);
  });
});
