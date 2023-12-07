import { NavLink } from "react-router-dom";
import { memo } from "react";
import "./style.css";
import translations from "../../translations";
import useSelector from "../../store/hooks/use-selector";

function Navigation() {
  const select = useSelector((state) => ({
    currentLang: state.language.lang,
  }));

  return (
    <nav className="Navigation">
      <NavLink to="/">{translations[select.currentLang]["home"]}</NavLink>
    </nav>
  );
}

export default memo(Navigation);
