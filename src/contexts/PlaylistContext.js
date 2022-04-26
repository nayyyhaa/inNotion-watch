import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { playlistReducer } from "reducers/playlistReducer";
import { createPlaylistService, deletePlaylistService, getPlaylistService } from "services";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [playlist, dispatchPlaylist] = useReducer(playlistReducer, {});
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getPlaylist = async () => {
    try {
      if (auth.isAuth) {
        const res = await getPlaylistService(auth.token);
        dispatchPlaylist({ type: "SET_PLAYLIST", payload: res.playlists });
      } else navigate("/login");
    } catch (err) {
      toast.error("Error in getting playlist");
    }
  };

  const createPlaylist = async (playlist) => {
    try {
      if (auth.isAuth) {
        const res = await createPlaylistService(auth.token, playlist);
        dispatchPlaylist({ type: "SET_PLAYLIST", payload: res.playlists });
      } else navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Error in adding to playlist");
    }
  };

  const deletePlaylist = async (id) => {
    try {
      if (auth.isAuth) {
        const res = await deletePlaylistService(auth.token, id);
        dispatchPlaylist({ type: "SET_PLAYLIST", payload: res.playlists });
        toast.info("Playlist deleted!");
      } else navigate("/login");
    } catch (e) {
      toast.error("Error in removing from playlist");
    }
  };

  return (
    <PlaylistContext.Provider value={{ playlist, dispatchPlaylist, getPlaylist, createPlaylist, deletePlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };
