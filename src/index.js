import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {
  SidebarProvider,
  VideoProvider,
  WatchLaterProvider,
  PlaylistProvider,
  LikesProvider,
  HistoryProvider,
  AuthProvider,
  SearchProvider,
} from "contexts";
import { ModalProvider } from "contexts/ModalContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <VideoProvider>
          <WatchLaterProvider>
            <LikesProvider>
              <HistoryProvider>
                <PlaylistProvider>
                  <SearchProvider>
                    <SidebarProvider>
                      <ModalProvider>
                        <App />
                      </ModalProvider>
                    </SidebarProvider>
                  </SearchProvider>
                </PlaylistProvider>
              </HistoryProvider>
            </LikesProvider>
          </WatchLaterProvider>
        </VideoProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
