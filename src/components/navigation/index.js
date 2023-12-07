import { NavLink } from "react-router-dom";
import { memo } from "react";
import "./style.css";

function Navigation() {
  return (
    <nav className="Navigation">
      <NavLink to="/">Главная</NavLink>
    </nav>
  );
}

export default memo(Navigation);
