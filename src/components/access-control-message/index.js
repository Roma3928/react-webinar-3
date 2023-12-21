import "./style.css";
import PropTypes from "prop-types";

function AccessControlMessage(props) {
  return (
    <p className="AccessControlMessage">
      <span className="AccessControlMessage-signIn" onClick={props.onSignIn}>
        Войдите
      </span>
      , {props.actionText}.{" "}
      {props.reply && (
        <span
          className="AccessControlMessage-cancelBtn"
          onClick={props.onClickOnCancelBtn}
        >
          Отмена
        </span>
      )}
    </p>
  );
}

AccessControlMessage.propTypes = {
  actionText: PropTypes.string,
  onSignIn: PropTypes.func,
  onClickOnCancelBtn: PropTypes.func,
  reply: PropTypes.bool,
};

AccessControlMessage.defaultProps = {
  actionText: "",
  onSignIn: () => {},
  onClickOnCancelBtn: () => {},
  reply: false,
};

export default AccessControlMessage;
