import { createSlice } from "@reduxjs/toolkit";

const initialSidebarState = { showFilterBar: false };

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebarState,
  reducers: {
    setShowFilterBar: (state, action) => {
      state.showFilterBar = action.payload === 'close' ? false : !state.showFilterBar;
    },
  },
});

export const { setShowFilterBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
