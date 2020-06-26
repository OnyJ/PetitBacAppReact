import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reduxStore from "./application/reduxStore";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./application/assets/stylesheets/bootstrapsketchy.min.css";

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
