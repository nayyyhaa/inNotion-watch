import { VideoCard } from "components";
import { useSelector } from "react-redux";
import noVideo from "toolkit/assets/search.svg";

export const HistoryFeed = () => {
  const { history } = useSelector(store => store.historyReducer);
  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">History</h1>
      <div className="history-videos full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
        {history.length > 0 ? (
          history?.map((video) => <VideoCard key={video._id} video={video} cardData="history" />)
        ) : (
          <div className="grid-ctr m-v-5">
            <img className="w-60p no-video" src={noVideo} alt="no video" />
            <p className="m-t-3">No Video in history</p>
          </div>
        )}
      </div>
    </>
  );
};
