import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { ThemeProvider } from "styled-components";
import store from "./redux/store";
import { Provider } from "react-redux";

const theme = {
  basicColors: {
    white: "#FFF5F6",
    black: "#000000",
  },

  primaryColors: {
    primaryLighter: "#f8dfc2",
    // primaryLighter: "#FFC6B0",
    primaryLight: "#FFC6B0",
    // primaryLight: "#E68965",
    primary: "#ED784A",
    primaryDark: "#E98B2A",
    // primaryDark: "#D65B2B",
    primaryDarker: "#7A2F11",
  },

  secondaryColors: {
    secondaryLighter: "#BFDBDE",
    secondaryLight: "#9BB7BA",
    secondary: "#77969A",
    secondaryDark: "#5C7B80",
    secondaryDarker: "#355257",
  },

  fontSizes: {
    extraLarge: "30px",
    large: "26px",
    medium: "20px",
    small: "16px",
    extraSmall: "12px",
  },

  titles: {
    h1: "4.5rem",
    h2: "3.5rem",
    h3: "2.3rem",
    h4: "1.8rem",
    h5: "1.6rem",
    h6: "1.3rem",
  },

  Wrappers: {
    maxWidth: "80vw",
    mediumWidth: "70vw",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
