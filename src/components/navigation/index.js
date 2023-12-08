import { NavLink } from "react-router-dom";
import { memo } from "react";
import "./style.css";
import translations from "../../translations";
import PropTypes from "prop-types";

function Navigation(props) {
  return (
    <nav className="Navigation">
      <NavLink to="/">{translations[props.currentLang]["home"]}</NavLink>
    </nav>
  );
}

Navigation.propTypes = {
  currentLang: PropTypes.string,
};

Navigation.defaultProps = {
  currentLang: "ru",
};

export default memo(Navigation);
