import { cn as bem } from "@bem-react/classname";
import "./style.css";
import PropTypes from "prop-types";
import formatDate from "../../utils/format-date";

function CommentCard(props) {
  const cn = bem("CommentCard");
  const { date, time } = formatDate(
    props.comment.dateCreate,
    props.t("locale")
  );

  return (
    <>
      <div className={cn()}>
        <p className={cn("head")}>
          <span className={cn("user")}>
            {props.comment.author?.profile.name}
          </span>
          <span className={cn("date")}>{date}</span>{" "}
          <span className={cn("time")}>
            {props.t("an")} {time}
          </span>
        </p>
        <p className={cn("text")}>{props.comment.text}</p>
        <p className={cn("reply")}>{props.t("comments.reply")}</p>
      </div>
    </>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({ name: PropTypes.string }),
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

CommentCard.defaultProps = {
  t: (text) => text,
};

export default CommentCard;
