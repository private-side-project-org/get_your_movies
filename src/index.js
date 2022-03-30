import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";

// get root DOM
const container = document.getElementById("root");

// create root based on the root dom
const root = ReactDOMClient.createRoot(container);

// render root component on root dom
root.render(<App />);
