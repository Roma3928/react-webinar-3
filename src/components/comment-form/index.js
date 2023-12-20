import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { useState } from "react";

function CommentForm(props) {
  const cn = bem("CommentForm");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(value);
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h3 className={cn("title")}>{props.title}</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn("textarea")}
      ></textarea>
      <div>
        <button className={cn("Submitbtn")}>Отправить</button>
        {props.reply && <button className={cn("cancelBtn")}>Отмена</button>}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  reply: PropTypes.bool,
  t: PropTypes.func,
};

CommentForm.defaultProps = {
  title: "",
  reply: false,
  t: (text) => text,
};

export default CommentForm;
