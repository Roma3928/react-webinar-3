import { memo } from "react";
import { numberFormat } from "../../utils";
import "./style.css";
import PropTypes from "prop-types";
import translations from "../../translations";
import useSelector from "../../store/hooks/use-selector";

function ProductCard(props) {
  const select = useSelector((state) => ({
    currentLang: state.language.lang,
  }));

  const callbacks = {
    addToBasket: () => props.onAction(props.item._id),
  };

  return (
    <div className="ProductCard">
      <p>{props.item?.description}</p>
      <p>
        {translations[select.currentLang]["manufacturerCountry"]}{" "}
        <b>
          {props.item?.madeIn?.title} {props.item?.madeIn?.code}
        </b>
      </p>
      <p>
        {translations[select.currentLang]["category"]}{" "}
        <b>{props.item?.category?.title}</b>
      </p>
      <p>
        {translations[select.currentLang]["yearOfRelease"]}{" "}
        <b>{props.item?.edition}</b>
      </p>
      <h2>
        {translations[select.currentLang]["price"]}{" "}
        {numberFormat(props.item?.price)} ₽
      </h2>
      <button onClick={callbacks.addToBasket}>
        {translations[select.currentLang]["addBtn"]}
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
};

ProductCard.defaultProps = {
  onAction: () => {},
};

export default memo(ProductCard);
