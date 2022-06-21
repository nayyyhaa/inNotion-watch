import { createSlice } from "@reduxjs/toolkit";

const initialUserState = { user: JSON.parse(localStorage.getItem("user")) ?? "" };

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    removeUser: (state) => {
      state.user = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
