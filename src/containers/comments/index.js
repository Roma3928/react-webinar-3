import { memo, useState, useRef, useMemo, useCallback, useEffect } from "react";
import CommentCard from "../../components/comment-card";
import AccessControlMessage from "../../components/access-control-message";
import CommentForm from "../../components/comment-form";
import { useObserver } from "../../hooks/use-observer";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useSelector from "../../hooks/use-selector";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import useTranslate from "../../hooks/use-translate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentsWrapper from "../../components/comments-wrapper";
import commentsActions from "../../store-redux/comments/actions";

function Comments() {
  // const lastElementRef = useRef();
  const [activeReplyId, setActiveReplyId] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments.items,
      commentsCount: state.comments.count,
      commentsWaiting: state.comments.waiting,
      page: state.comments.params.page,
      limit: state.comments.params.limit,
      totalPages: state.comments.params.totalPages,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector((state) => ({
    exists: state.session.exists,
    userName: state.session.user.profile?.name,
  }));

  const handleReplyFooterVisibility = (commentId) => {
    setActiveReplyId(commentId === activeReplyId ? null : commentId);
  };

  const onClickOnCancelBtn = () => {
    setActiveReplyId(null);
  };

  const callbacks = {
    addComment: useCallback(
      (text) => {
        const parent = activeReplyId
          ? { _id: activeReplyId, _type: "comment" }
          : { _id: params.id, _type: "article" };

        dispatch(
          commentsActions.addComment(
            {
              text,
              parent,
            },
            select.userName
          )
        );
      },
      [dispatch, select.userName, activeReplyId]
    ),
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    // setPage: useCallback(
    //   (page) => {
    //     dispatch(commentsActions.setPage(page));
    //   },
    //   [dispatch]
    // ),
  };

  const options = {
    comments: useMemo(
      () =>
        [
          ...treeToList(listToTree(selectRedux.comments), (item, level) => ({
            ...item,
            level: level - 1,
          })),
        ].slice(1),
      [selectRedux.comments]
    ),
  };

  // console.log(selectRedux.comments);
  // console.log(options.comments);

  // useObserver(
  //   lastElementRef,
  //   selectRedux.page < selectRedux.totalPages,
  //   selectRedux.commentsWaiting,
  //   () => {
  //     callbacks.setPage(selectRedux.page + 1);
  //   }
  // );

  return (
    <CommentsWrapper
      title={`${t("comments.title")} (${selectRedux.commentsCount})`}
      // lastElementRef={lastElementRef}
    >
      {options.comments.map((item) => (
        <CommentCard
          key={item._id}
          comment={item}
          t={t}
          exists={select.exists}
          activeReplyId={activeReplyId}
          handleReplyFooterVisibility={handleReplyFooterVisibility}
          addComment={callbacks.addComment}
          onClickOnCancelBtn={onClickOnCancelBtn}
          onSignIn={callbacks.onSignIn}
        />
      ))}

      {!activeReplyId &&
        (select.exists ? (
          <CommentForm
            title="Новый комментарий"
            reply={false}
            onSubmit={callbacks.addComment}
          />
        ) : (
          <AccessControlMessage
            actionText="чтобы иметь возможность комментировать"
            reply={false}
            onSignIn={callbacks.onSignIn}
          />
        ))}
    </CommentsWrapper>
  );
}

export default memo(Comments);
