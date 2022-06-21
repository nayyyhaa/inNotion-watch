import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  auth: localStorage.getItem("innotion-watch-token")
    ? { token: localStorage.getItem("innotion-watch-token"), isAuth: true }
    : { token: "", isAuth: false },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = { ...state.auth, ...action.payload };
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
