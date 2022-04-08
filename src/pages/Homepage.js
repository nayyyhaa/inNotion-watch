import { Sidebar } from "components";
import { useLocation } from "react-router-dom";
import { AllVideosFeed } from "./AllVideosFeed";

export const Homepage = () => {
  const location = useLocation();
  return (
    <>
      <div className="notefeed-layout row-flex no-wrap flex-start">
        <Sidebar />
        <main className="videos-content p-h-5">
          {location.pathname === "/" && <AllVideosFeed />}

          {/* NOTE: Will be uncommenting after adding pages */}
          {/* {location.pathname === "/trending-feed" && <TrendingFeed />}
          {location.pathname === "/liked-feed" && <LikedFeed />}
          {location.pathname === "/watch-later-feed" && <WatchLaterFeed />}
          {location.pathname === "/playlist-feed" && <PlaylistFeed />}
          {location.pathname === "/history-feed" && <HistoryFeed />} */}
        </main>
      </div>
    </>
  );
};
