import { useModal, usePlaylist, useWatchLater } from "contexts";
import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
import { MdClose } from "react-icons/md";

export const VideoCard = ({ video, label }) => {
  const { thumbnail, shortTitle, creator, views, creatorThumbnail } = video;
  const { setShowModal, setModalData } = useModal();
  const { watchList, dispatchWatchList } = useWatchLater();
  const { dispatchPlaylist } = usePlaylist();
  const index = watchList.findIndex((el) => el._id === video._id);
  return (
    <>
      <div className="card hz-card cart-card left-text row-flex text-wrap w-80p h-20rm m-v-2">
        <img className="cart-card-img h-20rm w-35p" src={thumbnail} alt="Blossom inscense sticks" />
        <button
          type="button"
          className="card-icon-btn icon-btn rd-bdr close-btn card-close-btn"
          onClick={() =>
            dispatchPlaylist({
              type: "SET_TO_PLAYLIST",
              payload: {
                title: label,
                _id: video._id,
                video: video,
              },
            })
          }
        >
          <MdClose />
        </button>
        <div className="card-header-text cart-card-header h-20rm col-flex flex-start no-wrap">
          <div className="video-info row-flex no-wrap">
            <img className="avatar creater-thumbnail" src={creatorThumbnail} alt={creator} />
            <div className="video-description m-h-1 m-b-1">
              <p>
                <strong>{shortTitle}</strong>
              </p>
              <small className="sub-heading">
                {creator} • {views}
              </small>
            </div>
          </div>
          <div className="card-footer row-flex full-wd">
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
              onClick={() => dispatchWatchList({ type: "TOGGLE_WATCHLIST", payload: video })}
            >
              <MdWatchLater className={`${index > -1 ? "colored-text" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
