import PropTypes from "prop-types";
import "./style.css";
import { memo } from "react";

function UserCard(props) {
  return (
    <div className="UserCard">
      <h2 className="UserCard-title">{props.t("profile.title")}</h2>
      <p>
        {props.t("profile.name")}: <span>{props.userInfo.profile?.name}</span>
      </p>
      <p>
        {props.t("profile.phoneNumber")}:{" "}
        <span>{props.userInfo.profile?.phone}</span>
      </p>
      <p>
        email: <span>{props.userInfo.email}</span>
      </p>
    </div>
  );
}

UserCard.propTypes = {
  t: PropTypes.func,
  userInfo: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }).isRequired,
};

UserCard.defaultProps = {
  t: (text) => text,
};

export default memo(UserCard);
