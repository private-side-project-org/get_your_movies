import { useQuery } from "react-query";
import { request } from "utils/request";

const fetchMovies = async ({ queryKey }) => {
  const url = `/search/movie?api_key=${process.env.API_KEY}&query=${queryKey[1].search}`;
  const response = request(url);

  return response;
};

export default (query) => {
  const { data } = useQuery(["movies", query], fetchMovies, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  return {
    movies: data,
  };
};
