import { memo } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function AuthOptions(props) {
  return (
    <div className="AuthOptions">
      {props.isAuth ? (
        <>
          <Link to="/profile">
            <span className="AuthOptions-name">{props.userName}</span>
          </Link>
          <button onClick={props.logout}>{props.t("logout")}</button>
        </>
      ) : (
        <Link to="/login">
          <button>{props.t("login")}</button>
        </Link>
      )}
    </div>
  );
}

AuthOptions.propTypes = {
  isAuth: PropTypes.bool,
  userName: PropTypes.string,
  t: PropTypes.func,
  logout: PropTypes.func,
};

AuthOptions.defaultProps = {
  isAuth: false,
  logout: () => {},
  t: (text) => text,
};

export default memo(AuthOptions);
