import getMovieImage from "../getMovieImage";

describe("getMovieImage unit test", () => {
  it("should get error when pass wrong type of width", () => {
    const wrongTypeWidth = "300";
    const imagePath = "12345abcde";

    const errorMessage = new Error(
      "Type error: type of given params in getMovieImage is wrong"
    );

    expect(() => getMovieImage(imagePath, wrongTypeWidth)).toThrow(
      errorMessage
    );
  });

  it("should get error when pass wrong type of imagePath", () => {
    const width = "300";
    const wrongTypeImagePath = 12345;

    const errorMessage = new Error(
      "Type error: type of given params in getMovieImage is wrong"
    );

    expect(() => getMovieImage(wrongTypeImagePath, width)).toThrow(
      errorMessage
    );
  });

  it("should returns full image path to be set to img tag", () => {
    const width = 400;
    const imagePath = "abcde12345";
    const imageBaseUrl = "https://image.tmdb.org/t/p/";
    const fullImagePath = `${imageBaseUrl}w${width}${imagePath}`;

    expect(getMovieImage(imagePath, width)).toEqual(fullImagePath);
  });
});
