import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import LanguageSwitch from "../language-switch";

function Head(props) {
  return (
    <div className="Head">
      <h1>{props.title}</h1>
      <LanguageSwitch setLang={props.setLang} currentLang={props.currentLang} />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
