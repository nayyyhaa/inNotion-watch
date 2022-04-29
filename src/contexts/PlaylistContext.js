import { createContext, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { playlistReducer } from "reducers/playlistReducer";
import {
  createPlaylistDataService,
  createPlaylistService,
  deletePlaylistDataService,
  deletePlaylistService,
  getPlaylistDataService,
  getPlaylistService,
} from "services";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [playlist, dispatchPlaylist] = useReducer(
    playlistReducer,
    JSON.parse(localStorage.getItem("user"))?.playlists ?? []
  );
  const { auth, user, setUser } = useAuth();
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
  const getPlaylistData = async (id) => {
    try {
      if (auth.isAuth) {
        const res = await getPlaylistDataService(auth.token, id);
        dispatchPlaylist({ type: "SET_PLAYLIST_DATA", payload: res.playlist });
      } else navigate("/login");
    } catch (err) {
      toast.error("Error in getting playlist");
    }
  };

  const createPlaylistData = async (id, playlist) => {
    try {
      if (auth.isAuth) {
        const res = await createPlaylistDataService(auth.token, id, playlist);
        dispatchPlaylist({ type: "SET_PLAYLIST_DATA", payload: res.playlist });
        toast.success("Added to Playlist!");
      } else navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Error in adding to playlist");
    }
  };

  const deletePlaylistData = async (id, videoId) => {
    try {
      if (auth.isAuth) {
        const res = await deletePlaylistDataService(auth.token, id, videoId);
        dispatchPlaylist({ type: "SET_PLAYLIST_DATA", payload: res.playlist });
        toast.info("Removed from playlist!");
      } else navigate("/login");
    } catch (e) {
      toast.error("Error in removing from playlist");
    }
  };

  useEffect(() => {
    const newUserData = { ...user, playlists: playlist };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  }, [playlist]);

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        dispatchPlaylist,
        getPlaylist,
        createPlaylist,
        deletePlaylist,
        getPlaylistData,
        createPlaylistData,
        deletePlaylistData,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };
