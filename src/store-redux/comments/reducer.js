export const initialState = {
  items: [],
  count: 0,
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, items: [], count: 0, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        items: action.payload.items,
        count: action.payload.count,
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, items: [], count: 0, waiting: false };

    case "comments/addComment-start":
      return { ...state, waiting: true };

    case "comments/addComment-success":
      return {
        ...state,
        items: [...state.items, action.payload.comment],
        waiting: false,
      };

    case "comments/addComment-error":
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;
