import { Homepage, PlaylistVideos, PlaylistFeed, WatchLaterFeed } from "pages";
import { Footer, Navbar, PlaylistModal, Sidebar } from "components";
import { useModal } from "contexts";
import { Routes, Route } from "react-router-dom";
function App() {
  const { showModal } = useModal();
  return (
    <div className="App">
      <Navbar />
      <div className="video-layout row-flex no-wrap flex-start">
        <Sidebar />
        {showModal && <PlaylistModal />}
        <main className="videos-content">
          <Routes>
            <Route path="/home" element={<Homepage />} />
            <Route path="/playlist-feed" element={<PlaylistFeed />} />
            <Route path="/watch-later-feed" element={<WatchLaterFeed />} />
            <Route path="/playlist-feed/:id" element={<PlaylistVideos />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
