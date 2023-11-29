import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function Controls({ setModalVisibility, totalPrice, cart }) {
  return (
    <div className="Controls">
      <p className="Controls-info">
        В корзине:
        <span>
          {cart.length}{" "}
          {plural(cart.length, {
            one: "товар",
            few: "товара",
            many: "товаров",
          })}{" "}
          / {totalPrice} ₽
        </span>
      </p>
      <button className="btn" onClick={() => setModalVisibility(true)}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  setModalVisibility: PropTypes.func,
  totalPrice: PropTypes.number,
  list: PropTypes.array,
};

Controls.defaultProps = {
  setModalVisibility: () => {},
};

export default React.memo(Controls);
