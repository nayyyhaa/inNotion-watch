import { useHistory, useLikes, useModal, usePlaylist, useWatchLater } from "contexts";
import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const VideoCard = ({ video, label, cardData }) => {
  const { _id, thumbnail, shortTitle, creator, views, creatorThumbnail } = video;
  const { setShowModal, setModalData } = useModal();
  const { watchList, createWatchLater, deleteWatchLater } = useWatchLater();
  const { deleteLikes } = useLikes();
  const { dispatchPlaylist } = usePlaylist();
  const { deleteHistory } = useHistory();
  const index = watchList.findIndex((el) => el._id === video._id);

  const deleteHandler = (e) => {
    e.preventDefault();
    switch (cardData) {
      case "history":
        return deleteHistory(video._id);
      case "liked":
        return deleteLikes(video._id);
      case "playlist": {
        toast.info("Removed from Playlist");
        return dispatchPlaylist({
          type: "SET_TO_PLAYLIST",
          payload: {
            title: label,
            _id: video._id,
            video: video,
          },
        });
      }
      default:
        return null;
    }
  };
  return (
    <>
      <div className="card hz-card video-card left-text row-flex text-wrap w-80p h-20rm m-v-2">
        <Link to={`/watch/${_id}`} className="video-card-img h-20rm w-35p">
          <img className="video-card-img full-wd" src={thumbnail} alt="Blossom inscense sticks" />
        </Link>
        <button
          type="button"
          className="card-icon-btn icon-btn rd-bdr close-btn card-close-btn"
          onClick={(e) => deleteHandler(e)}
        >
          <MdClose />
        </button>
        <div className="card-header-text video-card-header h-20rm col-flex flex-start no-wrap">
          <Link to={`/watch/${_id}`} className="video-info row-flex no-wrap">
            <img className="avatar creater-thumbnail" src={creatorThumbnail} alt={creator} />
            <div className="video-description m-h-1 m-b-1">
              <p className="video-title">
                <strong>{shortTitle}</strong>
              </p>
              <small className="sub-heading">
                {creator} • {views}
              </small>
            </div>
          </Link>
          <div
            className="card-footer row-flex full-wd"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <button
              className="card-icon-btn icon-btn rd-bdr"
              onClick={() => {
                setShowModal(true);
                setModalData(video);
              }}
            >
              <MdPlaylistPlay />
            </button>
            <button
              className="p-l-1 card-icon-btn icon-btn rd-bdr"
              onClick={() => {
                if (index > -1) deleteWatchLater(video._id);
                else createWatchLater(video);
              }}
            >
              <MdWatchLater className={`${index > -1 ? "colored-text" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
