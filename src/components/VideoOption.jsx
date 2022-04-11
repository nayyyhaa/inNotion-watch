import { useWatchLater } from "contexts";
import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
export const VideoOption = ({ setOptionOpen, video }) => {
  const { watchList, dispatchWatchList } = useWatchLater();
  const index = watchList.findIndex((el) => el._id === video._id);
  return (
    <div className="video-option box-shd" onClick={() => setOptionOpen(false)}>
      <p>
        <MdPlaylistPlay />
        <span className="p-l-1">Add to playlist</span>
      </p>
      <p onClick={() => dispatchWatchList({ type: "TOGGLE_WATCHLIST", payload: video })}>
        <MdWatchLater />
        <span className="p-l-1">{index > -1 && 'Remove '} Watch later</span>
      </p>
    </div>
  );
};
