import { Sidebar } from "components";
import { useLocation } from "react-router-dom";
import { AllVideosFeed } from "./AllVideosFeed";
import { WatchLaterFeed } from "./WatchLaterFeed";

export const Homepage = () => {
  const location = useLocation();
  return (
    <>
      <div className="video-layout row-flex no-wrap flex-start">
        <Sidebar />
        <main className="videos-content">
          {location.pathname === "/" && <AllVideosFeed />}

          {location.pathname === "/watch-later-feed" && <WatchLaterFeed />}
          {/* NOTE: Will be uncommenting after adding pages */}
          {/* {location.pathname === "/trending-feed" && <TrendingFeed />}
          {location.pathname === "/liked-feed" && <LikedFeed />}
          {location.pathname === "/playlist-feed" && <PlaylistFeed />}
          {location.pathname === "/history-feed" && <HistoryFeed />} */}
        </main>
      </div>
    </>
  );
};
