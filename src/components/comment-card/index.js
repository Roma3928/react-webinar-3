import { cn as bem } from "@bem-react/classname";
import "./style.css";
import PropTypes from "prop-types";
import formatDate from "../../utils/format-date";
import CommentForm from "../comment-form";
import AccessControlMessage from "../access-control-message";
import { getDeepestChildId } from "../../utils/get-deepest-child-id";
import IndentLayout from "../indent-layout";

function CommentCard(props) {
  const cn = bem("CommentCard");
  const { date, time } = formatDate(
    props.comment.dateCreate,
    props.t("locale")
  );

  return (
    <div className={cn()}>
      <IndentLayout сurrentLevel={props.comment.level} maxLevel={5} indent={30}>
        <p className={cn("head")}>
          <span
            className={cn("user", {
              auth: props.authUserId === props.comment.author._id,
            })}
          >
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
          onClick={() =>
            props.handleReplyFooterVisibility(
              props.comment._id,
              getDeepestChildId(props.comment),
              props.comment.level
            )
          }
        >
          {props.t("comments.reply")}
        </p>
      </IndentLayout>

      {props.lastChildActiveReply.id === props.comment._id &&
        props.activeReplyId && (
          <div ref={props.scrollElementRef}>
            <IndentLayout
              сurrentLevel={props.lastChildActiveReply.level + 1}
              maxLevel={5}
              indent={30}
            >
              {props.exists ? (
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
              )}
            </IndentLayout>
          </div>
        )}
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
  lastChildActiveReply: PropTypes.shape({
    id: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
  handleReplyFooterVisibility: PropTypes.func,
  addComment: PropTypes.func,
  t: PropTypes.func,
  scrollElementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

CommentCard.defaultProps = {
  activeReplyId: null,
  lastChildActiveReplyId: "",
  handleReplyFooterVisibility: () => {},
  t: (text) => text,
};

export default CommentCard;
