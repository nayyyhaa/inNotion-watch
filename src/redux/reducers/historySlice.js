import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createHistoryService, deleteHistoryService, getHistoryService } from "services";

const initialHistoryState = { history: JSON.parse(localStorage.getItem("user"))?.history ?? [] };

export const getHistory = createAsyncThunk("history/getHistory", async () => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await getHistoryService(token);
      return res.history;
    }
  } catch (err) {
    toast.error("Error in getting history videos");
  }
});

export const createHistory = createAsyncThunk("history/createHistory", async (video) => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await createHistoryService(token, video);
      return res.history;
    }
  } catch (err) {
    console.error("Error in adding to history videos");
  }
});

export const deleteHistory = createAsyncThunk("history/deleteHistory", async (id) => {
  const token = localStorage.getItem("innotion-watch-token");
  try {
    const res = await deleteHistoryService(token, id);
    toast.info("Removed from history videos!");
    return res.history;
  } catch (err) {
    toast.error("Error in removing from history videos");
  }
});

const historySlice = createSlice({
  name: "history",
  initialState: initialHistoryState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
  extraReducers: {
    [getHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
    [createHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
    [deleteHistory.fulfilled]: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setHistory } = historySlice.actions;
export default historySlice.reducer;
