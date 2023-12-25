import React, { memo } from "react";
import PropTypes from "prop-types";

function IndentLayout({ children, сurrentLevel, maxLevel, indent }) {
  return (
    <div
      style={{
        paddingLeft: `${
          (сurrentLevel < maxLevel ? сurrentLevel : maxLevel) * indent
        }px`,
      }}
    >
      {children}
    </div>
  );
}

IndentLayout.propTypes = {
  children: PropTypes.node,
  сurrentLevel: PropTypes.number,
  maxLevel: PropTypes.number,
  indent: PropTypes.number,
};

IndentLayout.defaultProps = {};

export default memo(IndentLayout);
