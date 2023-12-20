import { memo, useState } from "react";
import "./style.css";
import CommentCard from "../comment-card";
import PropTypes from "prop-types";
import AccessControlMessage from "../access-control-message";
import CommentForm from "../comment-form";

function Comments(props) {
  const handleReplyFooterVisibility = (commentId) => {
    props.setActiveReplyId(
      commentId === props.activeReplyId ? null : commentId
    );
  };

  const onClickOnCancelBtn = () => {
    props.setActiveReplyId(null);
  };

  return (
    <div className="Comments">
      <h2 className="Comments-title">
        {props.t("comments.title")} ({props.count})
      </h2>
      {props.items.map((item) => (
        <CommentCard
          key={item._id}
          comment={item}
          t={props.t}
          exists={props.exists}
          activeReplyId={props.activeReplyId}
          handleReplyFooterVisibility={handleReplyFooterVisibility}
          addComment={props.addComment}
          onClickOnCancelBtn={onClickOnCancelBtn}
        />
      ))}
      {!props.activeReplyId &&
        (props.exists ? (
          <CommentForm
            title="Новый комментарий"
            reply={false}
            onSubmit={props.addComment}
          />
        ) : (
          <AccessControlMessage
            actionText="чтобы иметь возможность комментировать"
            reply={false}
          />
        ))}
    </div>
  );
}

Comments.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  exists: PropTypes.bool,
  count: PropTypes.number,
  activeReplyId: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string,
  ]),
  setActiveReplyId: PropTypes.func,
  t: PropTypes.func,
};

Comments.defaultProps = {
  exists: false,
  count: 0,
  t: (text) => text,
};

export default memo(Comments);
