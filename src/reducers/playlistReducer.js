export const playlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_PLAYLIST":
      return { ...state, [action.payload.title]: [action.payload.video] };
    case "SET_TO_PLAYLIST": {
      const currPlaylist = Object.keys(state).find((el) => el === action.payload.title);
      const index = state[currPlaylist].findIndex((el) => el._id === action.payload._id);
      return index === -1
        ? {
            ...state,
            [currPlaylist]: [...state[currPlaylist], action.payload.video],
          }
        : {
            ...state,
            [currPlaylist]: state[currPlaylist].filter((item) => item._id !== action.payload._id),
          };
    }
    case "DELETE_PLAYLIST": {
      const next = { ...state };
      delete next[action.payload.title];
      return next;
    }
    default:
      return state;
  }
};
