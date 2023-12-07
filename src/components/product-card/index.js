import { memo } from "react";
import { numberFormat } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";

function ProductCard(props) {
  const callbacks = {
    addToBasket: () => props.onAction(props.item._id),
  };

  return (
    <div className="ProductCard">
      <p>{props.item?.description}</p>
      <p>
        Страна производитель:{" "}
        <b>
          {props.item?.madeIn?.title} {props.item?.madeIn?.code}
        </b>
      </p>
      <p>
        Категория: <b>{props.item?.category?.title}</b>
      </p>
      <p>
        Год выпуска: <b>{props.item?.edition}</b>
      </p>
      <h2>Цена: {numberFormat(props.item?.price)} ₽</h2>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    description: PropTypes.string,
    edition: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    price: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAction: PropTypes.func,
};

ProductCard.defaultProps = {
  onAction: () => {},
};

export default memo(ProductCard);
