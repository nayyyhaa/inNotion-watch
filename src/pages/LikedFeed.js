import { VideoCard } from "components";
import { useLikes } from "contexts";
import noVideo from "toolkit/assets/search.svg";

export const LikedFeed = () => {
  const { likes } = useLikes();
  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">Liked Videos</h1>
      <div className="full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
        {likes.length > 0 ? (
          likes?.map((video) => <VideoCard key={video._id} video={video} />)
        ) : (
          <div className="grid-ctr m-v-5">
            <img className="w-60p no-video" src={noVideo} alt="no video" />
            <p className="m-t-3">No Video in likes</p>
          </div>
        )}
      </div>
    </>
  );
};
