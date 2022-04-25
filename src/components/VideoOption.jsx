import { useModal, useWatchLater } from "contexts";
import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
import { toast } from "react-toastify";
export const VideoOption = ({ setOptionOpen, video }) => {
  const { setShowModal, setModalData } = useModal();
  const { watchList, dispatchWatchList } = useWatchLater();
  const index = watchList.findIndex((el) => el._id === video._id);
  return (
    <div className="video-option box-shd" onClick={() => setOptionOpen(false)}>
      <p
        onClick={() => {
          setShowModal(true);
          setModalData(video);
        }}
      >
        <MdPlaylistPlay />
        <span className="p-l-1">Add to playlist</span>
      </p>
      <p
        onClick={() => {
          dispatchWatchList({ type: "TOGGLE_WATCHLIST", payload: video });
          if (index > -1) toast.info("Removed from watchlist");
          else toast.success("Added to watchlist");
        }}
      >
        <MdWatchLater />
        <span className="p-l-1">{index > -1 && "Remove "} Watch later</span>
      </p>
    </div>
  );
};
