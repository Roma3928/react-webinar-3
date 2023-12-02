import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, btnAction, textBtn }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            btnAction={() => btnAction(item)}
            textBtn={textBtn}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  btnAction: PropTypes.func,
  textBtn: PropTypes.string,
};

List.defaultProps = {
  btnAction: () => {},
};

export default React.memo(List);
