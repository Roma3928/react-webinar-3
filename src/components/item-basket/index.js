import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style.css";
import translations from "../../translations";
import useSelector from "../../store/hooks/use-selector";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const select = useSelector((state) => ({
    currentLang: state.language.lang,
  }));

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link
        to={`product/${props.item._id}`}
        className={cn("title")}
        onClick={props.onClose}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)}{" "}
          {translations[select.currentLang]["pcs"]}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {translations[select.currentLang]["removeBtn"]}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onClose: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
};

export default memo(ItemBasket);