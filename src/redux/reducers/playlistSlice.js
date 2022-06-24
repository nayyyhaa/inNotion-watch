import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createPlaylistDataService,
  createPlaylistService,
  deletePlaylistDataService,
  deletePlaylistService,
  getPlaylistService,
} from "services";

const initialPlaylistState = { playlist: JSON.parse(localStorage.getItem("user"))?.playlists ?? [] };

export const getPlaylist = createAsyncThunk("playlist/getPlaylist", async () => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await getPlaylistService(token);
      return res.playlists;
    }
  } catch (err) {
    toast.error("Error in getting playlist videos");
  }
});

export const createPlaylist = createAsyncThunk("playlist/createPlaylist", async (playlist) => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await createPlaylistService(token, playlist);
      return res.playlists;
    } else toast.error("Log in/ Sign up to begin");
  } catch (err) {
    console.error("Error in adding to playlist videos");
    toast.error("Error in creating playlist");
  }
});

export const deletePlaylist = createAsyncThunk("playlist/deletePlaylist", async (id) => {
  const token = localStorage.getItem("innotion-watch-token");
  try {
    const res = await deletePlaylistService(token, id);
    toast.info("Playlist deleted!");
    return res.playlists;
  } catch (err) {
    toast.error("Error in removing playlist");
  }
});

export const createPlaylistData = createAsyncThunk("playlist/createPlaylistData", async ({ id, playlist }) => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await createPlaylistDataService(token, id, playlist);
      toast.success("Added to Playlist!");
      return res.playlist;
    } else toast.error("Log in/ Sign up to begin");
  } catch (err) {
    console.error(err);
    toast.error("Error in adding to playlist");
  }
});

export const deletePlaylistData = createAsyncThunk("playlist/deletePlaylistData", async ({ id, videoId }) => {
  const token = localStorage.getItem("innotion-watch-token");
  try {
    const res = await deletePlaylistDataService(token, id, videoId);
    toast.info("Removed from Playlist!");
    return res.playlist;
  } catch (err) {
    toast.error("Error in removing from playlist");
  }
});

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialPlaylistState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
  },
  extraReducers: {
    [getPlaylist.fulfilled]: (state, action) => {
      state.playlist = action.payload;
    },
    [createPlaylist.fulfilled]: (state, action) => {
      state.playlist = action.payload;
    },
    [deletePlaylist.fulfilled]: (state, action) => {
      state.playlist = action.payload;
    },
    [createPlaylistData.fulfilled]: (state, action) => {
      state.playlist = state.playlist.map((el) => (el._id === action.payload._id ? { ...el, ...action.payload } : el));
    },
    [deletePlaylistData.fulfilled]: (state, action) => {
      state.playlist = state.playlist.map((el) => (el._id === action.payload._id ? { ...el, ...action.payload } : el));
    },
  },
});

export const { setPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
