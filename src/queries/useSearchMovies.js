import { useInfiniteQuery } from "react-query";
import { request } from "utils/request";

const fetchMovies = async ({ queryKey, pageParam }) => {
  console.log("page param", pageParam);
  const url = `/search/movie?api_key=${process.env.API_KEY}&query=${queryKey[1].search}&page=${pageParam}`;
  const response = request(url, {
    method: "GET",
  });

  return response;
};

export default (query) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["movies", query], fetchMovies, {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("error");
      },
      getNextPageParam: (lastPage) => {
        return lastPage.page + 1 < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
      enabled: !!query.search,
    });

  console.log("data", data);

  const flattenData = data?.pages.reduce((movies, page) => {
    movies.push(...page.results);
    return movies;
  }, []);

  return {
    movies: flattenData,
    loadingMovies: isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
