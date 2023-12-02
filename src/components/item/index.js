import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { formatNumberWithSpaces } from "../../utils";

function Item({ item, btnAction, textBtn }) {
  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title} </div>
      <div className="Item-box--right">
        <p className="Item-price">{formatNumberWithSpaces(item.price)} ₽</p>
        {item.count && <p className="Item-count">{item.count} шт</p>}
        <button className="btn" onClick={btnAction}>
          {textBtn}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  textBtn: PropTypes.string,
  btnAction: PropTypes.func,
};

Item.defaultProps = {
  btnAction: () => {},
};

export default React.memo(Item);
