import { Link } from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";

function AccessControlMessage(props) {
  return (
    <p className="AccessControlMessage">
      <Link to="/login">Войдите</Link>, {props.actionText}.{" "}
      {props.reply && <span>Отмена</span>}
    </p>
  );
}

AccessControlMessage.propTypes = {
  actionText: PropTypes.string,
  reply: PropTypes.bool,
};

AccessControlMessage.defaultProps = {
  actionText: "",
  reply: false,
};

export default AccessControlMessage;
