import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { SavedMoviesProvider } from "hooks/useSavedMovies";
import Movies from "./Movies/MoviesContent";

import "react-toastify/dist/ReactToastify.css";
import "assets/styles.scss";

const App = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        // reset cache after 5min
        staleTime: 300000,
      },
    },
  });
  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: false,
  };
  return (
    <QueryClientProvider client={client}>
      <SavedMoviesProvider>
        <Movies />
      </SavedMoviesProvider>
      <ToastContainer {...toastOptions} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
