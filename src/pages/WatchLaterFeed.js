import { Video } from "components";
import { useSelector } from "react-redux";
import noVideo from "toolkit/assets/search.svg";

export const WatchLaterFeed = () => {
  const { watchList } = useSelector((store) => store.watchLaterReducer);
  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">Watch Later</h1>
      <div
        className={`${watchList.length > 0 ? "grid-3-col" : ""} full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3`}
      >
        {watchList.length > 0 ? (
          watchList?.map((video) => <Video key={video._id} video={video} />)
        ) : (
          <div className="grid-ctr m-v-5">
            <img className="w-60p no-video" src={noVideo} alt="no video" />
            <p className="m-t-3">No Video in WatchList</p>
          </div>
        )}
      </div>
    </>
  );
};
