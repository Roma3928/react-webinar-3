import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ modalVisibility, setModalVisibility }) {
  return (
    <div
      className={"Modal" + (modalVisibility ? " Modal-active" : "")}
      onClick={() => setModalVisibility(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="Moda-content">
        <p>Модальное окно</p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalVisibility: PropTypes.bool,
  setModalVisibility: PropTypes.func,
};

Modal.defaultProps = {
  setModalVisibility: () => {},
};

export default React.memo(Modal);
