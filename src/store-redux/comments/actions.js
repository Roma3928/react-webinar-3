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
        const apiParams = {
          limit: getState().comments.params.limit,
          skip:
            (getState().comments.params.page - 1) *
            getState().comments.params.limit,
          fields:
            "items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count",
          "search[parent]": id,
        };

        const res = await services.api.request({
          url: `/api/v1/comments?${new URLSearchParams(apiParams)}`,
        });

        const totalPages = Math.ceil(
          res.data.result.count / getState().comments.params.limit
        );

        dispatch({
          type: "comments/load-success",
          payload: {
            items: res.data.result.items,
            count: res.data.result.count,
            totalPages,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  addComment: (comment, userName) => {
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
            comment: {
              ...res.data.result,
              author: {
                profile: { _id: res.data.result.author._id, name: userName },
              },
            },
          },
        });
      } catch (e) {
        dispatch({ type: "comments/addComment-error" });
      }
    };
  },

  setPage: (page) => {
    return async (dispatch, getState, services) => {
      dispatch({
        type: "comments/setPage",
        payload: {
          page,
        },
      });
    };
  },
};
