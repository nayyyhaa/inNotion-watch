import { useModal, useWatchLater } from "contexts";
import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
import { toast } from "react-toastify";
export const VideoOption = ({ setOptionOpen, video }) => {
  const { setShowModal, setModalData } = useModal();
  const { watchList, deleteWatchLater, createWatchLater } = useWatchLater();
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
          if (index > -1) deleteWatchLater(video._id);
          else createWatchLater(video);
        }}
      >
        <MdWatchLater />
        <span className="p-l-1">{index > -1 && "Remove "} Watch later</span>
      </p>
    </div>
  );
};
