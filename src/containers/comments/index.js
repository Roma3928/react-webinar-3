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
  const scrollElementRef = useRef();
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [lastChildActiveReply, setLastChildActiveReply] = useState({
    id: "",
    level: 0,
  });
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
    authUserId: state.session.user._id,
  }));

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
      [dispatch, select.userName, activeReplyId, params.id]
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

    onClickOnCancelBtn: useCallback(() => {
      setActiveReplyId(null);
      setLastChildActiveReply({ id: "", level: 0 });
    }, []),
    handleReplyFooterVisibility: useCallback(
      (commentId, lastChildCommentId, level) => {
        setActiveReplyId(commentId === activeReplyId ? null : commentId);
        setLastChildActiveReply({ id: lastChildCommentId, level });
      },
      [activeReplyId]
    ),
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

  // useObserver(
  //   lastElementRef,
  //   selectRedux.page < selectRedux.totalPages,
  //   selectRedux.commentsWaiting,
  //   () => {
  //     callbacks.setPage(selectRedux.page + 1);
  //   }
  // );

  useEffect(() => {
    scrollElementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [lastChildActiveReply]);

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
          lastChildActiveReply={lastChildActiveReply}
          activeReplyId={activeReplyId}
          handleReplyFooterVisibility={callbacks.handleReplyFooterVisibility}
          addComment={callbacks.addComment}
          onClickOnCancelBtn={callbacks.onClickOnCancelBtn}
          onSignIn={callbacks.onSignIn}
          authUserId={select.authUserId}
          scrollElementRef={scrollElementRef}
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
