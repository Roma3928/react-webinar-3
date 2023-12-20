export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({
          type: "comments/load-success",
          payload: {
            items: res.data.result.items,
            count: res.data.result.count,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  addNewComment: (comment) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/addComment-start" });

      try {
        const res = await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify(comment),
        });
        dispatch({
          type: "comments/addComment-success",
          payload: {
            comment: res.data.result,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/addComment-error" });
      }
    };
  },
};
