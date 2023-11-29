import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Item from "../item";

function Cart({
  modalVisibility,
  setModalVisibility,
  cart,
  onDeleteItem,
  totalPrice,
}) {
  return (
    <div
      className={"Cart" + (modalVisibility ? " Cart-active" : "")}
      onClick={() => setModalVisibility(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="Cart-content">
        <div className="Cart-header">
          <h2 className="Cart-title">Корзина</h2>
          <button className="btn" onClick={() => setModalVisibility(false)}>
            Закрыть
          </button>
        </div>

        <div className="Cart-list">
          {cart.map((item) => (
            <div key={item.code} className="List-item">
              <Item
                item={item}
                textBtn="Удалить"
                btnAction={() => onDeleteItem(item.code)}
              />
            </div>
          ))}
        </div>
        {cart.length ? (
          <p className="Cart-totalprice">
            Итого <span>{totalPrice} ₽</span>
          </p>
        ) : (
          <p className="Cart-empty">Корзина пустая</p>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  modalVisibility: PropTypes.bool,
  setModalVisibility: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number,
};

Cart.defaultProps = {
  setModalVisibility: () => {},
  onDeleteItem: () => {},
};

export default React.memo(Cart);
