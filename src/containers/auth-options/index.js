import { Link } from "react-router-dom";
import SideLayout from "../../components/side-layout";
import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import { useAuth } from "../../hooks/use-auth";
import useTranslate from "../../hooks/use-translate";
import "./style.css";

function AuthOptions() {
  const store = useStore();
  const { isAuth, userInfo } = useAuth();
  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  return (
    <SideLayout side="end" padding="mixed">
      <div className="AuthOptions">
        {isAuth ? (
          <>
            <Link to="/profile">
              <span className="AuthOptions-name">{userInfo.profile?.name}</span>
            </Link>
            <Link to="/login">
              <button onClick={callbacks.logout}>{t("logout")}</button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button>{t("login")}</button>
          </Link>
        )}
      </div>
    </SideLayout>
  );
}

export default memo(AuthOptions);
