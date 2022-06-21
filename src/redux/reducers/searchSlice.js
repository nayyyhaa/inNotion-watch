import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = { searchIp: "" };

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setSearchIp: (state, action) => {
      state.searchIp = action.payload;
    },
  },
});

export const { setSearchIp } = searchSlice.actions;
export default searchSlice.reducer;
