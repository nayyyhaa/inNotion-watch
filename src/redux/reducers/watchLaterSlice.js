import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createWatchLaterService, deleteWatchLaterService, getWatchLaterService } from "services";

const initialWatchLaterState = { watchList: JSON.parse(localStorage.getItem("user"))?.watchlater ?? [] };

export const getWatchLater = createAsyncThunk("watchlater/getWatchLater", async () => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await getWatchLaterService(token);
      return res.watchlater;
    }
  } catch (err) {
    toast.error("Error in getting watch later");
  }
});
export const createWatchLater = createAsyncThunk("watchlater/createWatchLater", async (video) => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await createWatchLaterService(token, video);
      toast.success("Added to watch later!");
      return res.watchlater;
    } else toast.error("Log in/ Sign up to begin");
  } catch (err) {
    toast.error("Error in adding to watch later");
  }
});
export const deleteWatchLater = createAsyncThunk("watchlater/deleteWatchLater", async (id) => {
  const token = localStorage.getItem("innotion-watch-token");
  try {
    const res = await deleteWatchLaterService(token, id);
    toast.info("Removed from watch later!");
    return res.watchlater;
  } catch (err) {
    toast.error("Error in removing from watch later");
  }
});

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: initialWatchLaterState,
  reducers: {
    setWatchLater: (state, action) => {
      state.watchList = action.payload;
    },
  },
  extraReducers: {
    [getWatchLater.fulfilled]: (state, action) => {
      state.watchList = action.payload;
    },
    [createWatchLater.fulfilled]: (state, action) => {
      state.watchList = action.payload;
    },
    [deleteWatchLater.fulfilled]: (state, action) => {
      state.watchList = action.payload;
    },
  },
});

export const { setWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;
