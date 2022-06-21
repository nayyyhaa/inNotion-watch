import { Link } from "react-router-dom";
import noVideo from "toolkit/assets/search.svg";
import { BsFillPlayFill, BsTrashFill } from "react-icons/bs";
import noVideoIcon from "toolkit/assets/no-video.png";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist } from "redux/reducers/playlistSlice";

export const PlaylistFeed = () => {
  const { playlist } = useSelector((store) => store.playlistReducer);
  const dispatch = useDispatch()

  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">Playlists</h1>
      <div
        className={`${playlist.length > 0 ? "grid-3-col" : ""} full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3`}
      >
        {playlist?.length > 0 ? (
          playlist?.map((list) => (
            <Link to={`${list.title}`} key={list._id} className="playlist-video video m-2">
              <div className="video-content">
                <img
                  className="video-img playlist-img"
                  src={list?.videos[0]?.thumbnail ?? noVideoIcon}
                  alt="thumbnail"
                />
                <div className="playlist-info row-flex">
                  <BsFillPlayFill />
                  <span>{list?.videos?.length} videos</span>
                </div>
              </div>
              <div className="videos-content-header row-flex m-h-2 m-b-1">
                <p>
                  <strong>{list.title}</strong>
                </p>
                <button
                  className="card-icon-btn icon-btn rd-bdr delete-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deletePlaylist(list._id));
                  }}
                >
                  <BsTrashFill />
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="grid-ctr m-v-5">
            <img className="w-60p no-video" src={noVideo} alt="no playlist" />
            <p className="m-t-3">No Playlist created</p>
          </div>
        )}
      </div>
    </>
  );
};
