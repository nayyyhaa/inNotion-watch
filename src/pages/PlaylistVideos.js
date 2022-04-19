import noVideo from "toolkit/assets/search.svg";
import { useParams } from "react-router-dom";
import { usePlaylist } from "contexts";
import { VideoCard } from "components";

export const PlaylistVideos = () => {
  const { playlist } = usePlaylist();
  const { id } = useParams();
  return (
    <>
      <h1 className="title colored-text centered-text m-t-3">Playlists</h1>
      <h3 className="title centered-text">{id}</h3>
      <div className="playlist-videos full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
        {playlist[id].length > 0 ? (
          playlist[id]?.map((video) => <VideoCard key={video._id} video={video} label={id} />)
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
