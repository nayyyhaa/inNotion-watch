import { PlaylistModal, Sidebar } from "components";
import { useModal } from "contexts";
import { useLocation } from "react-router-dom";
import { AllVideosFeed } from "./AllVideosFeed";
import { PlaylistFeed } from "./PlaylistFeed";
import { PlaylistVideos } from "./PlaylistVideos";
import { WatchLaterFeed } from "./WatchLaterFeed";

export const Homepage = () => {
  const location = useLocation();
  const { showModal } = useModal();
  return (
    <>
      {/* <div className="video-layout row-flex no-wrap flex-start">
        <Sidebar />
        {showModal && <PlaylistModal />}
        <main className="videos-content"> */}
          <AllVideosFeed />
          {/* {location.pathname === "/playlist-feed" && <PlaylistFeed />} */}
          {/* {location.pathname === "/playlist-feed/:id" && <PlaylistVideos />} */}
          {/* {location.pathname === "/watch-later-feed" && <WatchLaterFeed />} */}
          {/* NOTE: Will be uncommenting after adding pages */}
          {/* {location.pathname === "/trending-feed" && <TrendingFeed />}
          {location.pathname === "/liked-feed" && <LikedFeed />}
          {location.pathname === "/history-feed" && <HistoryFeed />} */}
        {/* </main>
      </div> */}
    </>
  );
};
