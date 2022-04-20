export const historyReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      return [...new Set([...state, action.payload])];
    case "REMOVE_FROM_HISTORY":
      return state.filter((it) => it._id !== action.payload._id);
    default:
      return state;
  }
};
