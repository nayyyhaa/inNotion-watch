import { createContext, useReducer, useContext } from "react";
import videoData from "toolkit/data/videoData";

const VideoContext = createContext();

const videoReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_VIDEOS":
      return action.payload;
    default:
      return state;
  }
};

const VideoProvider = ({ children }) => {
  const [videos, dispatchVideos] = useReducer(videoReducer, []);
  return <VideoContext.Provider value={{ videos, dispatchVideos }}>{children}</VideoContext.Provider>;
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
