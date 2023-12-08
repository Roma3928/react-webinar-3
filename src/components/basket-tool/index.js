import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import Navigation from "../navigation";
import translations from "../../translations";

function BasketTool(props) {
  const cn = bem("BasketTool");

  return (
    <div className={cn()}>
      <Navigation currentLang={props.currentLang} />
      <div>
        <span className={cn("label")}>
          {translations[props.currentLang]["cartLabel"]}
        </span>
        <span className={cn("total")}>
          {props.amount
            ? `${props.amount} ${plural(
                props.amount,
                translations[props.currentLang]["pluralProducts"],
                translations[props.currentLang]["locale"]
              )} / ${numberFormat(props.sum)} ₽`
            : translations[props.currentLang]["cartEmpty"]}
        </span>
        <button onClick={props.onOpen}>
          {translations[props.currentLang]["openBtn"]}
        </button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  currentLang: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  currentLang: "ru",
};

export default memo(BasketTool);
