/**
 * getMovieImage takes imgPath and width and return full image path to be set as src of img tag.
 *
 * @param { string } imgPath
 * @param { number } width
 *
 * @return { string } full image path
 */

export default (imgPath, width) => {
  if (
    imgPath &&
    width &&
    (typeof imgPath !== "string" || typeof width !== "number")
  ) {
    throw new Error(
      "Type error: type of given params in getMovieImage is wrong"
    );
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/";

  return `${imageBaseUrl}w${width}${imgPath}`;
};
