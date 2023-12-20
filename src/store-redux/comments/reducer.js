export const initialState = {
  items: [],
  comment: {},
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
      return { ...state, items: [], count: 0, waiting: false }; //@todo текст ошибки сохранять?

    case "comments/addComment-start":
      return { ...state, comment: {}, waiting: true };

    case "comments/addComment-success":
      return {
        ...state,
        items: [...items, { ...action.payload.comment }],
        waiting: false,
      };

    case "comments/addComment-error":
      return { ...state, comment: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
