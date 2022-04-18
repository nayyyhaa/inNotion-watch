import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { SidebarProvider, VideoProvider, WatchLaterProvider, PlaylistProvider } from "contexts";
import { ModalProvider } from "contexts/ModalContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <WatchLaterProvider>
          <PlaylistProvider>
            <SidebarProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </SidebarProvider>
          </PlaylistProvider>
        </WatchLaterProvider>
      </VideoProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
