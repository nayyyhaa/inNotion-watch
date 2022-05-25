import { createSlice } from "@reduxjs/toolkit";

const initialModalState = { showModal: false, modalData: false };

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
});

export const { setShowModal, setModalData } = modalSlice.actions;
export default modalSlice.reducer;
