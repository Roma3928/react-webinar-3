import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function List({ list, renderItem, currentLang }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item._id} className="List-item">
          {renderItem(item, currentLang)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  renderItem: PropTypes.func,
  currentLang: PropTypes.string,
};

List.defaultProps = {
  renderItem: (item) => {},
  currentLang: "ru",
};

export default memo(List);
