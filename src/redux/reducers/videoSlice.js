import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getVideoService } from "services";

const initialVideosState = { videos: [] };

export const getVideo = async (id) => {
  try {
    const res = await getVideoService(id);
    return res;
  } catch (err) {
    toast.error("Error in getting videos");
  }
};

const videoSlice = createSlice({
  name: "video",
  initialState: initialVideosState,
  reducers: {
    getAllVideos: (state, action) => {
      state.videos = action.payload;
    },
    setComment: (state, action) => {
      state.videos = state.videos.map((vid) =>
        vid._id === action.payload.id ? { ...vid, comments: [...vid.comments, action.payload.comments] } : vid
      );
    },
    setNotes: (state, action) => {
      state.videos = state.videos.map((vid) =>
        vid._id === action.payload.id
          ? { ...vid, notes: vid.notes ? [...vid.notes, action.payload.notes] : [action.payload.notes] }
          : vid
      );
    },
    editNote: (state, action) => {
      state.videos = state.videos.map((vid) =>
        vid._id === action.payload.id
          ? {
              ...vid,
              notes: vid.notes.map((noteEl) =>
                noteEl.noteId === action.payload.noteId ? { ...noteEl, note: action.payload.notes } : noteEl
              ),
            }
          : vid
      );
    },
    deleteNote: (state, action) => {
      state.videos = state.videos.map((vid) =>
        vid._id === action.payload.id
          ? {
              ...vid,
              notes: vid.notes.filter((noteEl) => noteEl.noteId !== action.payload.noteId),
            }
          : vid
      );
    },
  },
});

export const { getAllVideos, setComment, setNotes, editNote, deleteNote } = videoSlice.actions;
export default videoSlice.reducer;
