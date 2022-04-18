import { Link } from "react-router-dom";
import { usePlaylist } from "contexts";
import noVideo from "toolkit/assets/search.svg";
import { BsFillPlayFill, BsTrashFill } from "react-icons/bs";
import { useEffect } from "react";

export const PlaylistFeed = () => {
  const { playlist, dispatchPlaylist } = usePlaylist();

  useEffect(() => {
    Object.keys(playlist).forEach((key) =>
      playlist[key].length < 1
        ? dispatchPlaylist({
            type: "DELETE_PLAYLIST",
            payload: {
              title: key,
            },
          })
        : key
    );
  }, []);
  
  let playListNames = Object.keys(playlist).filter((key) => playlist[key].length > 0);

  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">Playlists</h1>
      <div
        className={`${
          playListNames.length > 0 ? "grid-3-col" : ""
        } full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3`}
      >
        {playListNames?.length > 0 ? (
          playListNames?.map((list) => (
            <Link to={`${list}`} key={list} className="video m-2">
              <div className="video-content">
                <img className="video-img playlist-img" src={playlist[list][0].thumbnail} alt="thumbnail" />
                <div className="playlist-info row-flex">
                  <BsFillPlayFill />
                  <span>{playlist[list].length} videos</span>
                </div>
              </div>
              <div className="videos-content-header row-flex m-h-2 m-b-1">
                <p>
                  <strong>{list}</strong>
                </p>
                <button
                  className="card-icon-btn icon-btn rd-bdr delete-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatchPlaylist({
                      type: "DELETE_PLAYLIST",
                      payload: {
                        title: list,
                      },
                    });
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
