export default (imgPath, width) => {
  if (
    imgPath &&
    width &&
    (typeof imgPath !== "string" || typeof width !== "number")
  ) {
    throw new Error(
      "Type error: type of given params in getMovieImagePath is wrong"
    );
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/";

  return `${imageBaseUrl}w${width}${imgPath}`;
};
