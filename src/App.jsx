import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Movies from "./Movies/MoviesContent";

import "assets/styles.scss";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Movies />
    </QueryClientProvider>
  );
};

export default App;
