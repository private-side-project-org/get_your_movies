import { useQuery } from "react-query";
import { request } from "utils/request";

export default (id, { enabled }) => {
  const fetchMovieById = () => {
    const url = `/movie/${id}?api_key=${process.env.API_KEY}`;
    const response = request(url, {
      method: "GET",
    });

    return response;
  };

  const {
    data: movie,
    isLoading,
    isFetching,
  } = useQuery(["movie", id], fetchMovieById, {
    onSuccess: () => {
      console.log("success");
    },
    onError: (err) => {
      console.log("error", err);
    },
    enabled,
  });

  return {
    movie,
    isLoading,
    isFetching,
  };
};
