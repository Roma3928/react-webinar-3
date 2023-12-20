import { memo } from "react";
import "./style.css";
import CommentCard from "../comment-card";
import PropTypes from "prop-types";
import AccessControlMessage from "../access-control-message";
import CommentForm from "../comment-form";

function Comments(props) {
  return (
    <div className="Comments">
      <h2 className="Comments-title">
        {props.t("comments.title")} ({props.count})
      </h2>
      {props.items.map((item) => (
        <CommentCard key={item._id} comment={item} t={props.t} />
      ))}
      {props.exists ? (
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
      )}
    </div>
  );
}

Comments.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  t: PropTypes.func,
};

Comments.defaultProps = {
  t: (text) => text,
};

export default memo(Comments);
