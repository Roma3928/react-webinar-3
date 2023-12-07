import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";
import translations from "../../translations";
import useSelector from "../../store/hooks/use-selector";

function Item(props) {
  const cn = bem("Item");

  const select = useSelector((state) => ({
    currentLang: state.language.lang,
  }));

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
  };
  return (
    <div className={cn()}>
      <Link to={`product/${props.item._id}`} className={cn("title")}>
        {props.item.title}
      </Link>

      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>
          {translations[select.currentLang]["addBtn"]}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
