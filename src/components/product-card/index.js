import { memo } from "react";
import { numberFormat } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";
import translations from "../../translations";

function ProductCard(props) {
  const callbacks = {
    addToBasket: () => props.onAction(props.item._id),
  };

  return (
    <div className="ProductCard">
      <p>{props.item?.description}</p>
      <p>
        {translations[props.currentLang]["manufacturerCountry"]}{" "}
        <b>
          {props.item?.madeIn?.title} {props.item?.madeIn?.code}
        </b>
      </p>
      <p>
        {translations[props.currentLang]["category"]}{" "}
        <b>{props.item?.category?.title}</b>
      </p>
      <p>
        {translations[props.currentLang]["yearOfRelease"]}{" "}
        <b>{props.item?.edition}</b>
      </p>
      <h2>
        {translations[props.currentLang]["price"]}{" "}
        {numberFormat(props.item?.price)} ₽
      </h2>
      <button onClick={callbacks.addToBasket}>
        {translations[props.currentLang]["addBtn"]}
      </button>
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
  currentLang: PropTypes.string,
};

ProductCard.defaultProps = {
  onAction: () => {},
  currentLang: "ru",
};

export default memo(ProductCard);
