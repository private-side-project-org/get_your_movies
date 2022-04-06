import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Movies from "./Movies/MoviesContent";

import "react-toastify/dist/ReactToastify.css";
import "assets/styles.scss";

const App = () => {
  const client = new QueryClient();
  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: false,
  };
  return (
    <QueryClientProvider client={client}>
      <Movies />
      <ToastContainer {...toastOptions} />
    </QueryClientProvider>
  );
};

export default App;
