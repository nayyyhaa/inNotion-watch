import { createContext, useReducer, useContext } from "react";
import videoData from "toolkit/data/videoData";
import axios from "axios";
import { getVideoService } from "services";

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

  const getVideo = async (id) => {
    try {
      const response = await getVideoService(id);
      return response
    } catch (e) {
      console.error("getVideo : Error in fetching video", e);
    }
  };

  return <VideoContext.Provider value={{ videos, dispatchVideos, getVideo }}>{children}</VideoContext.Provider>;
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
