import PropTypes from "prop-types";
import "./style.css";

function CommentsWrapper({ title, children, lastElementRef }) {
  return (
    <div className="CommentsWrapper">
      <h2 className="CommentsWrapper-title">{title}</h2>
      {children}
      {/* <div
        className="CommentsWrapper-lastElementRef"
        ref={lastElementRef}
      ></div> */}
    </div>
  );
}

CommentsWrapper.propTypes = {
  children: PropTypes.node,
};

export default CommentsWrapper;
