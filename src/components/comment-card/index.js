import { cn as bem } from "@bem-react/classname";
import "./style.css";
import PropTypes from "prop-types";
import formatDate from "../../utils/format-date";
import CommentForm from "../comment-form";
import AccessControlMessage from "../access-control-message";

function CommentCard(props) {
  const cn = bem("CommentCard");
  const { date, time } = formatDate(
    props.comment.dateCreate,
    props.t("locale")
  );

  return (
    <div
      className={cn()}
      style={{ paddingLeft: `${props.comment.level * 30}px` }}
    >
      <p className={cn("head")}>
        <span className={cn("user")}>
          {props.comment.author?.profile?.name}
        </span>
        <span className={cn("date")}>{date}</span>{" "}
        <span className={cn("time")}>
          {props.t("an")} {time}
        </span>
      </p>
      <p className={cn("text")}>{props.comment.text}</p>
      <p
        className={cn("reply")}
        onClick={() => props.handleReplyFooterVisibility(props.comment._id)}
      >
        {props.t("comments.reply")}
      </p>
      {props.activeReplyId === props.comment._id &&
        (props.exists ? (
          <CommentForm
            title="Новый ответ"
            reply={true}
            onSubmit={props.addComment}
            onClickOnCancelBtn={props.onClickOnCancelBtn}
          />
        ) : (
          <AccessControlMessage
            actionText="чтобы иметь возможность ответить"
            reply={true}
            onClickOnCancelBtn={props.onClickOnCancelBtn}
            onSignIn={props.onSignIn}
          />
        ))}
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({ name: PropTypes.string }),
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
  activeReplyId: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string,
  ]),
  handleReplyFooterVisibility: PropTypes.func,
  addComment: PropTypes.func,
  t: PropTypes.func,
};

CommentCard.defaultProps = {
  activeReplyId: null,
  handleReplyFooterVisibility: () => {},
  t: (text) => text,
};

export default CommentCard;
