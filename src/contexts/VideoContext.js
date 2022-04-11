import { createContext, useState, useContext } from "react";
import videoData from "toolkit/data/videoData";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(videoData);

  return <VideoContext.Provider value={{ videos, setVideos }}>{children}</VideoContext.Provider>;
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
