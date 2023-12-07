import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import translations from "../../translations";
import useSelector from "../../store/hooks/use-selector";

function BasketTotal({ sum }) {
  const cn = bem("BasketTotal");
  const select = useSelector((state) => ({
    currentLang: state.language.lang,
  }));

  return (
    <div className={cn()}>
      <span className={cn("cell")}>
        {translations[select.currentLang]["totalInCart"]}
      </span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
