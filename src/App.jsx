import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { SavedMovieProvider } from "hooks/useSavedMovies";
import MovieContent from "./MovieContent/MovieContent";

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
      <SavedMovieProvider>
        <MovieContent />
      </SavedMovieProvider>
      <ToastContainer {...toastOptions} />
    </QueryClientProvider>
  );
};

export default App;
