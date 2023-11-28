import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ setModalVisibility }) {
  return (
    <div className="Controls">
      <p className="Controls-info">
        В корзине:<span>2 товара / 223 ₽</span>
      </p>
      <button onClick={() => setModalVisibility(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  setModalVisibility: PropTypes.func,
};

Controls.defaultProps = {
  setModalVisibility: () => {},
};

export default React.memo(Controls);
