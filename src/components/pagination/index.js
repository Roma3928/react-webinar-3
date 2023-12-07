import { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { getPagesArray } from "../../utils";

const Pagination = (props) => {
  const pagesАrray = getPagesArray(props.totalPages, props.currentPage);

  return (
    <ul className="Pagination">
      {pagesАrray.map((page, index) => (
        <li
          key={index}
          onClick={() => typeof page === "number" && props.setPage(page)}
          className={
            typeof page === "number"
              ? props.currentPage === page
                ? "Pagination-item Pagination-item--active"
                : "Pagination-item"
              : "Pagination-item Pagination-points"
          }
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
};

Pagination.defaultProps = {
  totalPages: 0,
  currentPage: 1,
  setPage: () => {},
};

export default memo(Pagination);
