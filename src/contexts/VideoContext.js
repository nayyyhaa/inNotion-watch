import { createContext, useReducer, useContext } from "react";
import videoData from "toolkit/data/videoData";
import axios from "axios";
import { getVideoService } from "services";

const VideoContext = createContext();

const videoReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_VIDEOS":
      return action.payload;
    case "SET_COMMENT":
      return state.map((vid) =>
        vid._id === action.payload.id ? { ...vid, comments: [...vid.comments, action.payload.comments] } : vid
      );
    case "SET_NOTES":
      return state.map((vid) =>
        vid._id === action.payload.id
          ? { ...vid, notes: vid.notes ? [...vid.notes, action.payload.notes] : [action.payload.notes] }
          : vid
      );
    case "EDIT_NOTE":
      return state.map((vid) =>
        vid._id === action.payload.id
          ? {
              ...vid,
              notes: vid.notes.map((noteEl) =>
                noteEl.noteId === action.payload.noteId ? { ...noteEl, note: action.payload.notes } : noteEl
              ),
            }
          : vid
      );
    case "DELETE_NOTE":
      return state.map((vid) =>
        vid._id === action.payload.id
          ? {
              ...vid,
              notes: vid.notes.filter((noteEl) => noteEl.noteId !== action.payload.noteId),
            }
          : vid
      );
    default:
      return state;
  }
};

const VideoProvider = ({ children }) => {
  const [videos, dispatchVideos] = useReducer(videoReducer, []);

  const getVideo = async (id) => {
    try {
      const response = await getVideoService(id);
      return response;
    } catch (e) {
      console.error("getVideo : Error in fetching video", e);
    }
  };

  return <VideoContext.Provider value={{ videos, dispatchVideos, getVideo }}>{children}</VideoContext.Provider>;
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
