import noVideo from "toolkit/assets/search.svg";
import { useParams } from "react-router-dom";
import { VideoCard } from "components";
import { useSelector } from "react-redux";

export const PlaylistVideos = () => {
  const { playlist } = useSelector((store) => store.playlistReducer);
  const { id } = useParams();
  const currPlaylist = playlist.find((el) => el.title === id);
  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">Playlists</h1>
      <h3 className="title centered-text">{id}</h3>
      <div className="playlist-videos full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
        {currPlaylist?.videos?.length > 0 ? (
          currPlaylist?.videos?.map((video) => (
            <VideoCard key={video._id} video={video} id={currPlaylist._id} cardData="playlist" />
          ))
        ) : (
          <div className="grid-ctr m-v-5">
            <img className="w-60p no-video" src={noVideo} alt="no playlist" />
            <h3 className="m-t-3">No Videos in Playlist {id}.</h3>
            <p className="p-t-2">Add videos to your playlist first.</p>
          </div>
        )}
      </div>
    </>
  );
};
