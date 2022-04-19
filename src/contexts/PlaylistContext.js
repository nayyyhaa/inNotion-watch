import { createContext, useReducer, useContext } from "react";
import { playlistReducer } from "reducers/playlistReducer";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [playlist, dispatchPlaylist] = useReducer(playlistReducer, {});

  return <PlaylistContext.Provider value={{ playlist, dispatchPlaylist }}>{children}</PlaylistContext.Provider>;
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };
