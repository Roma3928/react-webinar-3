import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ children, modalVisibility, setModalVisibility }) {
  return (
    <div
      className={"Modal" + (modalVisibility ? " Modal-active" : "")}
      onClick={() => setModalVisibility(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="Modal-content">
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  modalVisibility: PropTypes.bool,
  setModalVisibility: PropTypes.func,
};

export default React.memo(Modal);
