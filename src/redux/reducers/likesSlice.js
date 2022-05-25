import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createLikesService, deleteLikesService, getLikesService } from "services";

const initialLikesState = { likes: JSON.parse(localStorage.getItem("user"))?.likes ?? [] };

export const getLikes = createAsyncThunk("likes/getLikes", async () => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await getLikesService(token);
      return res.likes;
    }
  } catch (err) {
    toast.error("Error in getting liked videos");
  }
});

export const createLikes = createAsyncThunk("likes/createLikes", async (video) => {
  const token = localStorage.getItem("innotion-watch-token");
  const isAuth = localStorage.getItem("isAuth");
  try {
    if (isAuth) {
      const res = await createLikesService(token, video);
      toast.success("Added to liked videos!");
      return res.likes;
    }
  } catch (err) {
    toast.error("Error in adding to liked videos");
  }
})

export const deleteLikes = createAsyncThunk("likes/deleteLikes", async (id) => {
  const token = localStorage.getItem("innotion-watch-token");
  try {
    const res = await deleteLikesService(token, id);
    toast.info("Removed from liked videos!");
    return res.likes;
  } catch (err) {
    toast.error("Error in removing from liked videos");
  }
});

const likesSlice = createSlice({
  name: "likes",
  initialState: initialLikesState,
  reducers: {
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
  },
  extraReducers: {
    [getLikes.fulfilled]: (state, action) => {
      state.likes = action.payload;
    },
    [createLikes.fulfilled]: (state, action) => {
      state.likes = action.payload;
    },
    [deleteLikes.fulfilled]: (state, action) => {
      state.likes = action.payload;
    },
  },
});

export const { setLikes } = likesSlice.actions;
export default likesSlice.reducer;
