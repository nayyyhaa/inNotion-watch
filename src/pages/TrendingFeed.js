import { Video } from "components";
import { useSelector } from "react-redux";
export const TrendingFeed = () => {
  const { videos } = useSelector((store) => store.videoReducer);
  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">Trending Videos</h1>
      <div className="grid-3-col full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
        {videos?.map((video) => video.trending && <Video key={video._id} video={video} />)}
      </div>
    </>
  );
};
