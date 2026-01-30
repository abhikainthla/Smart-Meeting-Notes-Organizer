import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { system } from "./theme";
import { NotesProvider } from "./context/NotesContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <NotesProvider>
      <App />
    </NotesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
