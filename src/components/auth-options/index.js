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
            <span className="AuthOptions-name">
              {props.userInfo.profile?.name}
            </span>
          </Link>
          <Link to="/login">
            <button onClick={props.logout}>{props.t("logout")}</button>
          </Link>
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
  userInfo: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  t: PropTypes.func,
  logout: PropTypes.func,
};

AuthOptions.defaultProps = {
  isAuth: false,
  logout: () => {},
  t: (text) => text,
};

export default memo(AuthOptions);
