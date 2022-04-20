export const likesReducer = (state, action) => {
  const index = state.findIndex((el) => el._id === action.payload._id);
  switch (action.type) {
    case "TOGGLE_LIKES": {
      if (index !== -1) return state.filter((it) => it._id !== action.payload._id);
      else return [...state, action.payload];
    }
    default:
      return state;
  }
};
