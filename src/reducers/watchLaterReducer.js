export const watchLaterReducer = (state, action) => {
  switch (action.type) {
    case "SET_WATCHLATER":
      return action.payload;
    case "TOGGLE_WATCHLIST": {
      const index = state.findIndex((el) => el._id === action.payload._id);
      if (index !== -1) return state.filter((it) => it._id !== action.payload._id);
      else return [...state, action.payload];
    }
    default:
      return state;
  }
};
