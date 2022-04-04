import { useQuery } from "react-query";
import { request } from "utils/request";

const fetchMovieById = ({ queryKey }) => {
  console.log(queryKey);
  const url = `/movie/${queryKey[1]}?api_key=${process.env.API_KEY}`;
  const response = request(url, {
    method: "GET",
  });

  return response;
};

export default (id) => {
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
    enabled: !!id,
  });

  return {
    movie,
    isLoading,
    isFetching,
  };
};
