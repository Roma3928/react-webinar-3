import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PageLayout({ children }) {
  const cn = bem("PageLayout");

  return <div className={cn()}>{children}</div>;
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
