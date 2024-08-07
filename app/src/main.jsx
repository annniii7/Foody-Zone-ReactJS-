import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createGlobalStyle } from "styled-components";

const Globalstyle=createGlobalStyle` // will be applicable globally!
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
   background-color:#323334 ;
   min-width: 100vh;
   color: white;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Globalstyle/>
    <App />
  </React.StrictMode>
);
