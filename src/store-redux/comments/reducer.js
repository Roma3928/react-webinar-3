export const initialState = {
  items: [],
  params: {
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  count: 0,
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        // items: [...state.items, ...action.payload.items],
        items: action.payload.items,
        count: action.payload.count,
        params: {
          page: state.params.page,
          limit: state.params.limit,
          totalPages: action.payload.totalPages,
        },
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

    case "comments/setPage":
      return {
        ...state,
        params: {
          page: action.payload.page,
          limit: state.params.limit,
          totalPages: state.params.totalPages,
        },
      };

    default:
      return state;
  }
}

export default reducer;
