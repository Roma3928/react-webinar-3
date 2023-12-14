import { forwardRef } from "react";
import "./style.css";
import PropTypes from "prop-types";

const Field = forwardRef(({ title, type, error, ...rest }, ref) => {
  return (
    <div className="Field">
      <label>{title}</label>
      <input className="Field-input" ref={ref} type={type} {...rest} />
      {error && <span className="Field-error">{error.message}</span>}
    </div>
  );
});

Field.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
  rest: PropTypes.object,
};

Field.defaultProps = {
  title: "",
  type: "text",
  error: {},
  rest: {},
};

Field.displayName = "Field";

export default Field;
