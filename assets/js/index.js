import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import App from "./containers/app.js";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
