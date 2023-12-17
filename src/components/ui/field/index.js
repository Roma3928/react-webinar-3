import "./style.css";
import PropTypes from "prop-types";

const Field = (props) => {
  return (
    <div className="Field">
      <label>{props.title}</label>
      <input
        className="Field-input"
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        type={props.type}
      />
      {props.isDirty && props.error && (
        <span className="Field-error">{props.error}</span>
      )}
    </div>
  );
};

Field.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDirty: PropTypes.bool,
};

Field.defaultProps = {
  title: "",
  type: "text",
  error: "",
  value: "",
  onChange: () => {},
  onBlur: () => {},
  isDirty: false,
};

export default Field;
