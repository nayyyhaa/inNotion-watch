import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { VideoProvider } from "contexts";
import { store } from "redux/store";

import { Provider } from "react-redux";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <VideoProvider>
          <App />
        </VideoProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
