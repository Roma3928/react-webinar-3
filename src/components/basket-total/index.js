import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import translations from "../../translations";

function BasketTotal({ sum, currentLang }) {
  const cn = bem("BasketTotal");

  return (
    <div className={cn()}>
      <span className={cn("cell")}>
        {translations[currentLang]["totalInCart"]}
      </span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  currentLang: PropTypes.string,
};

BasketTotal.defaultProps = {
  sum: 0,
  currentLang: "ru",
};

export default memo(BasketTotal);
