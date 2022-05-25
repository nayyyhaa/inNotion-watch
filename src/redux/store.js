import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";
import searchReducer from "./reducers/searchSlice";
import modalReducer from "./reducers/modalSlice";
import sidebarReducer from "./reducers/sidebarSlice";
import watchLaterReducer from "./reducers/watchLaterSlice";
import likesReducer from "./reducers/likesSlice";
import historyReducer from "./reducers/historySlice";
import playlistReducer from "./reducers/playlistSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    searchReducer,
    modalReducer,
    sidebarReducer,
    watchLaterReducer,
    likesReducer,
    historyReducer,
    playlistReducer,
  },
});
