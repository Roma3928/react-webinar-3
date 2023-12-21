import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { useState } from "react";

function CommentForm(props) {
  const cn = bem("CommentForm");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.setPage(props.totalPages);
    props.onSubmit(value);
    setValue("");
    props.onClickOnCancelBtn();
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h3 className={cn("title")}>{props.title}</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn("textarea")}
        required
      ></textarea>
      <div>
        <button className={cn("Submitbtn")}>Отправить</button>
        {props.reply && (
          <button
            className={cn("cancelBtn")}
            onClick={(e) => {
              e.preventDefault();
              props.onClickOnCancelBtn();
            }}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  reply: PropTypes.bool,
  t: PropTypes.func,
  onClickOnCancelBtn: PropTypes.func,
};

CommentForm.defaultProps = {
  title: "",
  reply: false,
  onClickOnCancelBtn: () => {},
  t: (text) => text,
};

export default CommentForm;
