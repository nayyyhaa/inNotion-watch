import { useHistory, useLikes, useModal, usePlaylist, useWatchLater } from "contexts";
import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const VideoCard = ({ video, label, cardData }) => {
  const { _id, thumbnail, shortTitle, creator, views, creatorThumbnail } = video;
  const { setShowModal, setModalData } = useModal();
  const { watchList, dispatchWatchList } = useWatchLater();
  const { likes, dispatchLikes } = useLikes();
  const { dispatchPlaylist } = usePlaylist();
  const { dispatchHistory } = useHistory();
  const index = watchList.findIndex((el) => el._id === video._id);
  const likesIndex = likes.findIndex((el) => el._id === video._id);

  const deleteHandler = (e) => {
    e.preventDefault();
    switch (cardData) {
      case "history": {
        toast.info("Removed from History");
        return dispatchHistory({ type: "REMOVE_FROM_HISTORY", payload: video });
      }
      case "liked": {
        if (likesIndex > -1) toast.info("Removed from Liked videos");
        else toast.success("Added to Liked videos");
        return dispatchLikes({ type: "TOGGLE_LIKES", payload: video });
      }
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
                dispatchWatchList({ type: "TOGGLE_WATCHLIST", payload: video });
                if (index > -1) toast.info("Removed from watchlist");
                else toast.success("Added to watchlist");
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
