import PropTypes from "prop-types";
import "./style.css";

function LanguageSwitch(props) {
  const callbacks = {
    switchLang: (e) => {
      props.setLang(e.target.value);
    },
  };

  return (
    <select
      className="LanguageSwitch"
      value={props.currentLang}
      onChange={callbacks.switchLang}
    >
      <option value="ru">ru</option>
      <option value="en">en</option>
    </select>
  );
}

LanguageSwitch.propTypes = {
  setLang: PropTypes.func,
  currentLang: PropTypes.string,
};

LanguageSwitch.defaultProps = {
  setLang: () => {},
  currentLang: "ru",
};

export default LanguageSwitch;
