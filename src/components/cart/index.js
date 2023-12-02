import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";
import { formatNumberWithSpaces } from "../../utils";
import Modal from "../ui/modal";

function Cart({
  modalVisibility,
  setModalVisibility,
  cart,
  onDeleteItem,
  totalPrice,
}) {
  return (
    <Modal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <div className="Cart-header">
        <h2 className="Cart-title">Корзина</h2>
        <button className="btn" onClick={() => setModalVisibility(false)}>
          Закрыть
        </button>
      </div>
      <div className="Cart-list">
        <List list={cart} btnAction={onDeleteItem} textBtn="Удалить" />
      </div>
      {cart.length ? (
        <p className="Cart-totalprice">
          Итого <span>{formatNumberWithSpaces(totalPrice)} ₽</span>
        </p>
      ) : (
        <p className="Cart-empty">Корзина пустая</p>
      )}
    </Modal>
  );
}

Cart.propTypes = {
  modalVisibility: PropTypes.bool,
  setModalVisibility: PropTypes.func,
  cart: PropTypes.array,
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number,
};

Cart.defaultProps = {
  setModalVisibility: () => {},
  onDeleteItem: () => {},
};

export default React.memo(Cart);
