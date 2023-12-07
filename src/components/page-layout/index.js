import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Outlet } from "react-router-dom";
import useSelector from "../../store/hooks/use-selector";
import Basket from "../../app/basket";

function PageLayout() {
  const cn = bem("PageLayout");
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <div className={cn()}>
        <div className={cn("head")}></div>
        <div className={cn("center")}>
          <Outlet />
        </div>
        <div className={cn("footer")}></div>
      </div>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(PageLayout);
