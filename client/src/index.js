import React from "react";
import reactDom from "react-dom";
import App from "./App";
import { CookiesProvider } from "react-cookie";

reactDom.render(
  <>
    <CookiesProvider CookiesProvider>
      <App />
    </CookiesProvider>
  </>,

  document.getElementById("root")
);
