import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import Navigation from "../navigation";
import translations from "../../translations";
import useSelector from "../../store/hooks/use-selector";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");

  const select = useSelector((state) => ({
    currentLang: state.language.lang,
  }));

  return (
    <div className={cn()}>
      <Navigation />
      <div>
        <span className={cn("label")}>
          {translations[select.currentLang]["cartLabel"]}
        </span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${numberFormat(sum)} ₽`
            : translations[select.currentLang]["cartEmpty"]}
        </span>
        <button onClick={onOpen}>
          {translations[select.currentLang]["openBtn"]}
        </button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
