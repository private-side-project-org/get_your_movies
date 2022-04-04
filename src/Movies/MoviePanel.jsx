import React from "react";
import PropTypes from "prop-types";
import useGetMovieById from "queries/useGetMovieById";
import getMovieImage from "utils/getMovieImage";
import ClipLoader from "react-spinners/ClipLoader";

import "./moviePanel.scss";

const propTypes = {
  selectedMovie: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

const loaderStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
};

const MoviePanel = ({ selectedMovie }) => {
  const { movie, isLoading, isFetching } = useGetMovieById(selectedMovie.id);
  console.log("movie detail", movie);

  const poster = getMovieImage(movie?.poster_path, 400);

  return (
    <div className="moviePanel-container">
      {isLoading || isFetching || !poster ? (
        <ClipLoader color="#000000" css={loaderStyle} size={80} />
      ) : (
        <>
          <div className="moviePanel-image-container">
            <img src={poster} alt="poster" />
          </div>
          <div className="moviePanel-detail-contaienr">
            <h3>Title</h3>
            <ul>
              <li>genre</li>
            </ul>
            <ul>
              <li>language</li>
            </ul>
            <p>description</p>
            <ul>
              <li>production companyA</li>
              <li>production companyB</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

MoviePanel.propTypes = propTypes;

export default MoviePanel;
