import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  Homepage,
  PlaylistVideos,
  PlaylistFeed,
  WatchLaterFeed,
  SingleVideoFeed,
  TrendingFeed,
  LikedFeed,
  HistoryFeed,
  Authorisation,
  ProfilePage,
} from "pages";
import { Footer, Navbar, PlaylistModal, Sidebar } from "components";
import { useModal, useVideo } from "contexts";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAsync } from "custom-hooks";
import { PrivateRoute } from "routes/PrivateRoute";
function App() {
  const { showModal } = useModal();
  const { dispatchVideos } = useVideo();
  const location = useLocation();
  const isSidebarVisible = !(location.pathname.includes("login") || location.pathname.includes("signup"));
  useAsync({
    url: "/api/videos",
    actionType: "GET_ALL_VIDEOS",
    dispatch: dispatchVideos,
    payloadType: "videos",
  });

  return (
    <div className="App">
      <Navbar />
      <div className="video-layout row-flex no-wrap flex-start">
        {isSidebarVisible && <Sidebar />}
        {showModal && <PlaylistModal />}
        <main className={`videos-content ${!isSidebarVisible ? "full-wd" : ""}`}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Authorisation />} />
            <Route path="/signup" element={<Authorisation />} />
            <Route path="/watch/:id" element={<SingleVideoFeed />} />
            <Route path="/trending-feed" element={<TrendingFeed />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/playlist-feed" element={<PlaylistFeed />} />
              <Route path="/history-feed" element={<HistoryFeed />} />
              <Route path="/liked-feed" element={<LikedFeed />} />
              <Route path="/watch-later-feed" element={<WatchLaterFeed />} />
              <Route path="/playlist-feed/:id" element={<PlaylistVideos />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </div>
  );
}

export default App;
